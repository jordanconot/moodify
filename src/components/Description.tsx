/* eslint-disable @typescript-eslint/no-explicit-any */


import { useEffect, useRef, useState } from "react";
import { useUser } from "../hook/useUser";
import BtnTryFree from "./btn/BtnTryFree";
import LoginSpotify from "./log/LoginSpotify";
import NowPlaying from "./spotify/NowPlaying";

export default function Description({ onTryFreeClick }: { onTryFreeClick: () => void }) {
  const { user, setUser } = useUser();

  const handleLogin = (userData: any) => {
    setUser(userData); // Met à jour l'état avec les informations de l'utilisateur connecté
  };

  const leftDivRef = useRef<HTMLDivElement | null>(null);
  const centerDivRef = useRef<HTMLDivElement | null>(null);
  const rightDivRef = useRef<HTMLDivElement | null>(null);

  const [leftDivVisible, setLeftDivVisible] = useState(false);
  const [centerDivVisible, setCenterDivVisible] = useState(false);
  const [rightDivVisible, setRightDivVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (leftDivRef.current) {
        const rect = leftDivRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          setLeftDivVisible(true);
        }
      }
      if (centerDivRef.current) {
        const rect = centerDivRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          setCenterDivVisible(true);
        }
      }
      if (rightDivRef.current) {
        const rect = rightDivRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          setRightDivVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Vérifier l'état initial
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <section className="mt-52 p-4 min-h-screen flex flex-col justify-center">
      <div className="p-6 flex flex-col gap-6 items-center">
        <div className="flex-col flex xl:flex-row relative gap-7">
          <div
            ref={leftDivRef}
            className={`w-full xl:w-1/2 p-8 flex flex-col items-center justify-center bg-custom-radial rounded-[40px] relative z-10 transform xl:-translate-y-20 shadow-lg transition-transform duration-700 ease-in-out ${leftDivVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-60'
              }`}
          >
            <p className='text-primary text-center'>
              Pour vous offrir une expérience musicale personnalisée, nous allons analyser votre état d'esprit à travers un court questionnaire.
              Vos réponses nous permettront de mieux comprendre vos émotions et de vous recommander des playlists parfaitement adaptées à votre humeur actuelle.
              Prenez quelques instants pour répondre au questionnaire et laissez-nous créer la bande-son idéale pour accompagner votre journée.
            </p>
            <div className="flex justify-center mt-4">
              <BtnTryFree onClick={onTryFreeClick} />
            </div>
          </div>
          <div
            ref={centerDivRef}
            className={`w-full xl:w-1/2 p-8 gap-7 flex flex-col items-center justify-center bg-custom-radial rounded-[40px] relative z-20  shadow-lg transition-transform  duration-700 ease-in-out ${centerDivVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-60'
              }`}
          >
            {!user && (
              <>
                <p className="text-primary text-center">
                  Connectez vous à notre compte Spotify de test (dans l'attente que Spotify valide l'application), vous pourrez profiter pleinement de l'expérience avec un accès illimité à toutes les playlists que nous recommandons, sans interruptions. Vous aurez également accès à des fonctionnalités supplémentaires, telles qu'un graphique interactif montrant l'évolution des genres musicaux préférés, ainsi que des statistiques détaillées sur la façon dont les morceaux les plus écoutés ont évolué au fil du temps. 🎵
                </p>
                <p className="text-primary text-center">De plus, découvrez de nouvelles chansons de manière ludique avec notre roue de découverte musicale : faites-la tourner pour obtenir des recommandations surprises basées sur vos goûts musicaux actuels ! 🎶</p>
                <div className="text-primary text-center text-base font-semibold">
                  <p className="text-primary text-center">Utilisez le compte suivant pour vous connecter à Spotify :</p>
                  <p className="text-primary text-center">Email : moodify@gmail.com</p>
                  <p className="text-primary text-center">Mot de passe : Moodify34000</p>
                </div>
              </>
            )}
            {user ? (
              <div className="flex flex-col gap-3">
                <p className="text-primary text-center font-semibold">
                  Vous êtes connecté en tant que {user.display_name} 🎧
                </p>
                <NowPlaying />
              </div>
            ) : (
              <LoginSpotify onLogin={handleLogin} buttonClassName="w-full max-w-xs hover:bg-green-600 text-white py-3 px-6 rounded-full text-center" />
            )}
          </div>
          {!user && (
            <div
              ref={rightDivRef}
              className={`w-full xl:w-1/2 p-8 gap-7 flex flex-col items-center justify-center bg-custom-radial rounded-[40px] relative z-20 transform xl:-translate-y-20 shadow-lg transition-transform duration-700 ease-in-out ${rightDivVisible ? 'opacity-100 xl:translate-x-0' : 'opacity-0 xl:translate-x-60'
                }`}
            >
              <p className="text-primary text-center mt-4">
                Si vous choisissez de ne pas vous connecter, vous pourrez toujours écouter les playlists que nous proposons, mais votre expérience sera limitée par les restrictions de la version gratuite de Spotify, telles que les publicités et l'écoute en mode shuffle uniquement.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
