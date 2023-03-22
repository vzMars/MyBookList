const Books = ({ books, loading }) => {
  if (loading) {
    return <span className='loader self-center mt-5'></span>;
  }

  return (
    <ul className='mb-5'>
      {books.map((book) => (
        <li className='text-white' key={book.key}>
          {book.title}
        </li>
      ))}
    </ul>
  );
};

export default Books;
