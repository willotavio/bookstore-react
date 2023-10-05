import { useState, useEffect } from 'react';
import { isTokenValid } from '../utilities/tokenUtils';

export const useIsAuth = () => {
  const [userLogged, setUserLogged] = useState<boolean>(isTokenValid(localStorage.getItem('token')));
  useEffect(() => {
    const handleStorage = () => {
      setUserLogged(isTokenValid(localStorage.getItem('token')));
    }
    window.addEventListener('storage', () => handleStorage());
    return () => window.removeEventListener('storage', () => handleStorage());
  }, []);
  
  return {userLogged};
}