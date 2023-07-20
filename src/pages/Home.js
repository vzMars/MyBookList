import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {
  const { user } = useAuthContext();
  const { login, isLoading } = useLogin();

  const handleGuestLogin = async (e) => {
    e.preventDefault();

    await login("mike@gmail.com", "Mike123!");
  };

  return (
    <main className='max-w-4xl m-auto'>
      <section className='flex flex-col justify-center items-center text-neutral-800 mt-12 space-y-8'>
        <h1 className='text-5xl md:text-7xl text-blue-900 font-bold'>
          MyBookList
        </h1>
        <p className='text-center px-5 md:px-40 text-lg font-medium'>
          Discover & keep track of books you love, find passionate readers like
          you and be part of the readers' revolution!
        </p>
        {user ? (
          <div>
            <Link
              to='/search'
              className='text-white bg-blue-900 py-3 px-4 rounded-md hover:opacity-90 font-bold text-2xl'
            >
              Search
            </Link>
          </div>
        ) : (
          <button
          disabled={isLoading}
          className='text-white bg-blue-900 py-3 px-4 rounded-md hover:opacity-90'
          onClick={handleGuestLogin}
        >
          Guest Login
        </button>
        )}
      </section>
    </main>
  );
};

export default Home;
