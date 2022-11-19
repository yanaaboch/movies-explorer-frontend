import React, { useState, useEffect } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import icon from '../../images/icon.svg';

const SearchForm = ({
  isMovieFilter,
  onSearchMovies,
  onFilter
}) => {
  const [movieRequest, setMovieRequest] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSearchMovies(movieRequest, isMovieFilter);
  };

  useEffect(() => {
    const request = localStorage.getItem('searchRequest');
    if (request) {
      setMovieRequest(request)
    }
  }, [isMovieFilter, onSearchMovies]);

  return (
    <section className='search'>
      <form className='search__form' onSubmit={handleFormSubmit} noValidate>
        <img className='search__icon' src={icon} alt='Лупа' />
        <input
          type='text'
          placeholder='Фильм'
          className='search__input'
          required
          value={movieRequest}
          onChange={e => setMovieRequest(e.target.value)}
        />
        <button
          type='submit'
          className='search__button'
        >
        </button>
      </form>

      <FilterCheckbox isMovieFilter={isMovieFilter} onFilter={onFilter} />
    </section>
  )
};

export default SearchForm;