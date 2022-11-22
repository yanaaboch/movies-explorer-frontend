import React, { useState, useEffect } from 'react';
import useScreenWidth from '../../hooks/useScreenWidth';
import './MoviesCard.css';


import { convertMinToHours } from '../../utils/utils';

const MoviesCard = ({
  isSavedMoviesPage,
  movie,
  onSave,
  onDelete,
  saved
}) => {
  const screenWidth = useScreenWidth();
  const [isMobile, setIsMobile] = useState(false);
  const handleSaveCard = () => {
    onSave(movie);
  };

  const handleDeleteCard = () => {
    onDelete(movie);
  };

  useEffect(() => {
    if (screenWidth < 786) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [screenWidth]);

  return (
    <li className='card'>
      <div className='card__description'>
        <span className='card__name'>{movie.nameRU}</span>
        <span className='card__duration'>{convertMinToHours(movie.duration)}</span>
      </div>
      <a href={movie.trailerLink} className="card__link" target="_blank" rel="noreferrer">
        <img
          src={isSavedMoviesPage ?
            movie.image :
            `https://api.nomoreparties.co/${movie.image.url}`
          }
          alt={`Обложка фильма: ${movie.nameRU}`}
          className='card__image'
        />
      </a>
      {saved && !isSavedMoviesPage &&
        <button type='button' className='card__button_saved' onClick={handleSaveCard} />}
      {isSavedMoviesPage ? (
        <button className='card__button_delete' type='button' onClick={handleDeleteCard} />
      ) : (
        <button
          className={!saved ? 'card__button' : 'card__button_hidden'}
          type='button'
          onClick={handleSaveCard}
        >
          Сохранить
        </button>
      )}
      {isMobile && (
        <button className='card__button_delete card__button_visible' type='button' onClick={handleDeleteCard} />
      )}
    </li>
  )
};

export default MoviesCard;