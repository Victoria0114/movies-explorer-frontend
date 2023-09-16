import { useState, useEffect } from "react";
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
import * as Api from "../../utils/MainApi";
import * as MoviesApi from "../../utils/MoviesApi";
import { CurrentUserContext, UserMoviesContext } from '../../context/context';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"; 
import InfoTooltip from "../InfoTooltip/InfoTooltip";


function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [succesMessage, setSuccesMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [userMovies, setUserMovies] = useState([]);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  // const [isProfileChangePopupOpen, setIProfileChangePopupOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  // const [isUserDataChanged, setUserDataChanged] = useState(false);
  const [moviesList, setMoviesList] = useState([]);
  const [isRequestError, setRequestError] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const validFooterPaths = ["/", "/movies", "/saved-movies"];
  const validHeaderPaths = validFooterPaths + "/profile";
  const showHeader = validHeaderPaths.includes(location.pathname);
  const showFooter = validFooterPaths.includes(location.pathname);
  
 
  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getUserData();
    }
  }, [isLoggedIn]); 

  const handleError = (err) => {
    setErrorMessage(err);
    setIsInfoPopupOpen(true);
  }

  function handleTokenCheck() {
    const token = localStorage.getItem("token");

    if (token) {
      Api
        .checkToken()
        .then(() => {
          setLoggedIn(true);
        })
        .catch(handleError);
    }
  }
  
  function getUserData() {
    Api
      .getUserData()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch(handleError);
  }

  function getMovies() {
    MoviesApi
      .getMovies()
      .then((data) => {
        setLoading(false);
        setMoviesList(data);
      })
      .catch(() => {
        setLoading(false);
        setRequestError(true);
        handleError();
    });
  }

  function getSavedMovies() {
    Api
      .getSavedMovies()
      .then((data) => {
        getSavedMovies(data);
      })
      .catch(handleError);
  }

  function handleRegister({ name, email, password }) {
    Api
      .register({ name, email, password })
      .then(() => {
        handleLogin({ email, password });
        setIsRegistered(true);
        openSuccesPopup("Вы успешно зарегистрировались");
      })
      .catch(handleError);
  }

  function handleLogin({ email, password }) {
    Api
      .login({ email, password })
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("isLoggedIn", true);
        navigate("/movies");
        setLoggedIn(true);
      })
      .catch(handleError);
  }

  function handleLogOut() {
    setLoggedIn(false);
    localStorage.clear();
    navigate("/");
  }

  function handleChangeUserData({ name, email }) {
    Api
      .changeUserData({ name, email })
      .then((data) => {
        setCurrentUser(data);
        // setUserDataChanged(true);
        // setIProfileChangePopupOpen(true);
        // setTimeout(() => {
        //   setIProfileChangePopupOpen(false);
        // }, 2000);
      })
      .catch(handleError);
  }

  function openSuccesPopup(message) {
    setSuccesMessage(message);
    setIsInfoPopupOpen(true);
    setTimeout(() => {
      setIsInfoPopupOpen(false);
    }, 3000);
  }

  function handleClosePopup() {
    setIsInfoPopupOpen(false);
    // setIProfileChangePopupOpen(false);
  }

  return (
    <div className="app">
      <UserMoviesContext.Provider value={{ userMovies, setUserMovies }}>
        <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
          {showHeader && <Header loggedIn={isLoggedIn} />}
          <Routes>
            {!isLoggedIn &&
            <>
            <Route 
              path="/signup" 
              element={<Register onRegister={handleRegister} isRegistered={isRegistered}/>} 
            />
            <Route 
              path="/signin" 
              element={<Login handleLogin={handleLogin} />}
            />
            </>
            }
            <Route 
              path="/" 
              element={<Main />} 
            />
            <Route path="/profile" element={Profile} />
            <Route 
              path="/movies" 
              element={
                <ProtectedRoute
                  element={Movies}
                  getMovies={getMovies}
                  getSavedMovies={getSavedMovies}
                  moviesList={moviesList}
                  isLoading={isLoading}
                  isLoggedIn={isLoggedIn}
                  isRequestError={isRequestError}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                />
              } 
            />
            <Route 
              path="/saved-movies" 
              element={
                <ProtectedRoute
                  element={SavedMovies}
                  getSavedMovies={getSavedMovies}
                  isLoggedIn={isLoggedIn}
                />
              } 
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  element={Profile}
                  isLoggedIn={isLoggedIn}
                  onLogOut={handleLogOut}
                  onSave={handleChangeUserData}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {showFooter && <Footer />}
        </CurrentUserContext.Provider>
      </UserMoviesContext.Provider>
      <InfoTooltip
        isOpen={isInfoPopupOpen}
        condition={isRegistered}
        successTitle={succesMessage}
        deniedTitle={errorMessage}
        onClose={handleClosePopup}
      />
    </div>
  );
}

export default App;
