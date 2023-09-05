import React from "react";

import './Movies.css'
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Movies() {
	return(
		<main className="movies">
			<SearchForm />
			<MoviesCardList sampleItems={16} />
		</main>
	);
}

export default Movies;