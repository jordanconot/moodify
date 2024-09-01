import { useEffect, useRef, useState } from "react";
import { Mood } from "../../types/moodTypes";
import { moodEmojis } from "../../utils/moodEmojis";
import BtnTryFree from "../btn/BtnTryFree";
import SpotifyPlayer from "./SpotifyPlayer";

interface MoodPlaylistsProps {
  mood: Mood;
  playlists: string[];
  onTryFreeClick: () => void;
}

export default function MoodPlaylists({ mood, playlists, onTryFreeClick }: MoodPlaylistsProps) {
  const textSectionRef = useRef<HTMLDivElement | null>(null);
  const playlistsSectionRef = useRef<HTMLDivElement | null>(null);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [arePlaylistsVisible, setArePlaylistsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (textSectionRef.current) {
        const textTop = textSectionRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (textTop < windowHeight) {
          setIsTextVisible(true);
        }
      }
      if (playlistsSectionRef.current) {
        const playlistsTop = playlistsSectionRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (playlistsTop < windowHeight) {
          setArePlaylistsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="mt-52 p-4 min-h-screen flex flex-col justify-center">
      <div
        ref={textSectionRef}
        className={`flex flex-col items-center justify-center gap-4 ${isTextVisible ? 'animate__animated animate__fadeIn' : 'opacity-0'}`}
      >
        <h2 className="text-4xl sm:text-7xl text-primary text-center">Playlists</h2>
        <p className="text-2xl sm:text-4xl text-primary text-center">Vos playlists pour votre état d'esprit : <span className="text-2xl sm:text-4xl font-bold">{mood} {moodEmojis[mood]}</span>
        </p>
        <p className="text-grey text-center"> Pour découvrir d'autres playlists adaptées à votre humeur, nous vous invitons à répondre à nouveau au questionnaire.</p>
        <BtnTryFree onClick={onTryFreeClick} />
      </div>
      <div ref={playlistsSectionRef} className="flex flex-wrap justify-center mt-8">
        {playlists.map((playlistUri, index) => (
          <div
            key={playlistUri}
            className={`w-full sm:w-1/2 lg:w-1/3 p-4 ${arePlaylistsVisible ? 'animate__animated animate__fadeInUp animate__delay-2s' : 'opacity-0'}`}
            style={{ animationDelay: `${index * 0.2}s` }} // Décalage de temps pour chaque playlist
          >
            <SpotifyPlayer playlistUri={playlistUri} />
          </div>
        ))}
      </div>
    </section>
  );
}
