// описание запросов к нашему Api.

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