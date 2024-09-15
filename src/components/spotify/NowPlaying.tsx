/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { fetchCurrentlyPlayingTrack } from '../../services/ApiSpotify';

const NowPlaying = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<any>(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const getCurrentlyPlayingTrack = async () => {
      try {
        setIsFetching(true);
        const track = await fetchCurrentlyPlayingTrack();
        setCurrentlyPlaying(track);
        setIsFetching(false);

        // Si quelque chose est en cours de lecture, re-vérifiez après 30 secondes, sinon après 60 secondes
        const delay = track && track.is_playing ? 30000 : 60000;
        timeoutId = setTimeout(getCurrentlyPlayingTrack, delay);
      } catch (error) {
        console.error('Erreur lors de la récupération de la musique en cours de lecture:', error);
        setIsFetching(false);

        // Re-essayer après un délai en cas d'erreur
        timeoutId = setTimeout(getCurrentlyPlayingTrack, 60000);
      }
    };

    getCurrentlyPlayingTrack();

    // Nettoyer le timeout à la désactivation du composant
    return () => clearTimeout(timeoutId);
  }, []);

  if (!currentlyPlaying || !currentlyPlaying.item || isFetching) {
    return null;
  }

  const { item } = currentlyPlaying;
  const artistNames = item.artists.map((artist: any) => artist.name).join(', ');

  return (
    <div className="flex justify-center flex-col gap-4">
      <h3 className="text-primary text-base text-center sm:text-2xl">En cours de lecture :</h3>
      <div className="flex flex-col lg:flex-row items-center bg-primary  animated-border">
        <img src={item.album.images[0]?.url} alt={item.name} className="w-16 h-16 rounded-md mx-4" />
        <div>
          <p className="text-white font-semibold">{item.name}</p>
          <p className="text-grey text-sm">{artistNames}</p>
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;
