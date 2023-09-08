import React, { useEffect, useState } from "react";

import './Movies.css'
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import * as moviesApi from "../../utils/MoviesApi";
import * as api from "../../utils/MainApi";


function Movies() {
	return(
		<main className="movies">
			<SearchForm />
			<MoviesCardList sampleItems={16} />
		</main>
	);
}

export default Movies;