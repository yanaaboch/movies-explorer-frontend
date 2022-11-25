import {
  React, useState, useMemo, useEffect, useCallback,
} from 'react';
import { Routes, Route } from 'react-router-dom';

import LoginContext from '../../contexts/LoginContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';

import Main from '../../pages/Main/Main';
import Movies from '../../pages/Movies/Movies';
import SavedMovies from '../../pages/SavedMovies/SavedMovies';
import Profile from '../../pages/Profile/Profile';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import NotFound from '../../pages/NotFound/NotFound';
import ProtectedRoute from '../HOC/ProtectedRoute';
import RouteForAnonymous from '../HOC/RouteForAnonymous';

import { MOVIES_ERROR_TEXT } from '../../utils/scripts/constants';
import {
  getlocalStorageItems,
  bringMoviesToSingleView,
  validateMovies,
  sortMoviesInOrder,
} from '../../utils/scripts/utils';
import getMoviesFromBeatfilm from '../../utils/scripts/MoviesApi';
import {
  addSavedMovie,
  deleteSavedMovie,
  getUserData,
  getSavedMovies,
} from '../../utils/scripts/MainApi';

import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '', email: '', _id: '' });

  const localStorageItems = getlocalStorageItems();

  const [savedMovies, setSavedMovies] = useState([]);
  const [displayedData, setDisplayedData] = useState({
    searchQuery: localStorageItems.searchQuery || '',
    allMovies: localStorageItems.beatfilmMovies || [],
    isShortsMovies: localStorageItems.isShortsMovies || false,
    errorText: '',
  });
  const [isProladerShown, setIsProladerShown] = useState(false);
  const [isRequestGoingOn, setIsRequestGoingOn] = useState(false);

  const loginValue = useMemo(() => ({ isLoggedIn, setIsLoggedIn }), [isLoggedIn, setIsLoggedIn]);
  const currentUserValue = useMemo(
    () => ({ currentUser, setCurrentUser }),
    [currentUser, setCurrentUser],
  );

  console.log('currentUser ___ App', currentUser);

  const setUserInfo = useCallback(
    async (token) => {
      const userData = await getUserData(token);
      const savedMoviesFromServer = await getSavedMovies();
      setCurrentUser({ name: userData.name, email: userData.email, _id: userData._id });
      setSavedMovies(savedMoviesFromServer.sort((prev, next) => prev.movieId - next.movieId));
      setIsLoggedIn(true);
    },
    [setCurrentUser, setSavedMovies, setIsLoggedIn],
  );

  const setMoviesFromBeatfilm = useCallback(async () => {
    setIsProladerShown(true);

    try {
      const moviesFromBeatfilm = await getMoviesFromBeatfilm();
      const convertedMoviesFromBeatfilm = bringMoviesToSingleView(moviesFromBeatfilm);
      const validatedMoviesFromBeatfilm = validateMovies(convertedMoviesFromBeatfilm);

      localStorage.setItem('moviesFromBeatfilm', JSON.stringify(validatedMoviesFromBeatfilm));
      setDisplayedData((prevData) => ({
        ...prevData,
        allMovies: validatedMoviesFromBeatfilm,
        queryErrorText: '',
      }));
    } catch (error) {
      setDisplayedData((prevData) => ({
        ...prevData,
        allMovies: [],
        queryErrorText: MOVIES_ERROR_TEXT.FETCH_FAILED,
      }));
    }

    setIsProladerShown(false);
  }, [setDisplayedData]);

  const onAddSavedMovie = useCallback(
    async (movie) => {
      try {
        const addedSavedMovie = await addSavedMovie(movie);
        if (addedSavedMovie) {
          setSavedMovies([{ ...addedSavedMovie, key: addedSavedMovie.id }, ...savedMovies]);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    [savedMovies, setSavedMovies],
  );

  const onDeleteSavedMovie = useCallback(
    async (id) => {
      try {
        const deletedSavedMovie = await deleteSavedMovie(id);
        if (deletedSavedMovie) {
          setSavedMovies((prevSavedMovies) => sortMoviesInOrder(
            prevSavedMovies.filter(
              (savedMovie) => savedMovie.movieId !== deletedSavedMovie.movieId,
            ),
          ));
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    [setSavedMovies],
  );

  const onSignOut = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('query');
    localStorage.removeItem('isShortsMovies');

    setIsLoggedIn(false);
    setCurrentUser({ name: '', email: '', _id: '' });
    setSavedMovies([]);
    setDisplayedData({
      searchQuery: '',
      allMovies: [],
      isShortsMovies: false,
      errorText: '',
    });
  }, []);

  useEffect(() => {
    async function checkToken() {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          await setUserInfo(token);
        }
      } catch (error) {
        onSignOut();
      }
    }
    checkToken();
  }, [onSignOut, setUserInfo]);

  return (
    <div className="app">
      <LoginContext.Provider value={loginValue}>
        <CurrentUserContext.Provider value={currentUserValue}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/movies"
              element={(
                <ProtectedRoute>
                  <Movies
                    savedMovies={savedMovies}
                    displayedData={displayedData}
                    setDisplayedData={setDisplayedData}
                    isProladerShown={isProladerShown}
                    setMoviesFromBeatfilm={setMoviesFromBeatfilm}
                    onAddSavedMovie={onAddSavedMovie}
                    onDeleteSavedMovie={onDeleteSavedMovie}
                  />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/saved-movies"
              element={(
                <ProtectedRoute>
                  <SavedMovies
                    savedMovies={savedMovies}
                    displayedData={displayedData}
                    setDisplayedData={setDisplayedData}
                    onDeleteSavedMovie={onDeleteSavedMovie}
                  />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/profile"
              element={(
                <ProtectedRoute>
                  <Profile
                    onSignOut={onSignOut}
                    isRequestGoingOn={isRequestGoingOn}
                    setIsRequestGoingOn={setIsRequestGoingOn}
                  />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/signin"
              element={(
                <RouteForAnonymous>
                  <Login
                    setUserInfo={setUserInfo}
                    isRequestGoingOn={isRequestGoingOn}
                    setIsRequestGoingOn={setIsRequestGoingOn}
                  />
                </RouteForAnonymous>
              )}
            />
            <Route
              path="/signup"
              element={(
                <RouteForAnonymous>
                  <Register
                    isRequestGoingOn={isRequestGoingOn}
                    setIsRequestGoingOn={setIsRequestGoingOn}
                  />
                </RouteForAnonymous>
              )}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CurrentUserContext.Provider>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
