import '../../App.css';

interface Props{
  users: User[];
}

export interface User{
  id: string;
  name: string;
  email: string;
  password: string;
  role: number
}

export const UsersList = (props: Props) => {
  const { users } = props;
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