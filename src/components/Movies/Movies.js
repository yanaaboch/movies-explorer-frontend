import React from 'react';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';

const movies = [
  {
    id: '1',
    name: 'В погоне за Бэнкси',
    image: 'images/image1.png',
    duration: '27 минут',
    saved: false
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
    saved: false
  },
  {
    id: '4',
    name: 'В погоне за Бэнкси',
    image: 'images/image4.png',
    duration: '27 минут',
    saved: false
  },
  {
    id: '5',
    name: 'В погоне за Бэнкси',
    image: 'images/image5.png',
    duration: '27 минут',
    saved: false
  },
  {
    id: '6',
    name: 'В погоне за Бэнкси',
    image: 'images/image6.png',
    duration: '27 минут',
    saved: false
  },
  {
    id: '7',
    name: 'В погоне за Бэнкси',
    image: 'images/image7.png',
    duration: '27 минут',
    saved: false
  },
  {
    id: '8',
    name: 'В погоне за Бэнкси',
    image: 'images/image8.png',
    duration: '27 минут',
    saved: false
  },
  {
    id: '9',
    name: 'В погоне за Бэнкси',
    image: 'images/image9.png',
    duration: '27 минут',
    saved: false
  },
  {
    id: '10',
    name: 'В погоне за Бэнкси',
    image: 'images/image10.png',
    duration: '27 минут',
    saved: false
  },
  {
    id: '11',
    name: 'В погоне за Бэнкси',
    image: 'images/image11.png',
    duration: '27 минут',
    saved: false
  },
  {
    id: '12',
    name: 'В погоне за Бэнкси',
    image: 'images/image12.png',
    duration: '27 минут',
    saved: false
  },
];

const Movies = ({ loggedIn }) => {
  return (
    <section>
      <Header loggedIn={loggedIn} />
      <SearchForm />
      <MoviesCardList isSavedMoviesPage={false} movies={movies} />
      <Footer />
    </section>
  )
};

export default Movies;