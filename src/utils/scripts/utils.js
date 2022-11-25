import validator from 'validator';
import { BASE_URL, STRING_VALIDATION_ERROR_TEXT, NUMBER_OF_ROWS } from './constants';

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(new Error(response.status));
}

function getlocalStorageItems() {
  const localStorageItems = {
    searchQuery: localStorage.getItem('query'),
    beatfilmMovies: JSON.parse(localStorage.getItem('moviesFromBeatfilm')),
    isShortsMovies: JSON.parse(localStorage.getItem('isShortsMovies')),
  };
  return localStorageItems;
}

function bringMoviesToSingleView(movies) {
  return movies.map(
    ({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      id,
    }) => ({
      country,
      director,
      duration,
      year,
      description,
      image: `${BASE_URL.BEATFILM_MOVIES}${image.url}`,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail: `${BASE_URL.BEATFILM_MOVIES}${image.formats.thumbnail.url}`,
      movieId: id,
    }),
  );
}

function validateString(string) {
  if (typeof string === 'string' || string instanceof String) return string;
  return STRING_VALIDATION_ERROR_TEXT;
}

function validateNumber(number) {
  if (typeof number === 'number' || number instanceof Number) return number;
  return NaN;
}

function validateURL(url) {
  if (validator.isURL(validateString(url))) return url;
  return 'https://www.google.com/';
}

function validateMovies(movies) {
  return movies.map(
    ({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    }) => ({
      country: validateString(country),
      director: validateString(director),
      duration: validateNumber(duration),
      year: validateString(year),
      description: validateString(description),
      image: validateURL(image),
      trailerLink: validateURL(trailerLink),
      nameRU: validateString(nameRU),
      nameEN: validateString(nameEN),
      thumbnail: validateURL(thumbnail),
      movieId: validateNumber(movieId),
    }),
  );
}

function getRows(columns) {
  let rows = 0;

  if (columns === 1) {
    rows = NUMBER_OF_ROWS.INITIAL_ROWS_FOR_ONE_COLUMN;
  } else {
    rows = NUMBER_OF_ROWS.INITIAL_ROWS_FOR_TWO_AND_MORE_COLUMNS;
  }

  return rows;
}

function getAddedMovies(columns) {
  let addedMovies = NUMBER_OF_ROWS.INITIAL_ADDED_ROWS;

  if (columns === 1) {
    addedMovies = NUMBER_OF_ROWS.ADDED_ROWS_FOR_ONE_COLUMN * columns;
  } else {
    addedMovies = NUMBER_OF_ROWS.ADDED_ROWS_FOR_TWO_AND_MORE_COLUMNS * columns;
  }

  return addedMovies;
}

function getHoursAndMinutes(duration) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return { hours, minutes };
}

function filterMovies(moviesList, searchQuery, limitation, isSavedMovies) {
  const filtredMovies = moviesList.filter(({ nameRU, nameEN, duration }) => [nameRU, nameEN].some(
    (name) => name.toLowerCase().includes(searchQuery.toLowerCase())
        && (searchQuery || (!searchQuery && isSavedMovies))
        && duration < limitation,
  ));

  return filtredMovies;
}

function sortMoviesInOrder(movies) {
  return movies.sort((prev, next) => prev.movieId - next.movieId);
}

export {
  handleResponse,
  getlocalStorageItems,
  bringMoviesToSingleView,
  validateMovies,
  getRows,
  getAddedMovies,
  getHoursAndMinutes,
  filterMovies,
  sortMoviesInOrder,
};
