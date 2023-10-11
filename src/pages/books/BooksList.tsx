import '../../App.css';
import { useContext } from 'react';
import { BookContext } from './Books';

export const BooksList = () => {
  const { books, authors, editBook, deleteBook } = useContext(BookContext);
  return(
    <div className='listDefault'>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Synopsis</th>
            <th>Release Date</th>
            <th>Price</th>
            <th>Author</th>
            <th>Actions</th>
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
              <td>
                <button onClick={() => editBook(book.id)}>Update</button>
                <button onClick={() => deleteBook(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
}