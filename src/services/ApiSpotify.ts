/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = 'https://api.spotify.com/v1';
const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI || 'https://moodify-two.vercel.app/callback';
console.log(redirectUri)

const getAccessToken = (): string | null => {
  return localStorage.getItem('spotifyAccessToken');
};

const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = localStorage.getItem('spotifyRefreshToken');
  if (!refreshToken) {
    throw new Error('Jeton de rafraîchissement non disponible.');
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`),
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error('Erreur lors du rafraîchissement du jeton d\'accès.');
  }

  const data = await response.json();
  localStorage.setItem('spotifyAccessToken', data.access_token);
  return data.access_token;
};

const fetchWithToken = async (url: string, options: RequestInit = {}): Promise<any> => {
  let accessToken = getAccessToken();

  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 401) {
    // Token expired, try to refresh it
    accessToken = await refreshAccessToken();
    response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  if (!response.ok) {
    throw new Error(`Erreur lors de l'appel API: ${response.statusText}`);
  }

  return response.json();
};

export const fetchUserProfile = async () => {
  return fetchWithToken(`${BASE_URL}/me`);
};

export const fetchAndSetUserData = async (onLogin: (userData: any) => void) => {
  const accessToken = localStorage.getItem('spotifyAccessToken');

  if (!accessToken) {
    console.error('No access token found. User needs to log in.');
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des informations utilisateur.');
    }

    const userData = await response.json();
    onLogin(userData);
  } catch (error) {
    console.error('Erreur lors de la récupération des données utilisateur:', error);
  }
};

export const exchangeAuthorizationCode = async (code: string): Promise<{ accessToken: string; refreshToken: string }> => {
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`),
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error exchanging authorization code:', errorText);
      throw new Error('Failed to exchange authorization code.');
    }

    const data = await response.json();
    const tokens = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    };

    if (!tokens.accessToken || !tokens.refreshToken) {
      console.error('Invalid tokens received:', tokens);
      throw new Error('Invalid tokens received from Spotify.');
    }

    localStorage.setItem('spotifyAccessToken', tokens.accessToken);
    localStorage.setItem('spotifyRefreshToken', tokens.refreshToken);

    return tokens;

  } catch (error) {
    console.error('Exception occurred during token exchange:', error);
    throw error;
  }
};

export const searchPlaylistsByMood = async (mood: string, limit = 9, offset = 0) => {
  const moodKeywords = {
    Calme: ['Calm', 'Relax', 'Peaceful', 'Chill', 'Ambient', 'Meditative'],
    Énergique: ['Energetic', 'Upbeat', 'Workout', 'Dance', 'Active', 'Party'],
    Nostalgique: ['Nostalgic', 'Retro', 'Oldies', 'Throwback', 'Sentimental', 'Melancholy'],
    Anxieux: ['Anxious', 'Stress Relief', 'Soothing', 'Calm', 'Relax', 'Mindfulness'],
    Heureux: ['Happy', 'Joyful', 'Upbeat', 'Feel Good', 'Positive', 'Cheerful'],
    Fatigué: ['Tired', 'Sleep', 'Rest', 'Relax', 'Chill', 'Ambient'],
    Rêveur: ['Dreamy', 'Ethereal', 'Ambient', 'Lush', 'Fantasy', 'Soft'],
    Agressif: ['Aggressive', 'Intense', 'Rock', 'Metal', 'Hardcore', 'Fight'],
    Triste: ['Sad', 'Melancholy', 'Emotional', 'Blue', 'Heartbreak', 'Lament'],
    Motivé: ['Motivated', 'Focus', 'Productivity', 'Study', 'Work', 'Energetic'],
    Excité: ['Excited', 'Party', 'Hype', 'Upbeat', 'Celebration', 'Joyful'],
    Indifférent: ['Indifferent', 'Neutral', 'Background', 'Chill', 'Ambient', 'Easy Listening'],
    Frustré: ['Frustrated', 'Angry', 'Hardcore', 'Metal', 'Stress Relief', 'Intense'],
    Optimiste: ['Optimistic', 'Positive', 'Hopeful', 'Uplifting', 'Feel Good', 'Cheerful'],
    Pessimiste: ['Pessimistic', 'Dark', 'Melancholy', 'Brooding', 'Downbeat', 'Reflective'],
  };

  const categories = {
    Calme: 'chill',
    Énergique: 'workout',
    Nostalgique: 'mood',
    Anxieux: 'chill',
    Heureux: 'mood',
    Fatigué: 'sleep',
    Rêveur: 'mood',
    Agressif: 'rock',
    Triste: 'mood',
    Motivé: 'focus',
    Excité: 'party',
    Indifférent: 'chill',
    Frustré: 'rock',
    Optimiste: 'mood',
    Pessimiste: 'mood',
  };

  const keywords = moodKeywords[mood as keyof typeof moodKeywords] || [mood];
  const category = categories[mood as keyof typeof categories];

  // Rechercher des playlists par mots-clés
  const keywordQueries = keywords.map(keyword => `q=${encodeURIComponent(keyword)}&type=playlist`).join('&');

  const playlistsByKeywords = await fetchWithToken(`${BASE_URL}/search?${keywordQueries}&limit=${limit}&offset=${offset}`);

  // Rechercher des playlists par catégorie
  const playlistsByCategory = await fetchWithToken(`${BASE_URL}/browse/categories/${category}/playlists?limit=${limit}&offset=${offset}`);

  // Combiner les résultats des deux approches
  const combinedPlaylists = [...playlistsByKeywords.playlists.items, ...playlistsByCategory.playlists.items];

  // Supprimer les doublons (par exemple, basés sur l'ID de la playlist)
  const uniquePlaylists = Array.from(new Set(combinedPlaylists.map(p => p.id)))
    .map(id => combinedPlaylists.find(p => p.id === id));

  return uniquePlaylists.slice(0, limit);
};

export const fetchTopTracks = async (timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term') => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error('Token non disponible. Veuillez vous connecter à Spotify.');
  }

  const response = await fetch(`${BASE_URL}/me/top/tracks?limit=15&time_range=${timeRange}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des morceaux les plus écoutés.');
  }

  return response.json();
};

interface ArtistData {
  genres: string[];
}

export const fetchArtistGenres = async (artistId: string): Promise<ArtistData> => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error('Token non disponible. Veuillez vous connecter à Spotify.');
  }

  const response = await fetch(`${BASE_URL}/artists/${artistId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des genres.');
  }

  return response.json();
};

export const fetchCurrentlyPlayingTrack = async () => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error('Token non disponible. Veuillez vous connecter à Spotify.');
  }

  const response = await fetch(`${BASE_URL}/me/player/currently-playing`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    if (response.status === 204) {
      // Aucun contenu, donc aucune lecture en cours
      return null;
    }
    throw new Error('Erreur lors de la récupération de la musique en cours de lecture.');
  }

  return response.json();
};

export const fetchRecommendations = async (): Promise<any[]> => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error('Token non disponible. Veuillez vous connecter à Spotify.');
  }
  const userTopTracks = await fetchTopTracks('short_term');
  const seedTracks = userTopTracks.items.slice(0, 5).map((track: { id: any; }) => track.id).join(',');


  const response = await fetch(`${BASE_URL}/recommendations?limit=10&seed_tracks=${seedTracks}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Erreur lors de la récupération des recommandations:', errorData);
    throw new Error('Erreur lors de la récupération des recommandations.');
  }

  const data = await response.json();

  return data.tracks.map((track: any) => ({
    id: track.id,
    name: track.name,
    image: track.album.images[0]?.url || '',
    external_urls: track.external_urls,
  }));


};