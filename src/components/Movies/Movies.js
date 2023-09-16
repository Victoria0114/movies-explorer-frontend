import React, { useEffect, useState } from "react";
import './Movies.css'
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

function Movies({ isRequestError, isLoading, moviesList, getMovies, getSavedMovies }) {
	const [filteredMovies, setFilteredMovies] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [isToggled, setIsToggled] = useState(false);
	const [displayCards, setDisplayCards] = useState(16);
	const [isMoviesNotFound, setIsMoviesNotFound] = useState(false);
  
	const cardsToShow = filteredMovies.slice(0, displayCards);
  
	const localStorageMovies = JSON.parse(localStorage.getItem("moviesList"));
	const localStorageShortMovies = JSON.parse(localStorage.getItem("shortMovies"));
	const localStorageQuery = localStorage.getItem("query");
	const formattedQuery = localStorageQuery ? localStorageQuery.slice(1, -1) : ''  ;
	const localStorageIsToggled = localStorage.getItem("isToggled");

	useEffect(() => {
		if (moviesList.length === 0) {
		  getMovies();
		}
	}, []);

	useEffect(() => {
		getSavedMovies();
	}, []);
	
	useEffect(() => {
		setToggleState();
		handleLocalStorageData();
	}, [localStorageIsToggled]);
	
	useEffect(() => {
		updateDisplayCards();
		window.addEventListener("resize", () => {
		  updateDisplayCards();
		});
	
		return () => {
		  window.removeEventListener("resize", updateDisplayCards);
		};
	}, [filteredMovies]);
	  
	function setToggleState() {
		if (localStorageIsToggled) {
		  setIsToggled(true);
		} else {
		  setIsToggled(false);
		}
	}
	
	function handleLocalStorageData() {
		if (localStorageMovies === null) {
		  return;
		}
	
		localStorageShortMovies 
		? setFilteredMovies(localStorageShortMovies)
		: setFilteredMovies(localStorageMovies);
	
		setSearchQuery(formattedQuery);
	}
	
	function updateDisplayCards() {
		const screenWidth = window.innerWidth;
	
		if (screenWidth >= 1280) {
		  setDisplayCards(16);
		} else if (screenWidth >= 768) {
		  setDisplayCards(8);
		} else {
		  setDisplayCards(5);
		}
	}
	
	function handleSearchSubmit() {
		const filtered = moviesList.filter((movie) => {
		  const movieName = movie.nameRU || movie.nameEN;
	
		  return movieName.toLowerCase().includes(searchQuery.toLowerCase());
		});
	
		if (filtered.length === 0) {
		  setIsMoviesNotFound(true)
		}
		
		setFilteredMovies(filtered);

		localStorage.setItem("moviesList", JSON.stringify(filtered));
	  }
	
	function filterShortMovies() {
		return filteredMovies.filter((movie) => movie.duration < 40);
	}
	  
	function handleToggleSwitch() {
		if (isToggled === false) {
		  const shortMoviesList = filterShortMovies();
		  setIsToggled(true);
		  localStorage.setItem('isToggled', true);
		  localStorage.setItem('shortMovies', JSON.stringify(shortMoviesList));
		} else {
		  setIsToggled(false);
		  setFilteredMovies(localStorageMovies);
		  localStorage.removeItem('isToggled');
		  localStorage.removeItem("shortMovies");
		}
	}
	
	const handleSearchChange = (evt) => {
		const value = evt.target.value;
		setSearchQuery(value);
		localStorage.setItem("query", JSON.stringify(value));
	};
	
	const handleAddMoreCards = () => {
		setDisplayCards(
		  window.innerWidth > 768 ? displayCards + 4 : displayCards + 2
		);
	};

	return(
		<main className="movies">
			<SearchForm 
			  defaultValue={formattedQuery}
			  searchQuery={searchQuery}
			  handleSearchChange={handleSearchChange}
			  onSearchClick={handleSearchSubmit}
			  onToggle={handleToggleSwitch}
			  isToggled={isToggled}
			  setFilteredMovies={setFilteredMovies}
			/>
			<MoviesCardList
			  //sampleItems={16}
			  isLoading={isLoading}
			  cards={cardsToShow}
			  onAddMore={handleAddMoreCards}
			  arrayList={filteredMovies}
			  isRequestError={isRequestError}
			  isMoviesNotFound={isMoviesNotFound}
			/>
		</main>
	);
}

export default Movies;