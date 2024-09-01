/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import Banner from "../components/banner/Banner";
import GenreChart from "../components/charts/GenreCharts";
import Description from "../components/Description";
import Footer from "../components/Footer";
import Info from "../components/Info";
import Questionnaire from "../components/modals/Questionnaire";
import Navbar from "../components/nav/Navbar";
import { CustomSkeleton } from "../components/skeleton/CustomSkeleton";
import DiscoveryRoulette from "../components/spotify/DiscoveryRoulette";
import FavoriteTracks from "../components/spotify/FavoriteTracks";
import MoodPlaylists from "../components/spotify/MoodPlaylists";
import { useTopTracks } from "../hook/react query/useTopTracks";
import { useUser } from "../hook/useUser";
import { fetchUserProfile, searchPlaylistsByMood } from "../services/ApiSpotify";
import { Mood } from "../types/moodTypes";
import { moodToPlaylist } from "../utils/moodPlaylist";

export default function Home() {
  const { user } = useUser();
  const [mood, setMood] = useState<Mood | null>(null);
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [isSpotifyConnected, setIsSpotifyConnected] = useState<boolean>(true);
  const [categorizedTracks, setCategorizedTracks] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState<boolean>(true);

  const playlistsRef = useRef<HTMLDivElement | null>(null);

  const { data: longTermTracks } = useTopTracks('long_term');
  const { data: mediumTermTracks } = useTopTracks('medium_term');
  const { data: shortTermTracks } = useTopTracks('short_term');


  useEffect(() => {
    const savedPlaylists = localStorage.getItem('playlists');
    const savedMood = localStorage.getItem('mood');

    if (savedPlaylists && savedMood) {
      setPlaylists(JSON.parse(savedPlaylists));
      setMood(savedMood as Mood);
      setLoading(false);
    } else {
      const getUserData = async () => {
        try {
          if (user) {
            await fetchUserProfile();  // On attend juste la résolution
            setIsSpotifyConnected(true);
          } else {
            setIsSpotifyConnected(false);
          }
        } catch (err) {
          console.error(err);
          setIsSpotifyConnected(false);
        } finally {
          setLoading(false);
        }
      };
      getUserData();
    }
  }, [user]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (mood) {
        setLoading(true);
        if (!isSpotifyConnected) {
          // Si non connecté, utiliser les playlists par défaut
          const playlistUris = [moodToPlaylist[mood]];
          setPlaylists(playlistUris);
          localStorage.setItem('playlists', JSON.stringify(playlistUris));
          localStorage.setItem('mood', mood);
          setLoading(false);
        } else {
          try {
            const playlistData = await searchPlaylistsByMood(mood);
            const playlistUris = playlistData.map(p => p.uri);
            setPlaylists(playlistUris);
            localStorage.setItem('playlists', JSON.stringify(playlistUris));
            localStorage.setItem('mood', mood);
          } catch (err) {
            console.error(err);
          } finally {
            setTimeout(() => setLoading(false), 1000);
          }
        }
      }
    };

    fetchPlaylists();
  }, [mood, isSpotifyConnected]);

  useEffect(() => {
    if (!isSpotifyConnected || !localStorage.getItem('spotifyAccessToken')) return;

    if (longTermTracks && mediumTermTracks && shortTermTracks) {
      const categorizedTracks = {
        'Il y a longtemps': longTermTracks.items,
        'Des mois plus tôt': mediumTermTracks.items,
        'Aujourd\'hui': shortTermTracks.items,
      };

      setCategorizedTracks(categorizedTracks);
    }
  }, [isSpotifyConnected, longTermTracks, mediumTermTracks, shortTermTracks]);

  const handleMoodDetermined = (determinedMood: Mood) => {
    setMood(determinedMood);
    setIsQuestionnaireOpen(false);
  };

  const handleQuestionnaireClose = (mood?: string) => {
    if (mood) {
      handleMoodDetermined(mood as Mood);
      if (playlistsRef.current) {
        playlistsRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setIsQuestionnaireOpen(false);
    }
  };

  const handleTryFreeClick = () => {
    setIsQuestionnaireOpen(true);
  };


  return (
    <>
      <Navbar />
      <Banner />
      <main>
        <Info />
        <Description onTryFreeClick={handleTryFreeClick} />
        {mood && (
          loading ? (
            <div className="flex flex-wrap justify-center mt-52">
              {[...Array(9)].map((_, index) => (
                <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-4">
                  <CustomSkeleton variant="rectangular" height={400} />
                </div>
              ))}
            </div>
          ) : (
            mood && playlists.length > 0 && (
              <div ref={playlistsRef}>
                <MoodPlaylists mood={mood} playlists={playlists} onTryFreeClick={handleTryFreeClick} />
              </div>
            )
          )
        )}
        {isQuestionnaireOpen && (
          <Questionnaire onClose={handleQuestionnaireClose} isOpen={isQuestionnaireOpen} />
        )}
        {isSpotifyConnected && <FavoriteTracks categorizedTracks={categorizedTracks} isSpotifyConnected={isSpotifyConnected} />}
        {isSpotifyConnected && <GenreChart />}
        {isSpotifyConnected && <DiscoveryRoulette />}
      </main>
      <Footer />
    </>
  );
}
