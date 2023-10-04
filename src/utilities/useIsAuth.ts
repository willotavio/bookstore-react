import { useState, useEffect } from 'react';
import { isTokenValid } from '../utilities/tokenUtils';

export const useIsAuth = () => {
  const [userLogged, setUserLogged] = useState<boolean | null>(null);
  useEffect(() => {
    setUserLogged(isTokenValid(localStorage.getItem('token')));
  }, []);
  
  return {userLogged};
}