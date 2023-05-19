import { useEffect, useState } from 'react';
import { useBookContext } from '../hooks/useBookContext';
import UserCard from '../components/UserCard';

const Users = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const { books } = useBookContext();

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      const response = await fetch('mybooklist-api.fly.dev/api/auth/users', {
        method: 'GET',
        credentials: 'include',
      });

      const json = await response.json();

      if (!response.ok) {
        setLoading(false);
      }

      if (response.ok) {
        setUsers(json);
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return (
    <main className='max-w-6xl mx-auto my-10 w-full'>
      <section className='px-3 md:px-10 flex flex-col'>
        {loading ? (
          <span className='loader self-center mt-5'></span>
        ) : (
          <div>
            <h1 className='text-5xl font-bold mb-5 text-red-600'>Users</h1>
            <ul className='grid grid-cols-1 my-5 gap-5 md:grid-cols-3 md:space-y-0 '>
              {books &&
                users.map((user) => (
                  <UserCard
                    key={user._id}
                    user={user}
                    books={books.filter((book) => book.user._id === user._id)}
                  />
                ))}
            </ul>
          </div>
        )}
      </section>
    </main>
  );
};

export default Users;
