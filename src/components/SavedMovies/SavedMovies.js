import React from "react";

import '../Movies/Movies.css'

import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

function SavedMovies() {
	return(
		<section className="movies">
			<SearchForm />
			<MoviesCardList sampleItems={4}/>
		</section>
	);
}

export default SavedMovies;