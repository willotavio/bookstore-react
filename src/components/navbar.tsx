import { Link } from 'react-router-dom';
import '../App.css';

export const Navbar = () => {
  return(
    <div className='navbar'>
      <Link className='link' to='/'>Ж</Link>
      <Link className='link' to='/book'>Books</Link>
      <Link className='link' to='/author'> Authors</Link>
    </div>
  );
}