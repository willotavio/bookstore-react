import '../../App.css';
import { useContext } from 'react';
import { AuthorContext } from './Authors';
import { useIsAuth } from '../../utilities/useIsAuth';

export const AuthorsList = () => {

  const { user } = useIsAuth();

  const { authors, editAuthor, deleteAuthor } = useContext(AuthorContext);

  return(
    <div>
      {
        authors?.length < 1 
        ?
        <h1>There's no authors</h1>
        :
        <div className='defaultTable'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Biography</th>
              <th>Birth Date</th>
              {
                user.role >= 2 &&
                <th>Actions</th>
              }
            </tr>
          </thead>
          <tbody>
            {authors?.map((author) => (
              <tr key={author.id}>
                <td>{author.id}</td>
                <td>{author.name}</td>
                <td>{author.biography}</td>
                <td>{author.birthDate}</td>
                {
                  user.role >= 2 &&
                  <td>
                  <button onClick={() => editAuthor(author.id)}>Update</button>
                  <button onClick={() => deleteAuthor(author.id)}>Delete</button>
                </td>
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      }
    </div>
    
  );
}