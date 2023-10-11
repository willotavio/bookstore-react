import '../../App.css';
import { useContext } from 'react';
import { AuthorContext } from './Authors';

export const AuthorsList = () => {

  const { authors, editAuthor, deleteAuthor } = useContext(AuthorContext);

  return(
    <div className='listDefault'>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Biography</th>
            <th>Birth Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {authors?.map((author) => (
            <tr key={author.id}>
              <td>{author.id}</td>
              <td>{author.name}</td>
              <td>{author.biography}</td>
              <td>{author.birthDate}</td>
              <td>
                <button onClick={() => editAuthor(author.id)}>Update</button>
                <button onClick={() => deleteAuthor(author.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}