import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookContext } from '../hooks/useBookContext';
import cover from '../images/cover.png';

const BookDetails = () => {
  const { dispatch } = useBookContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [status, setStatus] = useState(null);
  const [readMore, setReadMore] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetails = async () => {
      setLoading(true);
      const response = await fetch(`mybooklist-api.fly.dev/api/books/${id}`, {
        method: 'GET',
        credentials: 'include',
      });

      const json = await response.json();

      if (!response.ok) {
        setLoading(false);
        navigate('/404');
      }

      if (response.ok) {
        setLoading(false);
        setBook(json.details);
        setStatus(json.status);
      }
    };

    getDetails();
  }, [id, navigate]);

  const addBook = async (e) => {
    const newBook = {
      bookId: id,
      title: book.title,
      authors: book.authors ? book.authors : ['Unknown Author'],
      cover: !book.imageLinks ? '' : book.imageLinks.thumbnail,
      status: e.target.value,
    };

    const response = await fetch('mybooklist-api.fly.dev/api/books', {
      method: 'POST',
      body: JSON.stringify(newBook),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const json = await response.json();

    if (response.ok) {
      setStatus(e.target.value);
      dispatch({ type: 'ADD_BOOK', payload: json });
    }
  };

  const updateStatus = async (e) => {
    const updatedStatus = {
      status: e.target.value,
    };

    const response = await fetch(`mybooklist-api.fly.dev/api/books/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedStatus),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const json = await response.json();

    if (response.ok) {
      setStatus(e.target.value);
      dispatch({ type: 'UPDATE_BOOK', payload: json });
    }
  };

  const regex = /(<([^>]+)>)/gi;

  return (
    <main className='max-w-6xl mx-auto mt-10 w-full'>
      <section className='px-3 md:px-10 flex flex-col mb-10'>
        {loading ? (
          <span className='loader self-center mt-5'></span>
        ) : (
          <div className='text-white bg-neutral-800 p-5 rounded-md flex flex-col gap-3 md:gap-5 md:flex-row'>
            <img
              src={
                !book.imageLinks
                  ? cover
                  : book.imageLinks.small
                  ? book.imageLinks.small
                  : book.imageLinks.thumbnail
              }
              className='border border-neutral-500 h-full'
              alt={book.title}
            />
            <div className='flex flex-col'>
              <h1 className='text-2xl font-bold text-red-600'>{book.title}</h1>
              <span>
                By {book.authors ? book.authors.join(', ') : 'Unknown Author'}
              </span>
              {book.description ? (
                <>
                  <p className='mt-5'>
                    {readMore
                      ? book.description?.replace(regex, '')
                      : `${book.description
                          ?.replace(regex, '')
                          .slice(0, 500)}...`}
                  </p>
                  <button
                    className='font-bold self-end m-5 text-black bg-red-600 p-2 rounded-md hover:opacity-90'
                    onClick={() => setReadMore(!readMore)}
                  >
                    {readMore ? 'Read Less' : 'Read More'}
                  </button>
                </>
              ) : (
                <p className='mt-5 mb-5'>Description Unavailable</p>
              )}
              <div className='flex space-x-2 text-black font-bold'>
                <button
                  className={`p-1.5 py-2 hover:opacity-90 rounded-md ${
                    status === 'reading' ? 'bg-green-600' : 'bg-red-600'
                  }`}
                  value='reading'
                  disabled={status === 'reading'}
                  onClick={status ? updateStatus : addBook}
                >
                  Reading
                </button>
                <button
                  className={`p-1.5 py-2 hover:opacity-90 rounded-md ${
                    status === 'completed' ? 'bg-green-600' : 'bg-red-600'
                  }`}
                  value='completed'
                  disabled={status === 'completed'}
                  onClick={status ? updateStatus : addBook}
                >
                  Completed
                </button>
                <button
                  className={`p-1.5 py-2 hover:opacity-90 rounded-md ${
                    status === 'planning' ? 'bg-green-600' : 'bg-red-600'
                  }`}
                  value='planning'
                  disabled={status === 'planning'}
                  onClick={status ? updateStatus : addBook}
                >
                  Planning
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default BookDetails;
