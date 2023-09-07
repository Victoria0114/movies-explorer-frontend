import React from "react";

import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({sampleItems}) {
  return (
    <>
      <section className="movies-card-list">
        {Array.from({ length: sampleItems }, (_, index) => (
          <MoviesCard key={index} />
        ))}
      </section>
      <button className="button-more">Еще</button>
    </>
  );
}

export default MoviesCardList;