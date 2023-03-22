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
    <header className='bg-neutral-800 text-white'>
      <section className='max-w-4xl mx-auto p-4 py-5 flex justify-between items-center'>
        <Link to='/' className='text-3xl font-bold text-red-600 sm:text-4xl'>
          MyBookList
        </Link>
        <div>
          <button
            id='hamburger-button'
            className='text-3xl hover:text-red-600 md:hidden cursor-pointer'
            onClick={toggleMobileMenu}
          >
            &#9776;
          </button>
          <nav className='hidden md:block space-x-6 text-lg font-medium'>
            {user ? (
              <>
                <Link to='/profile' className='hover:text-red-600'>
                  Profile
                </Link>
                <Link to='/search' className='hover:text-red-600'>
                  Search
                </Link>
                <button
                  onClick={handleClick}
                  className='text-black bg-red-600 py-1.5 px-3 rounded-md hover:opacity-90'
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to='/login' className='hover:text-red-600'>
                  Login
                </Link>
                <Link
                  to='/signup'
                  className='text-black bg-red-600 py-2 px-3 rounded-md hover:opacity-90'
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
            : 'absolute top-0 bg-black w-full text-5xl flex flex-col justify-center md:hidden'
        }
        onClick={toggleMobileMenu}
      >
        <button className='text-8xl self-end px-6 hover:text-red-600'>
          &times;
        </button>
        <nav className='flex flex-col min-h-screen py-8'>
          <Link to='/' className='text-center py-6 hover:text-red-600'>
            Home
          </Link>
          {user ? (
            <>
              <Link
                to='/profile'
                className='text-center py-6 hover:text-red-600'
              >
                Profile
              </Link>
              <Link
                to='/search'
                className='text-center py-6 hover:text-red-600'
              >
                Search
              </Link>
              <button
                onClick={handleClick}
                className='text-center py-4 hover:text-red-600'
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to='/login' className='text-center py-6 hover:text-red-600'>
                Login
              </Link>
              <Link
                to='/signup'
                className='text-center py-4 hover:text-red-600'
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
