import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import Error from '../components/Error';

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
        className='bg-blue-100 flex flex-col text-neutral-800 p-6 rounded-md w-72 sm:w-96 border border-blue-950'
        onSubmit={handleSubmit}
      >
        <h1 className='text-4xl text-blue-900 font-bold mb-6'>Sign Up</h1>
        <label className='mb-1'>Email</label>
        <input
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className='mb-6 rounded-md text-black p-2 border border-blue-950'
        />
        <label className='mb-1'>Username</label>
        <input
          type='text'
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          className='mb-6 rounded-md text-black p-2 border border-blue-950'
        />
        <label className='mb-1'>Password</label>
        <input
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className='mb-7 rounded-md text-black p-2 border border-blue-950'
        />
        <button
          disabled={isLoading}
          className='w-full bg-blue-900 hover:bg-blue-800 rounded-md p-2 text-white font-bold mb-6'
        >
          Sign Up
        </button>
        {error && <Error errorMsg={error} />}
      </form>
    </main>
  );
};

export default Signup;
