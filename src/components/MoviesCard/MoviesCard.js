import './MoviesCard.css';

const MoviesCard = ({ isSavedMoviesPage, movie }) => {
  return (
    <li className='card'>
      <div className='card__description'>
        <span className='card__name'>{movie.name}</span>
        <span className='card__duration'>{movie.duration}</span>
      </div>
      <img
        src={movie.image}
        alt={`Обложка фильма: ${movie.name}`}
        className='card__image'
      />
      {movie.saved && !isSavedMoviesPage && <button className='card__button_saved' />}
      {isSavedMoviesPage ? (
        <button className='card__button_delete' type='button' />
      ) : (
        <button className='card__button' type='button'>Сохранить
        </button>
      )}
    </li>
  )
};

export default MoviesCard;