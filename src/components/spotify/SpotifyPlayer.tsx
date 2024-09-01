
interface SpotifyPlayerProps {
  playlistUri: string; // Utilisation du type Mood pour la prop mood
}

export default function SpotifyPlayer({ playlistUri }: SpotifyPlayerProps) {

  return (
    <div className="w-full p-4">
      <div className="flex flex-col items-center mt-8">
        <iframe
          src={`https://open.spotify.com/embed/playlist/${playlistUri.split(':').pop()}`}
          width="100%"
          height="400px"
          allow="encrypted-media"
          className="rounded-lg"
        ></iframe>
      </div>
    </div>
  );
}
