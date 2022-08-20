import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Signin from './components/Signin/Signin';
import ForgottenPassword from './components/ForgottenPassword/ForgottenPassword';
import PasswordReset from './components/PasswordReset/PasswordReset';
import Movies from './components/Movies/Movies';
import Movie from './components/Movie/Movie';
import Profile from './components/Profile/Profile';
import NotFound from './components/NotFound/NotFound';
import axios from 'axios'

// axios.defaults.baseURL = "http://localhost:5000/hypertube/api/";
// axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Signin/>} />
        <Route path='/forgotten-password' element={<ForgottenPassword/>} />
        <Route path='/password-reset/:userid/:token' element={<PasswordReset/>} />
        <Route path='/movies' element={<Movies/>} />
        <Route path='/movies/:movieId' element={<Movie/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/not-found' element={<NotFound/>} />
        <Route path='*' element={<Navigate replace to='/not-found'/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;