import { useContext } from 'react';
import '../../App.css';
import { User, UserContext } from './Users';

export const UsersList = () => {
  const { users } = useContext(UserContext);
  return(
    <div className='listDefault'>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {
            users?.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}