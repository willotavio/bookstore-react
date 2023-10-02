import '../../App.css';

export interface Book{
  id: string,
  title: string,
  synopsis: string,
  releaseDate: string,
  price: string,
  authorId: string
}

interface Props{
  books: Book[]
}

export const BooksList = (props: Props) => {
  const { books } = props;
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
            <th>Author Id</th>
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
              <td>{book.authorId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
}