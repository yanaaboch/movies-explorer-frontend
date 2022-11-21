const BASE_API_URL = 'https://api.movies.yanaaboch.nomoredomains.club';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = ({ name, email, password }) => {
  return fetch(`${BASE_API_URL}/signup`, {
    method: 'POST',
    //credentials: 'include',
    headers,
    body: JSON.stringify({ 
      name,
      email,
      password
    }),
  }).then((res) => checkResponse(res));
};

export const authorize = ({ email, password }) => {
  return fetch(`${BASE_API_URL}/signin`, {
    method: 'POST',
    //credentials: 'include',
    headers,
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
};

export const getContent = (jwt) => {
  return fetch(`${BASE_API_URL}/users/me`, {
    method: 'GET',
    //credentials: 'include',
    headers: {
        ...headers,
        'Authorization': `Bearer ${jwt}`,
    }
  }).then((res) => checkResponse(res));
};

export const updateUserInfo = (data, jwt) => {
  return fetch(`${BASE_API_URL}/users/me`, {
    method: 'PATCH',
    headers: {
        ...headers,
        'Authorization': `Bearer ${jwt}`,
    },
    //credentials: 'include',
    body: JSON.stringify({
      name: data.name, 
      email: data.email,
    }),
  }).then((res) => checkResponse(res));
};

export const getSavedMovies = (jwt) => {
  return fetch(`${BASE_API_URL}/movies`, {
    method: 'GET',
    headers: {
        ...headers,
        'Authorization': `Bearer ${jwt}`,
    }
    //credentials: 'include',
  }).then((res) => checkResponse(res));
};

export const saveMovie = (movie, jwt) => {
  return fetch(`${BASE_API_URL}/movies`, {
    method: 'POST',
    headers: {
        ...headers,
        'Authorization': `Bearer ${jwt}`,
    },
    //credentials: 'include',
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: 'https://api.nomoreparties.co/' + movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail: 'https://api.nomoreparties.co/' + movie.image.formats.thumbnail.url,
      movieId: movie.id,
      nameRU: movie.nameRU || movie.nameEN,
      nameEN: movie.nameEN || movie.nameRU,
    }),
  }).then((res) => checkResponse(res));
};

export const deleteMovie = (id, jwt) => {
  return fetch(`${BASE_API_URL}/movies/${id}`, {
    method: 'DELETE',
    headers: {
        ...headers,
        'Authorization': `Bearer ${jwt}`,
    }
    //credentials: 'include',
  }).then((res) => checkResponse(res));
};

export const logOut = () => {
    return fetch(`${BASE_API_URL}/signout`, {
      method: 'POST',
      headers,
      //credentials: 'include',
    }).then((res) => {
        return checkResponse(res);
      });
  }