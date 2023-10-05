import { useIsAuth } from '../../utilities/useIsAuth';
import { Navigate } from 'react-router-dom';
import '../../App.css';
import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';
import { UsersList } from './UsersList';
import { UserAddForm } from './UserAddForm';
import { createContext } from 'react';


export interface User{
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  role?: number
}

interface UserContextTypes{
  users?: User[];
  refetchUsers?: () => void;
}

export const UserContext = createContext<UserContextTypes>({});

export const Users = () => {
  const { userLogged } = useIsAuth();

  const {data: users, refetch: refetchUsers} = useQuery(['users'], async () => {
    return await Axios.get('http://localhost:8080/user', {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}}).then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  });

  if(!userLogged){
    return <Navigate to={'/'} />
  }
  return(
    <UserContext.Provider value={{users, refetchUsers}}>
      <div>
        <h1>Users</h1>
        <UsersList/>
        <UserAddForm />
      </div>
    </UserContext.Provider>
  );
}