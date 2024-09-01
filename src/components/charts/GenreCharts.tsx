/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useArtistGenresBatch } from '../../hook/react query/useArtistGenres';
import { useTopTracks } from '../../hook/react query/useTopTracks';
import { useUser } from '../../hook/useUser';

interface GenreData {
  name: string;
  count: number;
  artists: string[];
}

const GenreChart = () => {
  const { user } = useUser();
  const [genreData, setGenreData] = useState<GenreData[]>([]);
  const [displayedGenres, setDisplayedGenres] = useState<GenreData[]>([]);

  const [isTextVisible, setIsTextVisible] = useState(false);
  const [isChartVisible, setIsChartVisible] = useState(false);

  const textSectionRef = useRef<HTMLDivElement | null>(null);
  const chartSectionRef = useRef<HTMLDivElement | null>(null);

  const { data: topTracks, isLoading: isLoadingTopTracks } = useTopTracks('long_term');
  const artistIds = topTracks ? topTracks.items.flatMap((track: { artists: any[]; }) => track.artists.map((artist) => artist.id)) : [];
  const { data: artistGenres, isLoading: isLoadingArtistGenres } = useArtistGenresBatch(artistIds);

  useEffect(() => {
    if (!user || isLoadingTopTracks || isLoadingArtistGenres || !topTracks || !artistGenres) {
      return;
    }

    const genreCounts: Record<string, { count: number, artists: Set<string> }> = {};

    for (const track of topTracks.items) {
      for (const artist of track.artists) {
        const genres = artistGenres[artist.id] || [];
        genres.forEach((genre) => {
          if (!genreCounts[genre]) {
            genreCounts[genre] = { count: 0, artists: new Set<string>() };
          }
          genreCounts[genre].count += 1;
          genreCounts[genre].artists.add(artist.name);
        });
      }
    }

    const sortedGenres = Object.keys(genreCounts)
      .map(genre => ({
        name: genre,
        count: genreCounts[genre].count,
        artists: Array.from(genreCounts[genre].artists),
      }))
      .sort((a, b) => b.count - a.count);

    const topGenres = sortedGenres.slice(0, 7);
    setGenreData(topGenres);
    updateDisplayedGenres(topGenres);
  }, [user, topTracks, artistGenres, isLoadingTopTracks, isLoadingArtistGenres]);

  const updateDisplayedGenres = (genres: GenreData[]) => {
    // Afficher uniquement les 3 premiers genres si la largeur de l'écran est inférieure à 600 pixels
    if (window.innerWidth < 600) {
      setDisplayedGenres(genres.slice(0, 3));
    } else {
      setDisplayedGenres(genres);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      updateDisplayedGenres(genreData);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [genreData]);

  useEffect(() => {
    const handleScroll = () => {
      if (textSectionRef.current) {
        const textTop = textSectionRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (textTop < windowHeight) {
          setIsTextVisible(true);
        }
      }
      if (chartSectionRef.current) {
        const chartTop = chartSectionRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (chartTop < windowHeight) {
          setIsChartVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Fonction pour tronquer les labels
  const renderTruncatedLabel = (props: any) => {
    const { x, y, payload } = props;
    const maxLabelLength = 10; // Longueur maximale des labels

    const truncatedLabel = payload.value.length > maxLabelLength
      ? `${payload.value.substring(0, maxLabelLength)}...`
      : payload.value;

    return (
      <text x={x} y={y} dy={16} textAnchor="middle" fill="#F9F9F9" fontSize={16}>
        {truncatedLabel}
      </text>
    );
  };

  return (
    <section className='mt-52 p-4'>
      <div ref={textSectionRef} className={`text-center mb-6 ${isTextVisible ? 'animate__animated animate__fadeIn' : 'opacity-0'}`}>
        <h2 className="text-primary text-4xl sm:text-7xl text-center mb-6">Analyse de vos genres musicaux</h2>
        <p className="text-grey text-center md:text-2xl mb-10 m-4">
          Ce graphique montre combien de fois chaque genre musical a été associé aux artistes
          parmi vos morceaux les plus écoutés. Notez que le nombre indiqué représente le nombre
          d'artistes associés à ce genre, et non le nombre d'écoutes du genre.
        </p>
      </div>
      <div ref={chartSectionRef} className={`${isChartVisible ? 'animate__animated animate__zoomIn' : 'opacity-0'}`}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={displayedGenres}
            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 30,
            }}
            barSize={40}
          >
            <XAxis
              dataKey="name"
              tick={renderTruncatedLabel}
              tickLine={false}
              interval={0}
            />
            <YAxis
              tick={{ fill: '#F9F9F9', fontSize: 16 }}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div
                      style={{ backgroundImage: 'radial-gradient(350.94% 343.49% at 51.82% -159.87%, #404657 70%, rgba(64, 70, 87, 0.00) 100%)', padding: '16px', borderRadius: '5px', color: '#F9F9F9' }}>
                      <p className='uppercase text-primary text-lg font-medium'>{data.name} : <span className='font-semibold'>{data.count}</span></p>
                      <p className='uppercase'>Artistes associés :</p>
                      <ul>
                        {data.artists.map((artist: string, index: number) => (
                          <li key={index}>{artist}</li>
                        ))}
                      </ul>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="count"
              fill="#37C25E"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default GenreChart;
