import cover from '../images/cover.png';
import { Link } from 'react-router-dom';

const Book = ({ book }) => {
  return (
    <li className='w-full overflow-hidden rounded-md bg-blue-900 lg:h-80 border border-blue-900 hover:border-blue-800 hover:border-2'>
      <Link to={`/books/${book.id}`}>
        <img
          className='h-full w-full object-cover object-center'
          src={
            !book.volumeInfo.imageLinks
              ? cover
              : book.volumeInfo.imageLinks.thumbnail
          }
          alt={book.volumeInfo.title}
        />
      </Link>
    </li>
  );
};

export default Book;
