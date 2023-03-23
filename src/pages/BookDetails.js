import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  // useEffect(() => {
  //   const response = await fetch(
  //     `http://localhost:5000/api/books/search/${query}`,
  //     {
  //       method: 'GET',
  //       credentials: 'include',
  //     }
  //   );
  // }, [])

  return (
    <main className='max-w-6xl mx-auto mt-10 w-full'>
      <section className='px-3 md:px-10 flex flex-col'>
        {loading ? (
          <span className='loader self-center mt-5'></span>
        ) : (
          <h1>BookDetails {id}</h1>
        )}
      </section>
    </main>
  );
};

export default BookDetails;
