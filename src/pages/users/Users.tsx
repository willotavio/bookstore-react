import { useIsAuth } from '../../utilities/useIsAuth';
import { Navigate } from 'react-router-dom';
import '../../App.css';
import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';
import { UsersList } from './UsersList';

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
    <div>
      <h1>Users</h1>
      <UsersList users={users}/>
    </div>
  );
}