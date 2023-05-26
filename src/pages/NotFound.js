import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className='max-w-6xl m-auto'>
      <section className='flex flex-col justify-center items-center text-neutral-800 mt-12 space-y-8 px-4'>
        <h1 className='text-9xl text-blue-900 font-bold'>404</h1>
        <p className='lead fw-normal text-center font-medium'>
          Oops! The page you are looking for does not exist.
        </p>
        <Link
          to='/'
          className='text-white bg-blue-900 py-3 px-4 rounded-md hover:opacity-90 font-bold text-xl'
        >
          Back To Home
        </Link>
      </section>
    </main>
  );
};

export default NotFound;
