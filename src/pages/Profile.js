import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookContext } from '../hooks/useBookContext';
import { useAuthContext } from '../hooks/useAuthContext';

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

  return (
    <main className='max-w-6xl mx-auto mt-10 w-full'>
      <section className='px-3 md:px-10 flex flex-col mb-10'>
        {loading ? (
          <span className='loader self-center mt-5'></span>
        ) : (
          <div className='text-white'>
            <h1 className='text-red-600 text-5xl font-bold mb-5'>
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
            {profileBooks.map((book) => (
              <p key={book._id}>{book.title}</p>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Profile;
