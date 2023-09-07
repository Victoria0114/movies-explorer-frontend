import React, { useEffect, useContext, useState } from "react";

import '../Movies/Movies.css'

import * as api from "../../utils/MainApi";

import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import { UserMoviesContext } from "../../context/context";

function SavedMovies() {
	const { userMovies, setUserMovies } = useContext(UserMoviesContext);
	const [query, setQuery] = useState('');
	
	useEffect(() => {
		api
		  .getSavedMovies()
		  .then((data) => {
			setUserMovies(data);
		  })
		  .catch((err) => alert(`Ошибка ${err}`));
	}, []);

	function handleSearchUserMovies() {
		const seached = userMovies.filter((movie) => {
			return movie.nameRU.toLowerCase().includes(query.toLowerCase())
		})
		setUserMovies(seached)
	}

	const handleSearchChange = (evt) => {
		const value = evt.target.value;
		setQuery(value);
	}

	return(
		<section className="movies">
			<SearchForm 
			  onSearchClick={handleSearchUserMovies}
			  handleSearchChange={handleSearchChange}
			  searchQuery={query}
			/>
			<MoviesCardList
			  arrayMoviesList={userMovies}
			  cards={userMovies}
			  userMovies={userMovies}
			/>
		</section>
	);
}

export default SavedMovies;