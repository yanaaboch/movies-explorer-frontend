import { useEffect, useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import useScreenWidth from '../../hooks/useScreenWidth';

import { checkSavedCard } from '../../utils/utils';

import {
  BIG_SCREEN_MOVIES_QTY,
  MIDDLE_SCREEN_MOVIES_QTY,
  SMALL_SCREEN_MOVIES_QTY,
  MORE_MOVIES_BIG_SCREEN_QTY,
  MORE_MOVIES_SMALL_SCREEN_QTY,
  BIG_SCREEN,
  SMALL_SCREEN
} from '../../utils/constants';

const MoviesCardList = ({
  movies,
  savedMovies,
  onSave,
  onDelete,
  isSavedMoviesPage
}) => {
  const [showMovieList, setShowMovieList] = useState(movies);

  const screenWidth = useScreenWidth();

  const searchedMoviesCount = movies ? movies.length : 0;

  const handleMoreClick = () => {
    if (screenWidth > BIG_SCREEN) {
      setShowMovieList(movies.slice(0, showMovieList.length + MORE_MOVIES_BIG_SCREEN_QTY))
    } else {
      setShowMovieList(movies.slice(0, showMovieList.length + MORE_MOVIES_SMALL_SCREEN_QTY))
    }
  }

  useEffect(() => {
    if (screenWidth > BIG_SCREEN) {
      setShowMovieList(movies.slice(0, BIG_SCREEN_MOVIES_QTY))
    } else if (screenWidth > SMALL_SCREEN && screenWidth <= BIG_SCREEN) {
      setShowMovieList(movies.slice(0, MIDDLE_SCREEN_MOVIES_QTY));
    } else if (screenWidth <= SMALL_SCREEN) {
      setShowMovieList(movies.slice(0, SMALL_SCREEN_MOVIES_QTY));
    } else {
      setShowMovieList(movies);
    }
  }, [screenWidth, movies])

  return (
    <section className='cards'>

      <ul className='cards__list'>
      {showMovieList.sort().map(movie => {
          return <MoviesCard
            key={isSavedMoviesPage ? movie.movieId : movie.id}
            movie={movie}
            isSavedMoviesPage={isSavedMoviesPage}
            onSave={onSave}
            onDelete={onDelete}
            saved={checkSavedCard(savedMovies, movie)}
          />
        })}
      </ul>
      {!isSavedMoviesPage && showMovieList && searchedMoviesCount !== showMovieList.length && (
        <button
          className="cards__button"
          onClick={handleMoreClick}
        >
          Ещё
        </button>
      )}
    </section>
  )
};

export default MoviesCardList;