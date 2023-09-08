import React from 'react'; // ?????????
import { useState } from "react";
import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";
import * as api from "../../utils/MainApi";
import { CurrentUserContext, UserMoviesContext } from '../../context/context';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [userMovies, setUserMovies] = useState([]);

  const validFooterPaths = ["/", "/movies", "/saved-movies"];
  const validHeaderPaths = validFooterPaths + "/profile";
  const showHeader = validHeaderPaths.includes(location.pathname);
  const showFooter = validFooterPaths.includes(location.pathname);
  
  const movies = loggedIn ? (
    <Movies 
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage}
    />
  ) : (
    <Main />
  );

  const savedMovies = loggedIn ? <SavedMovies /> : <Main />;
  const profile = loggedIn ? <Profile onLogOut={handleLogOut} /> : null

  useEffect(()=> {
    document.documentElement.setAttribute('lang','ru')
  },[])

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api
        .checkToken()
        .then(() => {
          setLoggedIn(true);
          navigate("/");
        })
        .catch((err) => console.log(`Ошибка ${err}`));
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserData()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => console.log(`Ошибка ${err}`));
    }
  }, [loggedIn]);

  function handleRegister({ name, email, password }) {
    api
      .register({ name, email, password })
      .then(() => {
        navigate("/sign-in");
      })
      .catch((err) => console.log(`Ошибка ${err}`));
  }

  function handleLogin({ email, password }) {
    api
      .login({ email, password })
      .then((data) => {
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
        navigate("/movies");
      })
      .catch((err) => console.log(`Ошибка ${err}`));
  }

  function handleLogOut() {
    setLoggedIn(false);
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className="app">
      <UserMoviesContext.Provider value={{ userMovies, setUserMovies }}>
        <CurrentUserContext.Provider value={currentUser}>
          {showHeader && <Header loggedIn={loggedIn} />}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route 
              path="/sign-up" 
              element={<Register onRegister={handleRegister} />} 
            />
            <Route 
              path="/sign-in" 
              element={<Login handleLogin={handleLogin} />}
            />
            <Route path="/profile" element={profile} />
            <Route path="/movies" element={movies} />
            <Route path="/saved-movies" element={savedMovies} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {showFooter && <Footer />}
        </CurrentUserContext.Provider>
      </UserMoviesContext.Provider>
    </div>
  );
}

export default App;
