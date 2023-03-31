import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookContext } from '../hooks/useBookContext';
import { useAuthContext } from '../hooks/useAuthContext';
import cover from '../images/cover.png';

const Profile = () => {
  const { userName } = useParams();
  const navigate = useNavigate();
  const [profileName, setProfileName] = useState(null);
  const [profileBooks, setProfileBooks] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const { books, dispatch } = useBookContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const getDetails = async () => {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/books/user/${userName}`,
        {
          method: 'GET',
          credentials: 'include',
        }
      );

      const json = await response.json();

      if (!response.ok) {
        setLoading(false);
        navigate('/404');
      }

      if (response.ok) {
        setProfileName(json);
        setProfileBooks(
          books.filter((book) => book.user.userName === profileName)
        );
        setLoading(false);
      }
    };

    getDetails();
  }, [books, userName, profileName, navigate]);

  const switchTabs = (e) => {
    if (activeTab === e.target.value) return;

    if (e.target.value === 'all') {
      setProfileBooks(
        books.filter((book) => book.user.userName === profileName)
      );
    } else {
      setProfileBooks(
        books.filter(
          (book) =>
            book.user.userName === profileName && book.status === e.target.value
        )
      );
    }
    setActiveTab(e.target.value);
  };

  const deleteBook = (id) => {
    console.log('delete btn clicked', id);
  };

  const updateStatus = async (e) => {
    console.log('update btn clicked', e.target.value);
  };

  return (
    <main className='max-w-6xl mx-auto mt-10 w-full'>
      <section className='px-3 md:px-10 flex flex-col mb-10'>
        {loading ? (
          <span className='loader self-center mt-5'></span>
        ) : (
          <div className='text-white'>
            <h1 className='text-red-600 text-5xl font-bold mb-5 text-center'>
              {`Viewing ${
                profileName === user.userName ? 'Your' : `${profileName}'s`
              } Book List`}
            </h1>
            <nav className='flex justify-between md:justify-evenly'>
              <button
                className={`text-red-600 text-lg font-bold mb-2 md:text-2xl ${
                  activeTab === 'all' ? 'underline' : ''
                }`}
                onClick={switchTabs}
                value='all'
              >
                All
              </button>
              <button
                className={`text-red-600 text-lg font-bold mb-2 md:text-2xl ${
                  activeTab === 'reading' ? 'underline' : ''
                }`}
                onClick={switchTabs}
                value='reading'
              >
                Reading
              </button>
              <button
                className={`text-red-600 text-lg font-bold mb-2 md:text-2xl ${
                  activeTab === 'completed' ? 'underline' : ''
                }`}
                onClick={switchTabs}
                value='completed'
              >
                Completed
              </button>
              <button
                className={`text-red-600 text-lg font-bold mb-2 md:text-2xl ${
                  activeTab === 'planning' ? 'underline' : ''
                }`}
                onClick={switchTabs}
                value='planning'
              >
                Planning
              </button>
            </nav>
            <ul className='flex flex-col my-5 bg-neutral-800 p-2 rounded-md'>
              {profileBooks.map((book) => (
                <li
                  key={book._id}
                  className='flex flex-col p-3 border-b-2 border-neutral-700 last:border-b-0'
                >
                  <div className='flex space-x-2'>
                    <img
                      src={book.cover ? book.cover : cover}
                      alt={book.title}
                      className='h-48 object-cover object-center border border-neutral-500 md:h-60'
                    />
                    <div className='flex-1'>
                      <a href={`/books/${book.bookId}`}>
                        <h2 className='text-red-600 md:text-2xl'>
                          {book.title}
                        </h2>
                      </a>
                      <span>By {book.authors.join(', ')}</span>
                    </div>
                    {user.id === book.user._id && (
                      <span
                        className='material-symbols-outlined text-red-600 cursor-pointer md:text-3xl self-start'
                        onClick={() => deleteBook(book.bookId)}
                      >
                        delete
                      </span>
                    )}
                  </div>
                  <div className='flex space-x-2 text-sm text-black font-bold self-start items-start md:flex-row md:space-y-0 md:space-x-2 md:text-base mt-5'>
                    <button
                      className={`p-1.5 py-2 hover:opacity-90 rounded-md ${
                        book.status === 'reading'
                          ? 'bg-green-600'
                          : 'bg-red-600'
                      }`}
                      value='reading'
                      disabled={
                        book.status === 'reading' || book.user._id !== user.id
                      }
                      onClick={updateStatus}
                    >
                      Reading
                    </button>
                    <button
                      className={`p-1.5 py-2 hover:opacity-90 rounded-md ${
                        book.status === 'completed'
                          ? 'bg-green-600'
                          : 'bg-red-600'
                      }`}
                      value='completed'
                      disabled={
                        book.status === 'completed' || book.user._id !== user.id
                      }
                      onClick={updateStatus}
                    >
                      Completed
                    </button>
                    <button
                      className={`p-1.5 py-2 hover:opacity-90 rounded-md ${
                        book.status === 'planning'
                          ? 'bg-green-600'
                          : 'bg-red-600'
                      }`}
                      value='planning'
                      disabled={
                        book.status === 'planning' || book.user._id !== user.id
                      }
                      onClick={updateStatus}
                    >
                      Planning
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </main>
  );
};

export default Profile;
