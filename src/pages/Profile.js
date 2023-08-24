import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookContext } from '../hooks/useBookContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { removeBook, updateBookStatus } from '../services/BookService';
import { getUserProfile } from '../services/UserService';
import cover from '../images/cover.png';

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [profileName, setProfileName] = useState(null);
  const [profileBooks, setProfileBooks] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const { books, dispatch } = useBookContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);
      const response = await getUserProfile(username);

      const json = await response.json();

      if (!response.ok) {
        setLoading(false);
        navigate('/404');
      }

      if (response.ok) {
        setProfileName(json.username);
        setProfileBooks(json.books);
        setLoading(false);
      }
    };

    getProfile();
  }, [username, navigate]);

  const switchTabs = (e) => {
    if (activeTab === e.target.value) return;

    if (e.target.value === 'all') {
      setProfileBooks(
        books.filter((book) => book.user.username === profileName)
      );
    } else {
      setProfileBooks(
        books.filter(
          (book) =>
            book.user.username === profileName &&
            book.status.toLowerCase() === e.target.value
        )
      );
    }
    setActiveTab(e.target.value);
  };

  const deleteBook = async (id) => {
    const response = await removeBook(id);

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_BOOK', payload: json.book });
      setProfileBooks(profileBooks.filter((book) => book.googleBooksId !== id));
    }
  };

  const updateStatus = async (e, id) => {
    const updatedStatus = {
      status: e.target.value,
    };

    const response = await updateBookStatus(id, updatedStatus);

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'UPDATE_BOOK', payload: json.book });
      if (activeTab === 'all') {
        setProfileBooks(
          profileBooks.map((book) =>
            book.googleBooksId === id
              ? { ...book, status: e.target.value }
              : book
          )
        );
      } else {
        setProfileBooks(
          profileBooks.filter((book) => book.googleBooksId !== id)
        );
      }
    }
  };

  return (
    <main className='max-w-6xl mx-auto mt-10 w-full'>
      <section className='px-3 md:px-10 flex flex-col mb-10'>
        {loading ? (
          <span className='loader self-center mt-5'></span>
        ) : (
          <div className='text-black'>
            <h1 className='text-blue-900 text-5xl font-bold mb-5 text-center'>
              {`Viewing ${
                profileName === user.username ? 'Your' : `${profileName}'s`
              } Book List`}
            </h1>
            <nav className='flex justify-between md:justify-evenly'>
              <button
                className={`text-blue-900 text-lg font-bold mb-2 md:text-2xl ${
                  activeTab === 'all' ? 'underline' : ''
                }`}
                onClick={switchTabs}
                value='all'
              >
                All
              </button>
              <button
                className={`text-blue-900 text-lg font-bold mb-2 md:text-2xl ${
                  activeTab === 'reading' ? 'underline' : ''
                }`}
                onClick={switchTabs}
                value='reading'
              >
                Reading
              </button>
              <button
                className={`text-blue-900 text-lg font-bold mb-2 md:text-2xl ${
                  activeTab === 'completed' ? 'underline' : ''
                }`}
                onClick={switchTabs}
                value='completed'
              >
                Completed
              </button>
              <button
                className={`text-blue-900 text-lg font-bold mb-2 md:text-2xl ${
                  activeTab === 'planning' ? 'underline' : ''
                }`}
                onClick={switchTabs}
                value='planning'
              >
                Planning
              </button>
            </nav>
            {profileBooks.length > 0 && (
              <ul className='flex flex-col my-5 bg-blue-100 p-2 rounded-md'>
                {profileBooks.map((book) => (
                  <li
                    key={book.id}
                    className='flex flex-col p-3 border-b-2 border-blue-900 last:border-b-0'
                  >
                    <div className='flex space-x-2'>
                      <img
                        src={book.cover ? book.cover : cover}
                        alt={book.title}
                        className='h-48 object-cover object-center border border-blue-900 md:h-60'
                      />
                      <div className='flex-1'>
                        <a href={`/books/${book.googleBooksId}`}>
                          <h2 className='text-blue-900 md:text-2xl'>
                            {book.title}
                          </h2>
                        </a>
                        <span>By {book.authors.join(', ')}</span>
                      </div>
                      {user.id === book.user.id && (
                        <span
                          className='material-symbols-outlined text-blue-900 cursor-pointer md:text-3xl self-start'
                          onClick={() => deleteBook(book.googleBooksId)}
                        >
                          delete
                        </span>
                      )}
                    </div>
                    <div className='flex space-x-2 text-sm text-white font-bold self-start items-start md:flex-row md:space-y-0 md:space-x-2 md:text-base mt-5'>
                      <button
                        className={`p-1.5 py-2 hover:opacity-90 rounded-md ${
                          book.status.toLowerCase() === 'reading'
                            ? 'bg-green-600'
                            : 'bg-blue-900'
                        }`}
                        value='reading'
                        disabled={
                          book.status.toLowerCase() === 'reading' ||
                          book.user.id !== user.id
                        }
                        onClick={(e) => updateStatus(e, book.googleBooksId)}
                      >
                        Reading
                      </button>
                      <button
                        className={`p-1.5 py-2 hover:opacity-90 rounded-md ${
                          book.status.toLowerCase() === 'completed'
                            ? 'bg-green-600'
                            : 'bg-blue-900'
                        }`}
                        value='completed'
                        disabled={
                          book.status.toLowerCase() === 'completed' ||
                          book.user.id !== user.id
                        }
                        onClick={(e) => updateStatus(e, book.googleBooksId)}
                      >
                        Completed
                      </button>
                      <button
                        className={`p-1.5 py-2 hover:opacity-90 rounded-md ${
                          book.status.toLowerCase() === 'planning'
                            ? 'bg-green-600'
                            : 'bg-blue-900'
                        }`}
                        value='planning'
                        disabled={
                          book.status.toLowerCase() === 'planning' ||
                          book.user.id !== user.id
                        }
                        onClick={(e) => updateStatus(e, book.googleBooksId)}
                      >
                        Planning
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default Profile;
