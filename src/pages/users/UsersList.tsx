import { useContext } from 'react';
import '../../App.css';
import { User, UserContext } from './Users';

export const UsersList = () => {
  const { users, editUser, deleteUser } = useContext(UserContext);
  return(
    <div className='listDefault'>
      <table>
        <thead>
          <tr>
            <th>Profile Picture</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            users?.map((user) => (
              <tr key={user.id}>
                <td>
                  <img className='profilePic' src={`http://localhost:8080/uploads/profile-pictures/${user.profilePicture ? user.id : 'null'}-profilepic.jpg`}></img>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => editUser(user.id)}>Update</button>
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}