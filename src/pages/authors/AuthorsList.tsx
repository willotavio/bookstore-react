import '../../App.css';

interface Props{
  authors: Author[];
}

export interface Author{
  id: string,
  name: string,
  birthDate: string
}

export const AuthorsList = (props: Props) => {
  const { authors } = props;
  return(
    <div className='listDefault'>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>birthDate</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.id}>
              <td>{author.id}</td>
              <td>{author.name}</td>
              <td>{author.birthDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}