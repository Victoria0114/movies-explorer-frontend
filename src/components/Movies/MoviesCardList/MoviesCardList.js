import React from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import Preloader from "../../Preloader/Preloader";

function MoviesCardList({
  arrayList,
  isLoading,
  isRequestError,
  onAddMore,
  cards,
  isMoviesNotFound,
}) {
  const location = useLocation();
  const moviesPageLocation = location.pathname === "/movies";
  const notFoundMessage = "Ничего не найдено";
  const requestErrorMessage = `Во время запроса произошла ошибка. Возможно, 
    проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз`;
    
  const handleMoviesNotFound = isMoviesNotFound ? notFoundMessage : '';

  return isLoading ? (
    <Preloader />
    ) : (
    <>
      <section className="movies-card-list">
        {cards.length > 0 ? (
          cards.map((movie) => {
            return <MoviesCard key={movie.nameRU} movie={movie} />;
          })
        ) : (
          <p className="movies-card-list__message">
            {isRequestError ? requestErrorMessage : handleMoviesNotFound}
          </p>
        )
        }
      </section>
      {moviesPageLocation && arrayList.length > cards.length && (
        <button onClick={onAddMore} className="button-more">
          Еще
        </button>
      )}
      {/* <button className="button-more">Еще</button> */}
    </>
  );
}

export default MoviesCardList;

//{Array.from({ length: sampleItems }, (_, index) => (
// <MoviesCard key={index} />
// ))}