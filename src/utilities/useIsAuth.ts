import { useState, useEffect } from 'react';
import { isTokenValid } from '../utilities/tokenUtils';

export const useIsAuth = () => {
  const [userLogged, setUserLogged] = useState<boolean>(isTokenValid(localStorage.getItem('token')));
  const defaultUserValue = {};
  const storedUserValue = localStorage.getItem('user');
  const [user, setUser] = useState(storedUserValue ? JSON.parse(storedUserValue) : defaultUserValue);
  
  useEffect(() => {
    const handleStorage = () => {
      setUserLogged(isTokenValid(localStorage.getItem('token')));
      setUser(user);
    }
    window.addEventListener('storage', () => handleStorage());
    return () => window.removeEventListener('storage', () => handleStorage());
  }, []);
  
  return {userLogged, user};
}