import Book from './Book';

const Books = ({ books, loading }) => {
  if (loading) {
    return <span className='loader self-center mt-5'></span>;
  }

  return (
    <ul className='mx-5 my-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 md:mx-0 lg:grid-cols-5 xl:gap-x-8'>
      {books.map((book) => (
        <Book key={book.id} book={book} />
      ))}
    </ul>
  );
};

export default Books;
