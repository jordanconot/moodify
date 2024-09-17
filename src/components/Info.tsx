import { useEffect, useRef, useState } from "react";

export default function Info() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      // Si la partie supérieure du composant est dans la fenêtre d'affichage, l'afficher
      if (sectionTop < windowHeight && scrollTop > 0) {
        setIsVisible(true);
      }
      // Si l'utilisateur est tout en haut de la page, cacher l'élément
      else if (scrollTop === 0) {
        setIsVisible(false);
      }
    };

    // Ajouter l'écouteur d'événement de scroll
    window.addEventListener('scroll', handleScroll);

    // Nettoyer l'écouteur d'événement de scroll lors du démontage du composant
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative z-10 mx-auto -mt-52 px-8 py-12 ${isVisible ? 'animate__animated animate__fadeInUp' : 'hidden'
        }`}
    >
      <div className="bg-custom-radial text-center mx-auto px-8 py-12 backdrop-blur-sm rounded-[40px]">
        <h2 className="text-primary text-xl sm:text-4xl font-semibold mb-4">
          Musique sur mesure pour votre Bien-Être
        </h2>
        <p className="text-gray-300 sm:text-xl font-normal mb-16">
          Laissez la musique s'harmoniser avec vos émotions et améliorez chaque moment avec des playlists adaptées à votre état d'esprit.
        </p>
        <div className="flex justify-around items-center flex-wrap gap-6">
          <div className="flex flex-col items-center">
            <img src="/assets/svg/smile.svg" alt="Sourire" className="w-10 h-10 mb-2" />
            <span className="text-primary text-xs sm:text-lg font-medium">Humeur</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="/assets/svg/cloud-sun.svg" alt="Soleil et nuage" className="w-10 h-10 mb-2" />
            <span className="text-primary text-xs  sm:text-lg font-medium">Adaptation</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="/assets/svg/heart-pulse.svg" alt="Cœur" className="w-10 h-10 mb-2" />
            <span className="text-primary text-xs  sm:text-lg font-medium">Synchronisation</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="/assets/svg/audio-lines.svg" alt="Onde audio" className="w-10 h-10 mb-2" />
            <span className="text-primary text-xs sm:text-lg font-medium">Personnalisation</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="/assets/svg/sparkles.svg" alt="Étoiles" className="w-10 h-10 mb-2" />
            <span className="text-primary text-xs sm:text-lg font-medium">Unique</span>
          </div>
        </div>
      </div>
    </section>
  )
}
