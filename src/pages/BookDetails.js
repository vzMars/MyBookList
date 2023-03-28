import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import cover from '../images/cover.png';

const BookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [readMore, setReadMore] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetails = async () => {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/books/${id}`, {
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
        setBook(json);
      }
    };

    getDetails();
  }, [id, navigate]);

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
              <span>By {book.authors.join(', ')}</span>
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
                <p className='mt-5'>Description Unavailable</p>
              )}
              <div className='flex space-x-2 text-black font-bold'>
                <button className='p-2 bg-green-500 rounded-md hover:opacity-90'>
                  Want to Read
                </button>
                <button className='p-2 bg-green-500 rounded-md hover:opacity-90'>
                  Currently Reading
                </button>
                <button className='p-2 bg-green-500 rounded-md hover:opacity-90'>
                  Read
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
