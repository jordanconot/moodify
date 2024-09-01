import { useEffect, useRef, useState } from "react";

interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
  external_urls: { spotify: string };
  playHistory: number[];
}

interface FavoriteTracksProps {
  categorizedTracks: Record<string, Track[]>;
  isSpotifyConnected: boolean;
}

export default function FavoriteTracks({ categorizedTracks, isSpotifyConnected }: FavoriteTracksProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [categoryVisibilities, setCategoryVisibilities] = useState<Record<string, boolean>>({});

  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isSpotifyConnected) {
      return;
    }

    const handleScroll = () => {
      if (sectionRef.current) {
        const sectionTop = sectionRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight) {
          setIsVisible(true);
          Object.keys(categorizedTracks).forEach((category, index) => {
            setTimeout(() => {
              setCategoryVisibilities(prev => ({ ...prev, [category]: true }));
            }, index * 200); // Délais progressif de 200ms entre chaque catégorie
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isSpotifyConnected, categorizedTracks]);

  if (!isSpotifyConnected) {
    return null;
  }

  return (
    <section ref={sectionRef} className="mt-52 p-4 min-h-screen flex flex-col justify-center">
      <div className={`${isVisible ? 'animate__animated animate__fadeIn' : 'opacity-0'}`}>
        <h2 className="text-primary text-4xl sm:text-7xl text-center mb-6">Favoris</h2>
        <p className="text-grey text-center md:text-2xl mb-10 m-4">Comment vos morceaux les plus écoutés ont évolué sur une longue période</p>
      </div>
      <div className="flex flex-col xl:flex-row sm:justify-around">
        {Object.keys(categorizedTracks).map((category) => (
          <div
            key={category}
            className={`p-4 ${categoryVisibilities[category] ? 'animate__animated animate__slideInUp' : 'opacity-0'}`}
          >
            <h3 className="text-secondary text-xl">{category}</h3>
            <ul className="bg-custom-radial p-6 rounded-lg mt-4">
              {categorizedTracks[category].slice(0, 5).map((track, index) => (
                <a
                  key={track.id}
                  href={track.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:bg-primary"
                >
                  <li key={index} className="flex items-center p-4">
                    <img
                      src={track.album.images[0]?.url}
                      alt={track.name}
                      className="w-12 h-12 rounded-md mr-4"
                    />
                    <div>
                      <p className="text-white font-semibold">{track.name}</p>
                      <p className="text-grey text-sm">
                        {track.artists.map((artist) => artist.name).join(', ')}
                      </p>
                    </div>
                  </li>
                </a>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
