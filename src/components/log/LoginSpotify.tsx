/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from "react";
import { exchangeAuthorizationCode, fetchAndSetUserData } from "../../services/ApiSpotify";

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

const scopes = [
  'user-read-private',
  'user-read-email',
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-top-read',
  'user-library-read',
  'user-read-currently-playing',
  'user-read-playback-state',
];

interface LoginSpotifyProps {
  onLogin: (userData: any) => void;
  buttonClassName?: string;
}

export default function LoginSpotify({ onLogin, buttonClassName }: LoginSpotifyProps) {
  const handleLogin = () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes.join(' '))}`;

    // Rediriger l'utilisateur vers Spotify pour se connecter
    window.location.href = authUrl;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      exchangeAuthorizationCode(code)
        .then(data => {
          localStorage.setItem('spotifyAccessToken', data.accessToken);
          localStorage.setItem('spotifyRefreshToken', data.refreshToken);
          fetchAndSetUserData(onLogin); // Récupère les données de l'utilisateur après avoir reçu les tokens
        })
        .catch(error => {
          console.error('Erreur lors de l\'échange du code d\'autorisation:', error);
        });
    }
  }, [onLogin]);

  return (
    <button
      onClick={handleLogin}
      className={`flex p-2 uppercase justify-center items-center text-primary font-semibold rounded-full min-w-60 text-base px-10 py-3.5 overflow-hidden group bg-full relative hover:bg-gradient-to-r hover:from-color-3 hover:to-color-4  hover:ring-2 hover:ring-offset-2 hover:ring-color-3 transition-all ease-in-out duration-300 ${buttonClassName}`}
    >
      Connexion à Spotify
      <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-primary opacity-10 rotate-12 group-hover:-translate-x-80 ease-in-out"></span>
    </button>
  );
}
