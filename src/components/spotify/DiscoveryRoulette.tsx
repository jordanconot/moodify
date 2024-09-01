import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../hook/UserContext';
import { useRecommendations } from '../../hook/react query/useRecommendations';

interface RouletteItem {
  id: string;
  name: string;
  image: string | null;
  external_urls: {
    spotify: string;
  };
}

const DiscoveryRoulette = () => {
  const userContext = useContext(UserContext);
  const [selectedItem, setSelectedItem] = useState<RouletteItem | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const spinSoundRef = useRef<HTMLAudioElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const { data: recommendations, isError, error } = useRecommendations();

  const rouletteItems = recommendations?.map((rec) => ({
    id: rec.id,
    name: rec.name,
    image: rec.image || null,
    external_urls: rec.external_urls,
  })) || [];

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const sectionTop = sectionRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const spinRoulette = () => {
    if (!isSpinning && rouletteItems.length > 0) {
      setIsSpinning(true);

      if (spinSoundRef.current) {
        spinSoundRef.current.play();
      }

      // Déterminer un angle de rotation aléatoire
      const randomIndex = Math.floor(Math.random() * rouletteItems.length);
      const anglePerItem = 360 / rouletteItems.length;
      const newRotationAngle = 360 * 4 + randomIndex * anglePerItem; // 4 tours complets plus un angle spécifique
      setRotationAngle(newRotationAngle);

      setTimeout(() => {
        setSelectedItem(rouletteItems[randomIndex]);
        setIsSpinning(false);
      }, 3000);
    }
  };

  if (!userContext || !userContext.user) {
    return null;
  }

  if (isError) {
    console.error('Erreur lors de la récupération des recommandations:', error);
    return <div>Erreur lors de la récupération des recommandations.</div>;
  }

  return (
    <section ref={sectionRef} className="mt-52 p-4 min-h-screen flex flex-col justify-center">
      <div className={`text-center mb-8 m-4 ${isVisible ? 'animate__animated animate__fadeIn' : 'opacity-0'}`}>
        <h2 className="text-4xl sm:text-7xl text-primary">Découverte Musicale</h2>
        <p className="text-grey md:text-2xl mt-4">
          Faites tourner la roue pour découvrir de nouvelles chansons recommandées rien que pour vous !
        </p>
      </div>
      <div className='flex-col flex items-center mt-12 justify-evenly lg:flex-row'>
        <div className={`flex flex-col items-center ${isVisible ? 'animate__animated animate__zoomIn' : 'opacity-0'}`}>
          <div className="w-[300px] h-[300px] relative overflow-hidden sm:w-[400px] sm:h-[400px] rounded-full ">
            <div
              className={`roulette-wheel`}
              style={{ transform: `rotate(${rotationAngle}deg)` }}
            >
              {rouletteItems.map((item, index) => (
                <div
                  key={item.id}
                  className="roulette-sector"
                  style={{
                    transform: `rotate(${index * (360 / rouletteItems.length)}deg)`,
                  }}
                >
                  <div
                    className="roulette-image"
                    style={{
                      backgroundImage: `url(${item.image})`,
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={spinRoulette}
            className="mt-8 p-2 px-6 border-solid border-2 w-full max-w-xs border-[#37C25E] rounded-full hover:text-primary hover:bg-green-600 text-secondary font-semibold uppercase"
          >
            Découvrir
          </button>
        </div>
        {selectedItem && !isSpinning && (
          <div className="result mt-8 text-center">
            <h3 className="text-primary text-xl">{selectedItem.name}</h3>
            <iframe
              src={`https://open.spotify.com/embed/track/${selectedItem.id}`}
              width="300"
              height="380"
              allow="encrypted-media"
              className="mx-auto my-4"
            ></iframe>
          </div>
        )}
      </div>
      <audio ref={spinSoundRef} src="/assets/sounds/spin.wav" />
    </section>
  );
};

export default DiscoveryRoulette;
