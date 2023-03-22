const Books = ({ books, loading }) => {
  if (loading) {
    return <span className='loader self-center mt-5'></span>;
  }

  return (
    <ul className='mx-5 my-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 md:mx-0 lg:grid-cols-5 xl:gap-x-8'>
      {books.map((book) => (
        <li
          key={book.id}
          className='w-full overflow-hidden rounded-md bg-neutral-800 lg:h-80 border border-neutral-500 hover:border-neutral-200 hover:border-2'
        >
          <a href={`/books/${book.id}`}>
            {book.volumeInfo.imageLinks ? (
              <img
                className='h-full w-full object-cover object-center'
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
              />
            ) : (
              <div className='h-full w-full object-cover object-center text-white flex justify-center items-center'>
                <div className='text-center mx-5'>No image available</div>
              </div>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Books;
