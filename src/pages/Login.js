import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import Error from '../components/Error';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <main className='mx-auto my-12 lg:my-auto'>
      <form
        className='bg-neutral-800 flex flex-col text-gray-200 p-6 rounded-md w-72 sm:w-96'
        onSubmit={handleSubmit}
      >
        <h1 className='text-4xl text-white font-bold mb-6'>Login</h1>
        <label className='mb-1'>Email</label>
        <input
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
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
          Login
        </button>
        {error && <Error errorMsg={error} />}
      </form>
    </main>
  );
};

export default Login;
