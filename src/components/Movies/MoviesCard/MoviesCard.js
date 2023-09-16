import React, { useState, useEffect, useMemo, useContext } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import * as Api from '../../../utils/MainApi'
import { moviesServer } from '../../../utils/constants'
// import testMovieImg from '../../../images/avarus project.jpeg'
// import { timeConverter } from "../../../utils/timeConverter";
import { UserMoviesContext } from "../../../context/context";


function MoviesCard({ movie }) {
	const location = useLocation();
	const { userMovies, setUserMovies } = useContext(UserMoviesContext);
	const { nameRU, duration, image, trailerLink } = movie;
	const modifiedDuration = useMemo(() => timeConverter(duration), [duration]);
	const [isLiked, setIsLiked] = useState(false);
	const isMoviesPath = location.pathname === "/movies";
	const picture = isMoviesPath ? `${moviesServer}${image.url}` : image.url;
	const buttonText = isMoviesPath ? null : "✗";
	const baseButtonClassName = "card__btn";
	const likeButtonClassName = `card__like ${isLiked && "card__like_active"}`;
	const removeButtonClassName = "card__like_rm";
	const buttonClassName = ` ${baseButtonClassName} ${
		isMoviesPath ? likeButtonClassName : removeButtonClassName
	}`;

	useEffect(() => {
		setIsLiked(
		  userMovies.some((userMovie) => userMovie.nameRU === movie.nameRU)
		);
	}, [userMovies, movie.nameRU]);
	
	function timeConverter(mins) {
		const hours = Math.floor(mins / 60); 
		const minutes = mins % 60;
		return `${hours ? `${hours}ч` : ""} ${minutes}м`;
	}

	function toggleLike() {
		//** ищем фильм в userMovies */
		const savedMovie = userMovies.find((userMovie) => userMovie.nameRU === movie.nameRU);
		if (!savedMovie) {
		  handleSaveMovie();
		} else {
		  handleRemoveMovie(savedMovie);
		}
	}
	  
	function handleSaveMovie() {
		Api
		  .saveUserMovie(movie)
		  .then(() => {
			setIsLiked(true);
			setUserMovies([...userMovies, movie]);
		  })
		  .catch((err) => console.error(`Произошла ошибка ${err.message}`));
	  }
	  
	  function handleRemoveMovie(movieToRemove) {
		Api
		  .removeUserMovie(movieToRemove._id)
		  .then(() => {
			setIsLiked(false);
			setUserMovies(userMovies.filter((userMovie) => userMovie._id !== movieToRemove._id));
		  })
		  .catch((err) => console.error(`Произошла ошибка ${err.message}`));
	  }
	  
  return (
    <div className="movie-card">
      <a href={trailerLink}>
	    <img src={picture} alt={nameRU} class="movie-card__image" />
	  </a>
      <div class="movie-card__header">
			<div className="movie-card__header-wrapper">
				<h2 class="movie-card__title">{nameRU}</h2>
				<button 
				className={buttonClassName} 
				type="submit" 
				onClick={toggleLike}
				>
                   {buttonText}
                </button>
			</div>
			<span className="movie-card__duration">{modifiedDuration}</span>
      </div>
    </div>
  );
}

export default MoviesCard;