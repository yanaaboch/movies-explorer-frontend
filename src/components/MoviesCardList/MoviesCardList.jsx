import {
  React, useState, useEffect, useRef, useContext,
} from 'react';
import PropTypes from 'prop-types';
import CurrentUserContext from '../../contexts/CurrentUserContext';

import useColumns from '../../hooks/useColumns';

import MoviesCard from '../MoviesCard/MoviesCard';
import ErrorElement from '../ErrorElement/ErrorElement';
import Button from '../Button/Button';

import { MOVIES_ERROR_TEXT, TIME_LIMIT_FOR_SHORTS_MOVIES } from '../../utils/scripts/constants';
import {
  getlocalStorageItems,
  getRows,
  getAddedMovies,
  filterMovies,
  sortMoviesInOrder,
} from '../../utils/scripts/utils';

import './MoviesCardList.css';

function MoviesCardList({
  savedMovies,
  displayedData,
  setDisplayedData,
  isSavedMovies,
  onAddSavedMovie,
  onDeleteSavedMovie,
}) {
  const [moviesCount, setMoviesCount] = useState(1);
  const [limitation, setLimitation] = useState(Infinity);
  const [errorText, setErrorText] = useState('');

  const {
    allMovies, searchQuery, isShortsMovies, queryErrorText,
  } = displayedData;

  const { currentUser } = useContext(CurrentUserContext);
  console.log('currentUser ___ MoviesCardList', currentUser);

  const gridContainer = useRef(null);
  const columns = useColumns(gridContainer.current);

  const filtredMovies = filterMovies(allMovies, searchQuery, limitation, isSavedMovies);

  useEffect(() => {
    const localStorageItems = getlocalStorageItems();

    if (!isSavedMovies) {
      setDisplayedData((prevData) => ({
        ...prevData,
        searchQuery: localStorageItems.searchQuery || '',
        allMovies: localStorageItems.beatfilmMovies || [],
        isShortsMovies: localStorageItems.isShortsMovies || false,
      }));
    }
  }, [isSavedMovies, savedMovies, setDisplayedData, gridContainer, filtredMovies.length]);

  useEffect(() => {
    if (isSavedMovies) {
      setDisplayedData((prevData) => ({
        ...prevData,
        searchQuery: '',
        allMovies: sortMoviesInOrder(savedMovies) || [],
        isShortsMovies: false,
      }));
    }
  }, [isSavedMovies, savedMovies, setDisplayedData]);

  useEffect(() => {
    setMoviesCount(columns * getRows(columns));
  }, [columns]);

  useEffect(() => {
    if (queryErrorText) {
      setErrorText(queryErrorText);
      return;
    }

    if (!filtredMovies.length && searchQuery) {
      setErrorText(MOVIES_ERROR_TEXT.NOT_FOUND);
      return;
    }

    setErrorText('');
  }, [queryErrorText, filtredMovies.length, searchQuery]);

  useEffect(() => {
    if (isShortsMovies) {
      setLimitation(TIME_LIMIT_FOR_SHORTS_MOVIES);
    } else {
      setLimitation(Infinity);
    }
  }, [isShortsMovies]);

  return (
    <section
      className={`movies-card-list ${isSavedMovies ? 'movies-card-list_padding-bottom' : ''}`}
    >
      <h2 className="visually-hidden">
        {!isSavedMovies ? 'Список фильмов' : 'Список сохраненных фильмов'}
      </h2>
      {filtredMovies.length ? (
        <ul className="movies-card-list__movies" ref={gridContainer}>
          {filtredMovies.map(
            (
              {
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
              },
              index,
            ) => index < moviesCount && (
            <MoviesCard
              key={movieId}
              country={country}
              director={director}
              duration={duration}
              year={year}
              description={description}
              image={image}
              trailerLink={trailerLink}
              nameRU={nameRU}
              nameEN={nameEN}
              thumbnail={thumbnail}
              movieId={movieId}
              savedMovies={savedMovies}
              isSavedMovies={isSavedMovies}
              onAddSavedMovie={onAddSavedMovie}
              onDeleteSavedMovie={onDeleteSavedMovie}
            />
            ),
          )}
        </ul>
      ) : (
        <ErrorElement className="movies-card-list__error" text={errorText} />
      )}
      {!isSavedMovies && filtredMovies.length > moviesCount && (
        <Button
          className="movies-card-list__more"
          onClick={() => {
            setMoviesCount((prevState) => prevState + getAddedMovies(columns));
          }}
        >
          Ещё
        </Button>
      )}
    </section>
  );
}

MoviesCardList.propTypes = {
  isSavedMovies: PropTypes.bool,
  savedMovies: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  ),
  displayedData: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.arrayOf(
        PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
      ),
    ]),
  ).isRequired,
  setDisplayedData: PropTypes.func.isRequired,
  onAddSavedMovie: PropTypes.func,
  onDeleteSavedMovie: PropTypes.func,
};

MoviesCardList.defaultProps = {
  savedMovies: [],
  isSavedMovies: false,
  onAddSavedMovie: () => {},
  onDeleteSavedMovie: () => {},
};

export default MoviesCardList;
