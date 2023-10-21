import { useState, useEffect } from 'react';
import { User } from '../pages/users/Users';
import { logout } from './logout';

export const useIsAuth = () => {
  const defaultUserValue: User = {} as User;
  const storedUserValue = localStorage.getItem('user');
  const [user, setUser] = useState<User>(storedUserValue ? JSON.parse(storedUserValue) : defaultUserValue);
  const [userLogged, setUserLogged] = useState<boolean>(user.id !== undefined);

  useEffect(() => {

    const getCookie = () => {
      let decodedCookie = decodeURIComponent(document.cookie);
      let cookieArray = decodedCookie.split(';');
      let isClientTokenPresent = false;
    
      cookieArray.forEach((cookie) => {
        if (cookie.trim().split('=')[0] === 'clientToken') {
          isClientTokenPresent = true;
        }
      });
      setUserLogged(isClientTokenPresent);
      if(!isClientTokenPresent){
        logout();
      }
    };

    getCookie();

    const handleLogin = async () => {
      setUserLogged(true);
      const updatedUserFromStorage = localStorage.getItem('user');
      const updatedUser = updatedUserFromStorage ? JSON.parse(updatedUserFromStorage) : defaultUserValue;
      setUser(updatedUser);
    };

    const handleLogout = () => {
      setUserLogged(false);
      setUser({} as User);
    };

    window.addEventListener('login', handleLogin);
    window.addEventListener('logout', handleLogout);

    return () => {
      window.removeEventListener('login', handleLogin);
      window.removeEventListener('logout', handleLogout);
    };
  }, []);

  return { userLogged, user };
};