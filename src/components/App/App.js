import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

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

function App() {
  const location = useLocation();
  const [loggedIn, setLogin] = useState(true);

  const validFooterPaths = ["/", "/movies", "/saved-movies"];
  const validHeaderPaths = validFooterPaths + "/profile";
  const showHeader = validHeaderPaths.includes(location.pathname);
  const showFooter = validFooterPaths.includes(location.pathname);
  
  const movies = loggedIn ? <Movies /> : <Main /> ;
  const savedMovies = loggedIn ? <SavedMovies /> : <Main />;
  const profile = loggedIn ? <Profile /> : <NotFound />

  return (
    <div className="app">
      {showHeader && <Header loggedIn={loggedIn} />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/profile" element={profile} />
        <Route path="/movies" element={movies} />
        <Route path="/saved-movies" element={savedMovies} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showFooter && <Footer />}
    </div>
  );
}

export default App;
