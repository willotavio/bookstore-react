import '../../App.css';
import { useContext } from 'react';
import { AuthorContext } from './Authors';

export interface Author{
  id: string,
  name: string,
  biography: string,
  birthDate: string
}

export const AuthorsList = () => {

  const { authors } = useContext(AuthorContext);

  return(
    <div className='listDefault'>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Biography</th>
            <th>Birth Date</th>
          </tr>
        </thead>
        <tbody>
          {authors?.map((author) => (
            <tr key={author.id}>
              <td>{author.id}</td>
              <td>{author.name}</td>
              <td>{author.biography}</td>
              <td>{author.birthDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}