import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { set } from 'firebase/database';
import { ToastContainer } from 'react-toastify';
import Profile from './components/Profile';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundBrokenUrlPage from './components/NotFoundBrokenUrlPage';
import HomePage from './components/HomePage';
import CheckConnection from './components/NetworkConnectionLost';

function App() {
  const [theme, setTheme] = useState(JSON.parse(window.localStorage.getItem('theme')) || 'dark');
  const storedUserdata = JSON.parse(window.localStorage.getItem('userdata'));
  const [isLoggedIn, setIsLoggedIn] = useState(
    storedUserdata?.isLoggedIn || false
  );
  const [token, setToken] = useState(storedUserdata?.token || "");

  let userdata = {
    isLoggedIn: isLoggedIn,
    token: token
  };

  let setUserdata ={ 
    setIsLoggedIn: setIsLoggedIn,
    setToken: setToken
  };

  let themeTools = {
    theme: theme,
    setTheme: setTheme
  }; 

  useEffect(() => {
    window.localStorage.setItem('userdata', JSON.stringify(userdata));
  }, [isLoggedIn, token]);

  useEffect(()=>{
    window.localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme])

  return (
    <CheckConnection>
      <Router>
      <Navbar userdata = {userdata}/>
      <ToastContainer 
        position= "bottom-right"
        pauseOnHover = {false}
        pauseOnFocusLoss = {false}
        autoClose = {1000}
        theme = {theme}
      />
      <Routes>
        {/* <Route path = "/" element ={<Navbar />} /> */}
        <Route path = "/signup" element ={<SignUp />} />
        <Route path = "/signin" element ={<SignIn  setUserdata = {setUserdata}/>} />
        <Route path = '/profile/:username' element = {<Profile userdata = {userdata} themeTools = {themeTools} setUserdata = {setUserdata}/>} />
        <Route path = "*" element = {<NotFoundBrokenUrlPage />} />
        <Route path='/' element = {<HomePage />} />
      </Routes>
    </Router>
    </CheckConnection>
  )
}

export default App;