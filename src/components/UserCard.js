import userImg from '../images/user.png';

const UserCard = ({ user, books }) => {
  return (
    <li className='bg-neutral-800 rounded-md flex space-x-2 overflow-hidden'>
      <img src={userImg} alt={user.userName} className='h-20' />
      <div className='flex flex-col justify-around'>
        <a href={`/user/${user.userName}`}>
          <h2 className='text-red-600 font-bold text-xl'>{user.userName}</h2>
        </a>
        <span className='text-white font-semibold'>{`${books.length} ${
          books.length !== 1 ? 'Books' : 'Book'
        }`}</span>
      </div>
    </li>
  );
};

export default UserCard;
