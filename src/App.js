import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// components
import RequireAuth from './components/RequireAuth';
import RequireGuest from './components/RequireGuest';

// pages
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Search from './pages/Search';
import BookList from './pages/BookList';
import BookDetails from './pages/BookDetails';

// layouts
import Layout from './layouts/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />

          <Route element={<RequireGuest />}>
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
          </Route>

          <Route element={<RequireAuth />}>
            <Route path='profile' element={<Profile />} />
            <Route path='search' element={<Search />} />
            <Route path='/books'>
              <Route index element={<BookList />} />
              <Route path=':id' element={<BookDetails />} />
            </Route>
          </Route>
          <Route path='/404' element={<NotFound />} />
          <Route path='*' element={<Navigate to='/404' replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
