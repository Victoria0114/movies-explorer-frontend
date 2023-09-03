import React, { useState } from "react";

import "./MoviesCard.css";
import testMovieImg from '../../../images/avarus project.jpeg'
import { useLocation } from "react-router-dom";
import { timeConverter } from "../../../utils/timeConverter";

function MoviesCard() {
	const [isLiked, setLike] = useState(false);
	const urlPath = useLocation();

	const handleLikeClick = () => setLike(true);
	
	const cardLikeButtonClassName = (`movie-card__btn movie-card__like ${isLiked && 'movie-card__like_active'}`); 

	const button = urlPath.pathname === '/movies' ? 
		(<button class={cardLikeButtonClassName} type="submit" onClick={handleLikeClick}/>) :
		(<button className="movie-card__btn movie-card__like_rm" type="submit">&#x2717;</button>)

  return (
    <div className="movie-card">
      <img src={testMovieImg} alt="" class="movie-card__image" />
      <div class="movie-card__header">
			<div className="movie-card__header-wrapper">
				<h2 class="movie-card__title">Интерстеллар</h2>
				{button}
			</div>
			<span className="movie-card__duration">{timeConverter(169)}</span>
      </div>
    </div>
  );
}

export default MoviesCard;