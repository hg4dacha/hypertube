import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Signin from './components/Signin/Signin';
import ForgottenPassword from './components/ForgottenPassword/ForgottenPassword';
import PasswordReset from './components/PasswordReset/PasswordReset';
import Movies from './components/Movies/Movies';
import Movie from './components/Movie/Movie';
import Users from './components/Users/Users';
import Profile from './components/Profile/Profile';
import NotFound from './components/NotFound/NotFound';
import axios from 'axios'
import { Provider } from 'react-redux';
import { store } from './redux';

axios.defaults.baseURL = "http://localhost:5000/";
// axios.defaults.withCredentials = true;
// axios.defaults.headers.common['x-access-token'] = `Bearer ${value.user.AUTH_TOKEN}`;

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Signin/>} />
          <Route path='/forgotten-password' element={<ForgottenPassword/>} />
          <Route path='/password-reset/:userid/:token' element={<PasswordReset/>} />
          <Route path='/movies' element={<Movies/>} />
          <Route path='/movies/:movieId' element={<Movie/>} />
          <Route path='/users' element={<Users/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/not-found' element={<NotFound/>} />
          <Route path='*' element={<Navigate replace to='/not-found'/>} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;