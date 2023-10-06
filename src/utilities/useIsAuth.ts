import { useState, useEffect } from 'react';
import { isTokenValid } from '../utilities/tokenUtils';
import { User } from '../pages/users/Users';

export const useIsAuth = () => {
  const [userLogged, setUserLogged] = useState<boolean>(isTokenValid(localStorage.getItem('token')));
  const defaultUserValue: User = {id: ""};
  const storedUserValue = localStorage.getItem('user');
  const [user, setUser] = useState<User>(storedUserValue ? JSON.parse(storedUserValue) : defaultUserValue);

  useEffect(() => {
    const handleLogin = () => {
      setUserLogged(isTokenValid(localStorage.getItem('token')));
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