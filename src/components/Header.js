import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const toggleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  const handleClick = () => {
    logout();
  };

  return (
    <header className='bg-blue-900 text-white'>
      <section className='max-w-6xl mx-auto p-4 py-5 flex justify-between items-center'>
        <Link to='/' className='text-3xl font-bold text-white sm:text-4xl'>
          MyBookList
        </Link>
        <div>
          <button
            id='hamburger-button'
            className='text-3xl hover:opacity-90 md:hidden cursor-pointer'
            onClick={toggleMobileMenu}
          >
            &#9776;
          </button>
          <nav className='hidden md:block space-x-6 text-lg font-medium'>
            {user ? (
              <>
                <Link
                  to={`/user/${user.userName}`}
                  className='hover:opacity-90'
                >
                  Profile
                </Link>
                <Link to='/search' className='hover:opacity-90'>
                  Search
                </Link>
                <Link to='/users' className='hover:opacity-90'>
                  Users
                </Link>
                <button
                  onClick={handleClick}
                  className='text-blue-900 bg-white py-1.5 px-3 rounded-md hover:opacity-90'
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to='/login' className='hover:opacity-90'>
                  Login
                </Link>
                <Link
                  to='/signup'
                  className='text-blue-900 bg-white py-2 px-3 rounded-md hover:opacity-90'
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </section>
      <section
        id='mobile-menu'
        className={
          !mobileMenu
            ? 'hidden md:hidden'
            : 'fixed z-10 top-0 bg-black w-full text-2xl flex flex-col justify-center md:hidden'
        }
        onClick={toggleMobileMenu}
      >
        <button className='text-7xl self-end px-6 hover:text-blue-900'>
          &times;
        </button>
        <nav className='flex flex-col min-h-screen py-4'>
          <Link to='/' className='text-center py-4 hover:text-blue-900'>
            Home
          </Link>
          {user ? (
            <>
              <Link
                to={`/user/${user.userName}`}
                className='text-center py-4 hover:text-blue-900'
              >
                Profile
              </Link>
              <Link
                to='/search'
                className='text-center py-4 hover:text-blue-900'
              >
                Search
              </Link>
              <Link
                to='/users'
                className='text-center py-4 hover:text-blue-900'
              >
                Users
              </Link>
              <button
                onClick={handleClick}
                className='text-center py-4 hover:text-blue-900'
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to='/login'
                className='text-center py-4 hover:text-blue-900'
              >
                Login
              </Link>
              <Link
                to='/signup'
                className='text-center py-4 hover:text-blue-900'
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </section>
    </header>
  );
};

export default Header;
