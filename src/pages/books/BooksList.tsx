import '../../App.css';
import { Author } from '../authors/AuthorsList';

export interface Book{
  id: string,
  title: string,
  synopsis: string,
  releaseDate: string,
  price: string,
  authorId: string
}

interface Props{
  books: Book[];
  authors: Author[];
}

export const BooksList = (props: Props) => {
  const { books, authors } = props;
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
          </tr>
        </thead>
        <tbody>
          {books.map((book: Book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.synopsis}</td>
              <td>{book.releaseDate}</td>
              <td>{book.price}</td>
              <td>{
                  authors?.filter((author) => author.id === book.authorId)[0].name
                }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
}