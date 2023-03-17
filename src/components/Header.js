import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const Header = () => {
  const { user } = useAuthContext();

  const handleClick = () => {
    console.log('logout btn clicked');
  };

  return (
    <header>
      <Link to='/'>MyBookList</Link>
      <nav>
        {user ? (
          <>
            <Link to='/profile'>Profile</Link>
            <button onClick={handleClick}>Logout</button>
          </>
        ) : (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
