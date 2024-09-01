/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useEffect, useState } from 'react';

interface UserContextType {
  user: any;
  setUser: (userData: any) => void;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(() => {
    const savedUser = localStorage.getItem('spotifyUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('spotifyUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('spotifyUser');
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
