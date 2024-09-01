import { useEffect, useState } from 'react';

export default function Banner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Déclencher l'animation immédiatement lorsque la page est chargée
    setIsVisible(true);
  }, []);

  return (
    <header
    className={`relative h-screen bg-cover bg-center transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    style={{ backgroundImage: "url('/assets/img/banner.webp')" }}
  >
    <div className="absolute inset-0"></div>
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl sm:text-8xl 2xl:text-[124px] font-bold uppercase text-white font-['Anton']">
        <span
          className={`block animate__animated ${isVisible ? 'animate__zoomInDown' : 'opacity-0'} gradient-text`}
          style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
        >
          Votre musique
        </span>
        <span
          className={`block animate__animated ${isVisible ? 'animate__zoomInDown' : 'opacity-0'} gradient-text`}
          style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
        >
          Votre humeur
        </span>
      </h1>
      <p
        className={`text-base sm:text-2xl font-medium text-gray-300 mt-4 m-4 animate__animated ${isVisible ? 'animate__zoomInDown' : 'opacity-0'}`}
        style={{ animationDelay: '0.6s', animationFillMode: 'both' }}
      >
        Vivez la musique de manière immersive, avec des playlists qui reflètent vos sentiments et vos envies du moment.
      </p>
    </div>
  </header>
  );
}
