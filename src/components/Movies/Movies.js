import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';
import { useLocation } from 'react-router-dom';

import './Movies.css';
import moviesApi from '../../utils/MovieApi';

import { filterMovies, filterShortMovies } from '../../utils/utils';

const Movies = ({
  loggedIn,
  onLoading,
  savedMovies,
  onSave,
  isLoading,
  setPopupMessage,
  setIsPopupOpen
}) => {
  const [shortMovies, setShortMovies] = useState(false);
  const [initialMovies, setInitialMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [notFound, setNotFound] = useState(false);
  const [isAllMovies, setIsAllMovies] = useState([]);
  const location = useLocation();

  const handleSetFilteredMovies = (movies, userQuery, shortMoviesCheckbox) => {
    const moviesList = filterMovies(movies, userQuery, false);
    if (moviesList.length === 0) {
      setNotFound(true);
      setPopupMessage('Ничего не найдено.');
      setIsPopupOpen(true);
    } else {
      setNotFound(false);
    }
    setInitialMovies(moviesList);
    setFilteredMovies(
      shortMoviesCheckbox ? filterShortMovies(moviesList) : moviesList
    );
    localStorage.setItem('movies', JSON.stringify(moviesList));
  }

  const handleSearchSubmit = (inputValue) => {
    if (inputValue.trim().length === 0) {
      setPopupMessage('Нужно ввести ключевое слово');
      setIsPopupOpen(true);
      return;
    }
    localStorage.setItem('movieSearch', inputValue);
    localStorage.setItem('shortMovies', shortMovies);

    if (isAllMovies.length === 0) {
      onLoading(true);
      moviesApi
        .getMovies()
        .then(movies => {
          localStorage.setItem('allMovies', JSON.stringify(movies));
          setIsAllMovies(movies);
          handleSetFilteredMovies(
            movies,
            inputValue,
            shortMovies
          );
        })
        .catch((error) => {
          setPopupMessage(error);
          setIsPopupOpen(true);
        })
        .finally(() => onLoading(false));
    } else {
      handleSetFilteredMovies(isAllMovies, inputValue, shortMovies);
    }
  }

  const handleShortFilms = () => {
    setShortMovies(!shortMovies);
    if (!shortMovies) {
      setFilteredMovies(filterShortMovies(initialMovies));
      if (filterMovies.length === 0) {
        setNotFound(true);
      }
    } else {
      setFilteredMovies(initialMovies);
    }
    localStorage.setItem('shortMovies', !shortMovies);
  }

  useEffect(() => {
    if (localStorage.getItem('shortMovies') === 'true') {
      setShortMovies(true);
    } else {
      setShortMovies(false);
    }
  }, [location])

  useEffect(() => {
    if (localStorage.getItem('movies')) {
      const movies = JSON.parse(
        localStorage.getItem('movies')
      );
      setInitialMovies(movies);
      if (
        localStorage.getItem('shortMovies') === 'true'
      ) {
        setFilteredMovies(filterShortMovies(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, [location])

  return (
    <section className='movies__page'>
      <Header loggedIn={loggedIn} />
      <div className='movies__content'>
        <SearchForm
          onSearchMovies={handleSearchSubmit}
          onFilter={handleShortFilms}
          shortMovies={shortMovies}
        />
        {isLoading && (
          <Preloader />
        )}
        {!isLoading && <MoviesCardList
          isSavedMoviesPage={false}
          movies={filteredMovies}
          savedMovies={savedMovies}
          onSave={onSave}
        />}
      </div>
      <Footer />
    </section>
  )
};

export default Movies;