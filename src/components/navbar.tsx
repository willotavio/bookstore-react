import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import { logout } from '../utilities/logout';
import { useContext } from 'react';
import { AppContext } from '../App';

export const Navbar = () => {
  const navigate = useNavigate();
  
  const { userLogged } = useContext(AppContext);

  return(
    <div className='navbar'>
      <Link className='link' to='/'>Ж</Link>
      <Link className='link' to='/book'>Books</Link>
      <Link className='link' to='/author'>Authors</Link>
      { userLogged
        ? <>
            <Link className='link' to={''} onClick={() => [logout(), navigate('/')]}>Logout</Link>
            <Link className='link' to={'/user'}>Users</Link>
          </>
        : <Link className='link' to='/login'>Login</Link>
      }  
    </div>
  );
}