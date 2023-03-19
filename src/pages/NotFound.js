import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className='max-w-4xl m-auto'>
      <section className='flex flex-col justify-center items-center text-white mt-12 space-y-8 px-4'>
        <h1 className='text-9xl text-red-600 font-bold'>404</h1>
        <p className='lead fw-normal text-center font-medium'>
          Oops! The page you are looking for does not exist.
        </p>
        <Link
          to='/'
          className='text-black bg-red-600 py-3 px-4 rounded-md hover:opacity-90 font-bold text-xl'
        >
          Back To Home
        </Link>
      </section>
    </main>
  );
};

export default NotFound;
