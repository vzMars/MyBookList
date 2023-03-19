import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, userName, password);
  };

  return (
    <main className='mx-auto my-12 lg:my-auto'>
      <form
        className='bg-neutral-800 flex flex-col text-gray-200 p-6 rounded-md w-72 sm:w-96'
        onSubmit={handleSubmit}
      >
        <h1 className='text-4xl text-white font-bold mb-6'>Sign Up</h1>
        <label className='mb-1'>Email</label>
        <input
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className='mb-6 rounded-md text-black p-2'
        />
        <label className='mb-1'>Username</label>
        <input
          type='text'
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          className='mb-6 rounded-md text-black p-2'
        />
        <label className='mb-1'>Password</label>
        <input
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className='mb-7 rounded-md text-black p-2'
        />
        <button
          disabled={isLoading}
          className='w-full bg-red-600 hover:bg-red-700 rounded-md p-2 text-black font-bold mb-6'
        >
          Sign Up
        </button>
        {error && (
          <div className='p-2 bg-rose-100 rounded border-2 text-rose-600 border-rose-600 font-medium'>
            {error}
          </div>
        )}
      </form>
    </main>
  );
};

export default Signup;
