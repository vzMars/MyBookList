import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main className='max-w-4xl m-auto'>
      <section className='flex flex-col justify-center items-center text-white mt-12 space-y-8'>
        <h1 className='text-5xl md:text-7xl text-red-600 font-bold'>
          MyBookList
        </h1>
        <p className='text-center px-5 md:px-40 text-lg font-medium'>
          Discover & keep track of books you love, find passionate readers like
          you and be part of the readers' revolution!
        </p>
        <div className='flex space-x-5 font-bold'>
          <Link
            to='/login'
            className='text-black bg-red-600 py-3 px-4 rounded-md hover:opacity-90'
          >
            Login
          </Link>
          <Link
            to='/signup'
            className='text-black bg-red-600 py-3 px-4 rounded-md hover:opacity-90'
          >
            Sign Up
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
