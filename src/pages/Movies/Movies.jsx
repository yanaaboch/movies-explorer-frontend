import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/Header/Header';
import Content from '../../components/Content/Content';
import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import Preloader from '../../components/Preloader/Preloader';
import Footer from '../../components/Footer/Footer';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { getUserData } from '../../utils/scripts/MainApi';

function Movies({
  savedMovies,
  displayedData,
  setDisplayedData,
  isProladerShown,
  setMoviesFromBeatfilm,
  onAddSavedMovie,
  onDeleteSavedMovie,
}) {
  const { setCurrentUser } = useContext(CurrentUserContext);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      (async () => {
        const userData = await getUserData(token);
        if (userData) {
          setCurrentUser({ name: userData.name, email: userData.email });
        }
      })();
    }
  }, []);
  return (
    <>
      <Header />
      <Content>
        <SearchForm
          displayedData={displayedData}
          setDisplayedData={setDisplayedData}
          setMoviesFromBeatfilm={setMoviesFromBeatfilm}
        />
        {isProladerShown ? (
          <Preloader />
        ) : (
          <MoviesCardList
            savedMovies={savedMovies}
            displayedData={displayedData}
            setDisplayedData={setDisplayedData}
            onAddSavedMovie={onAddSavedMovie}
            onDeleteSavedMovie={onDeleteSavedMovie}
          />
        )}
      </Content>
      <Footer />
    </>
  );
}

Movies.propTypes = {
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
  isProladerShown: PropTypes.bool.isRequired,
  setMoviesFromBeatfilm: PropTypes.func.isRequired,
  onAddSavedMovie: PropTypes.func.isRequired,
  onDeleteSavedMovie: PropTypes.func.isRequired,
};

Movies.defaultProps = {
  savedMovies: [],
};

export default Movies;
