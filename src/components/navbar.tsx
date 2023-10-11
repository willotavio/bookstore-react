import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import { logout } from '../utilities/logout';
import { useContext } from 'react';
import { AppContext } from '../App';

export const Navbar = () => {
  const navigate = useNavigate();
  
  const { userLogged, user } = useContext(AppContext);

  return(
    <div className='navbar'>
      <Link className='link' to='/'>Ж</Link>
      <Link className='link' to='/book'>Books</Link>
      <Link className='link' to='/author'>Authors</Link>
      { !userLogged &&
        <div className='userLink'>
          <Link className='link' to='/login'>Login</Link>
          <Link className='link' to='/register'>Register</Link>
        </div>
      }
      {userLogged && user && user?.role >= 3
        &&
        <>
          <Link className='link' to={'/user'}>Users</Link>
        </>
      }  
      { 
      userLogged && 
        <div className='user'>
          <Link to={'/profile'}>
            <img className='profilePic' src={
              `http://localhost:8080/uploads/profile-pictures/${user?.profilePicture && user.profilePicture.length > 0 ? user?.id : 'null'}-profilepic.jpg`
            }
            />
          </Link>
          <Link className='link' to={'/profile'}>{user?.name}</Link>
          <Link className='link' to={''} onClick={() => [logout(), navigate('/')]}>Logout</Link>
        </div>
      }
    </div>
  );
}