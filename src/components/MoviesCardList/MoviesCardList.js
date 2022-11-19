import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({
  isSavedMoviesPage,
  movies,
  savedMovies,
  onSave,
  onDelete
}) => {

  return (
    <section className='cards'>

      <ul className='cards__list'>
      {movies.sort().map(movie => {
          return <MoviesCard
            key={isSavedMoviesPage ? movie.movieId : movie.id}
            movie={movie}
            isSavedMoviesPage={isSavedMoviesPage}
            onSave={onSave}
            onDelete={onDelete}
            savedMovies={savedMovies}
          />
        })}
      </ul>
    </section>
  )
};

export default MoviesCardList;