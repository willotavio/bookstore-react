import { Link } from 'react-router-dom';

export const Navbar = () => {
  return(
    <div>
      <Link to='/book'>Books</Link> |
      <Link to='/author'> Authors</Link>
    </div>
  );
}