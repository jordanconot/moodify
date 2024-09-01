/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useUser } from "../../hook/useUser";
import LoginSpotify from "../log/LoginSpotify";
import Logo from "../logo/Logo";

export default function Navbar() {
  const { user, setUser } = useUser();
  const [isLogoVisible, setIsLogoVisible] = useState(false);
  const [isUserVisible, setIsUserVisible] = useState(false);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const userRef = useRef<HTMLDivElement | null>(null);

  const handleLogin = (userData: any) => {
    setUser(userData);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLogoVisible(true);
      setIsUserVisible(true);
    }, 100);
  }, []);

  return (
    <nav className="p-3 sm:mx-14">
    <div className="flex items-center justify-between">
      {/* Animation du logo */}
      <div
        ref={logoRef}
        className={`transition-transform duration-700 ease-in-out ${isLogoVisible ? 'animate__animated animate__lightSpeedInLeft' : 'opacity-0'}`}
      >
        <Logo />
      </div>

      {/* Animation du texte de bienvenue ou du bouton de connexion */}
      <div
        ref={userRef}
        className={`flex gap-4 transition-transform duration-700 ease-in-out ${isUserVisible ? 'animate__animated animate__lightSpeedInRight' : 'opacity-0'}`}
      >
        {user ? (
          <span className="text-primary font-semibold sm:text-2xl">
            Bienvenue {user.display_name} 🖐️
          </span>
        ) : (
          <LoginSpotify onLogin={handleLogin} buttonClassName={'text-xs sm:text-lg'} />
        )}
      </div>
    </div>
  </nav>
  )
}
