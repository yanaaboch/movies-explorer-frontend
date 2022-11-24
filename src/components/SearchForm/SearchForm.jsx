import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useForm from '../../hooks/useForm';

import Button from '../Button/Button';
import Input from '../Input/Input';

import { MOVIES_ERROR_TEXT } from '../../utils/scripts/constants';
import { getlocalStorageItems } from '../../utils/scripts/utils';
import searchFormIcon from '../../images/search-form-icon.svg';
import searchIcon from '../../images/search-icon.svg';

import './SearchForm.css';

function SearchForm({
  isSavedMovies,
  savedMovies,
  setMoviesFromBeatfilm,
  displayedData,
  setDisplayedData,
}) {
  const { values, setValues, handleChange } = useForm();
  const [errorText, setErrorText] = useState('');

  const { isShortsMovies } = displayedData;
  const localStorageItems = getlocalStorageItems();

  function handleSubmit(event) {
    event.preventDefault();
    if (values.movie) {
      if (!isSavedMovies) {
        if (localStorageItems.beatfilmMovies) {
          setDisplayedData((prevData) => ({
            ...prevData,
            allMovies: localStorageItems.beatfilmMovies,
          }));
        } else {
          setMoviesFromBeatfilm();
        }

        setDisplayedData((prevData) => ({ ...prevData, searchQuery: values.movie }));
        setErrorText('');

        localStorage.setItem('query', values.movie);
        localStorage.setItem('isShortsMovies', isShortsMovies);
      }
      if (isSavedMovies) {
        setDisplayedData((prevData) => ({
          ...prevData,
          searchQuery: values.movie,
          allMovies: savedMovies,
        }));

        setErrorText('');
      }

      setDisplayedData((prevData) => ({ ...prevData, searchQuery: values.movie }));
      setErrorText('');
    } else {
      setErrorText(MOVIES_ERROR_TEXT.EMPTY_QUERY);
    }
  }

  useEffect(() => {
    if (!isSavedMovies) {
      setValues((prevValues) => ({
        ...prevValues,
        movie: localStorageItems.searchQuery || '',
      }));
    } else {
      setValues((prevValues) => ({ ...prevValues, movie: '' }));
    }
  }, [isSavedMovies, localStorageItems.searchQuery, setValues]);

  return (
    <section className="search-form">
      <h1 className="visually-hidden">Поиск по&nbsp;фильмам</h1>
      <form
        className="search-form__form"
        name="search"
        onSubmit={(event) => {
          handleSubmit(event);
        }}
        noValidate
      >

        <Input
          inputClassName="search-form__input"
          type="text"
          name="movie"
          id="movie-input"
          onChange={(event) => {
            handleChange(event);
          }}
          value={values.movie}
          placeholder="Фильм"
          labelText="Фильм"
          inputErrorClassName="search-form__submit-error"
          inputErrorText={errorText}
          required
        />
        <Button className="search-form__submit-button" isSubmitButton>
          <img
            className="search-form__submit-button-image"
            src={searchFormIcon}
            alt="Найти фильм"
          />
        </Button>
        <Button className="search-form__search-button" isSubmitButton>
          <img
            className="search-form__submit-button-image"
            src={searchIcon}
            alt="Поиск"
          />
        </Button>
        <Input
          inputClassName={`search-form__shorts-input ${
            isShortsMovies ? 'search-form__shorts-input_checked' : ''
          }`}
          type="checkbox"
          name="shorts"
          id="shorts-input"
          onChange={() => {
            setDisplayedData((prevData) => ({ ...prevData, isShortsMovies: !isShortsMovies }));
            if (!isSavedMovies) {
              localStorage.setItem('isShortsMovies', !isShortsMovies);
            }
          }}
          wrapperClassName="search-form__shorts-wrapper"
          isLabelShown
          labelClassName="search-form__shorts-label"
          labelText="Короткометражки"
          required
          searchIcon
        />
      </form>
    </section>
  );
}

SearchForm.propTypes = {
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
  setMoviesFromBeatfilm: PropTypes.func,
};

SearchForm.defaultProps = {
  isSavedMovies: false,
  savedMovies: [],
  setMoviesFromBeatfilm: () => {},
};

export default SearchForm;
