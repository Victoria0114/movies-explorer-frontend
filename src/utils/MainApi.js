// описание запросов к нашему Api.

import { moviesServer } from "./constants";


const BASE_URL = "https://api.victoria.nomoreparties.co";

const jsonHeaders = {
	'Content-Type': 'application/json',
	'Accept': 'application/json'
}

const checkResponse = (res) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = ({ name, email, password }) => {
	return fetch(`${BASE_URL}/signup`, {
		method: 'POST',
		headers: jsonHeaders,
		body: JSON.stringify({ name, email, password })
	})
	.then(checkResponse)
};

export const login = ({ email, password }) => {
	return fetch(`${BASE_URL}/signin`, {
		method: 'POST',
		headers: jsonHeaders,
		body: JSON.stringify({ email, password })
	})
	.then(checkResponse)
};

export function checkToken() {
	return fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		headers: {
			...jsonHeaders,
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	})
	.then((res) => res.json())
	.then(data => data)
}

export function getUserData() {
	return fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		headers: {
			...jsonHeaders,
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	})
	.then(checkResponse)
}

export function getSavedMovies() {
	return fetch(`${BASE_URL}/movies`, {
		method: 'GET',
		headers: {
			...jsonHeaders,
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}
	})
	.then(checkResponse)
}

export const saveUserMovie = (movie) => {
	return fetch(`${BASE_URL}/movies`, {
		method: 'POST',
		headers: {
			...jsonHeaders,
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		},
		body: JSON.stringify({
			country: movie.country,
			director: movie.director,
			duration: movie.duration,
			year: movie.year,
			description: movie.description,
			image: {url: `${moviesServer}${movie.image.url}`}, // moviesServer + movie.image.url,
			trailerLink: movie.trailerLink,
			thumbnail: `${moviesServer}${movie.image.url}`,
			movieId: movie.id,
			nameRU: movie.nameRU,
			nameEN: movie.nameEN,
		})
	})
	.then(checkResponse)
  .then(savedMovie => movie._id = savedMovie._id);
};

export const removeUserMovie = (movieId) => {
	return fetch(`${BASE_URL}/movies/${movieId}`, {
		method: 'DELETE',
		headers: {
			...jsonHeaders,
			"Authorization": `Bearer ${localStorage.getItem('token')}`
		}	
	})
	.then(checkResponse)
}