import { useIsAuth } from '../../utilities/useIsAuth';
import { Navigate } from 'react-router-dom';
import '../../App.css';
import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';
import { UsersList } from './UsersList';
import { UserAddForm } from './UserAddForm';
import { UserUpdateForm } from './UserUpdateForm';
import { Dispatch, SetStateAction, createContext, useState } from 'react';
import { logout } from '../../utilities/logout';

export interface User{
  id: string;
  name?: string;
  email?: string;
  password?: string;
  role: number
  profilePicture?: string;
}

interface UserContextTypes{
  users: User[];
  refetchUsers: () => void;
  addUser: (data: User) => Promise<boolean>;
  editUser: (id: string) => void;
  updateUser: (id: string, data: User) => Promise<boolean>;
  deleteUser: (id: string) => void;
  selectedUser: User;
  setSelectedUser: Dispatch<SetStateAction<User>>;
}

export const UserContext = createContext<UserContextTypes>({
  users: [],
  refetchUsers: () => {},
  addUser: async (): Promise<boolean> => {return false},
  editUser: () => {},
  updateUser: async (): Promise<boolean> => {return false},
  deleteUser: () => {},
  selectedUser: {} as User,
  setSelectedUser: () => {}
});

export const handleFileSelect = (fileList: FileList): Promise<string> => {
  return new Promise((resolve, reject) => {
    const files = Array.from(fileList);

    if (files.length === 0) {
      reject(new Error('No files selected'));
    }

    const reader = new FileReader();
    const base64Strings: string[] = [];

    reader.onload = () => {
      if(typeof reader.result === 'string') {
        const base64String = reader.result.split(',')[1];
        if (base64String) {
          base64Strings.push(base64String);
        }
        if (base64Strings.length === files.length) {
          resolve(base64Strings[0]);
        }
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };
    files.forEach(file => {
      reader.readAsDataURL(file);
    });
  });
}

export const Users = () => {
  const { userLogged, user } = useIsAuth();

  const {data: users, refetch: refetchUsers} = useQuery(['users'], async () => {
    return await Axios.get('http://localhost:8080/user', {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}}).then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  });

  const addUser = async (data: User) => {
    try{
      await Axios.post('http://localhost:8080/user', data, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
      refetchUsers();
      return true;
    }
    catch(err){
      console.log(err);
      return false;
    }
  }

  const [selectedUser, setSelectedUser] = useState({} as User);
  const editUser = (userId: string) => {
    let result = users.filter((user: User) => user.id === userId)[0];
    setSelectedUser(result);
  }

  const updateUser = async (id: string, data: User) => {
    try{
      await Axios.put(`http://localhost:8080/user/${id}`, data, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
      refetchUsers();
      setSelectedUser({} as User);
      return true;
    }
    catch(err){
      console.log(err);
      return false;
    }
  }
  
  const deleteUser = async (id: string) => {
    try{
      await Axios.delete(`http://localhost:8080/user/${id}`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
      id === user.id && logout();
      refetchUsers();
    }
    catch(err){
      console.log(err);
    }
  };

  if(!userLogged || user.role < 3){
    return <Navigate to={'/'} />
  }
  return(
    <UserContext.Provider value={{users, refetchUsers, addUser, editUser, updateUser, deleteUser, selectedUser, setSelectedUser}}>
      <div>
        <h1>Users</h1>
        <UsersList/>
        <UserAddForm />
        { selectedUser.id && <UserUpdateForm /> }
      </div>
    </UserContext.Provider>
  );
}