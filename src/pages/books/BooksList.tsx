import '../../App.css';
import { useContext } from 'react';
import { BookContext } from './Books';
import { useIsAuth } from '../../utilities/useIsAuth';

export const BooksList = () => {

  const { user } = useIsAuth();

  const { books, authors, editBook, deleteBook } = useContext(BookContext);
  return(
    <div>
      {
        books?.length < 1 
        ?
        <h1>There's no books</h1>
        :
        <div className='defaultTable'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Synopsis</th>
              <th>Release Date</th>
              <th>Price</th>
              <th>Author</th>
              {
                user.role >= 2 &&
                <th>Actions</th>
              }
            </tr>
          </thead>
          <tbody>
            {books?.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.synopsis}</td>
                <td>{book.releaseDate}</td>
                <td>{book.price}</td>
                <td>{
                    authors?.filter((author) => author.id === book.authorId)[0].name
                  }</td>
                {
                  user.role >= 2 &&
                  <td>
                    <button onClick={() => editBook(book.id)}>Update</button>
                    <button onClick={() => deleteBook(book.id)}>Delete</button>
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