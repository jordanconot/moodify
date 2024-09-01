/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useAuthenticatedRequest.ts
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';

type FetchFunction<T> = () => Promise<T>;

export function useAuthenticatedRequest<T>(fetchFunction: FetchFunction<T>) {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useAuthenticatedRequest must be used within a UserProvider');
  }

  const { user } = context;
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!user) return; // Si l'utilisateur n'est pas connecté, ne pas faire la requête

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchFunction();
        setData(result);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, fetchFunction]);

  return { data, error, isLoading };
}
