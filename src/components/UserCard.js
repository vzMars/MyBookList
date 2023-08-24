import userImg from '../images/user.png';

const UserCard = ({ user, books }) => {
  return (
    <li className='bg-blue-900 rounded-md flex space-x-2 overflow-hidden'>
      <img src={userImg} alt={user.username} className='h-20' />
      <div className='flex flex-col justify-around'>
        <a href={`/user/${user.username}`}>
          <h2 className='text-white font-bold text-xl'>{user.username}</h2>
        </a>
        <span className='text-white font-semibold'>{`${books.length} ${
          books.length !== 1 ? 'Books' : 'Book'
        }`}</span>
      </div>
    </li>
  );
};

export default UserCard;
