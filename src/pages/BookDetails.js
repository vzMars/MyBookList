import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState(null);
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

  return (
    <main className='max-w-6xl mx-auto mt-10 w-full'>
      <section className='px-3 md:px-10 flex flex-col'>
        {loading ? (
          <span className='loader self-center mt-5'></span>
        ) : (
          <h1 className='text-white'>
            {book.title} {id}
          </h1>
        )}
      </section>
    </main>
  );
};

export default BookDetails;
