const Book = ({ book }) => {
  return (
    <li className='w-full overflow-hidden rounded-md bg-neutral-800 lg:h-80 border border-neutral-500 hover:border-neutral-200 hover:border-2'>
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
  );
};

export default Book;
