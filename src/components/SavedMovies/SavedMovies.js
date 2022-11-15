import React from 'react';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';

const savedMovies = [
  {
    id: '1',
    name: 'В погоне за Бэнкси',
    image: 'images/image1.png',
    duration: '27 минут',
    saved: true
  },
  {
    id: '2',
    name: 'В погоне за Бэнкси',
    image: 'images/image2.png',
    duration: '27 минут',
    saved: true
  },
  {
    id: '3',
    name: 'В погоне за Бенкси',
    image: 'images/image3.png',
    duration: '27 минут',
    saved: true
  },
];

const SavedMovies = ({ loggedIn }) => {
  return (
    <section>
      <Header loggedIn={loggedIn} />
      <SearchForm />
      <MoviesCardList isSavedMoviesPage={true} movies={savedMovies} />
      <Footer />
    </section>
  )
};

export default SavedMovies;