import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import './App.css';

import CurrentUserContext from "../../contexts/CurrentUserContext";

import Main from "../Main";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import moviesApi from "../../utils/MovieApi";
import {
  register,
  authorize,
  getContent,
  updateUserInfo,
  saveMovie,
  deleteMovie,
  getSavedMovies,
  logOut
} from "../../utils/MainApi";

import { search } from "../../utils/utils";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const history = useNavigate();

  const handleTokenCheck = () => {
    setIsLoading(true);
    getContent()
      .then((data) => {
        if (data.name) {
          setCurrentUser(data);
          setIsLoggedIn(true);
        }
      })
      .catch((error) => {
        console.log(error)
        setIsLoggedIn(false)
      })
  };

  const handleRegistration = (data) => {
    return register(data)
      .then(() => {
        history.push('/signin');
      })
      .catch(error => {
        setPopupMessage('При регистрации пользователя произошла ошибка.');
        setIsPopupOpen(true);
      });
  };

  const handleAuthorization = (data) => {
    return authorize(data)
      .then(() => {
        setIsLoading(true);
        Promise.all([getContent(), getSavedMovies()])
          .then(([userInfo, userMovies]) => {
            setCurrentUser(userInfo);
            localStorage.setItem('savedMovies', JSON.stringify(userMovies))
            setSavedMovies(userMovies);
            setIsLoggedIn(true);
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            setIsLoading(false);
          })
        history.push('/movies');
      })
      .catch(error => {
        setPopupMessage(error);
        setIsPopupOpen(true);
      });
  };

  useEffect(() => {
    handleTokenCheck()
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);
      Promise.all([getContent(), getSavedMovies()])
        .then(([userInfo, userMovies]) => {
          setCurrentUser(userInfo);
          setSavedMovies(userMovies);
        })
        .catch((error) => {
          setPopupMessage(error);
          setIsPopupOpen(true);
        })
        .finally(() => {
          setIsLoading(false);
        })
    }
  }, [isLoggedIn])

  const handleSaveMovie = (movie) => {
    const handledMovie = savedMovies.find(item => {
      return item.movieId === movie.id
    });
    const isLiked = Boolean(handledMovie);
    const id = handledMovie ? handledMovie._id : null;
    if (isLiked) {
      deleteMovie(id)
        .then((card) => {
          const updatedSavedMovies = savedMovies.filter(item => card._id !== item._id);
          localStorage.setItem('savedMovies', updatedSavedMovies);
          setSavedMovies(prev => updatedSavedMovies);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
      } else {
        saveMovie(movie)
          .then((newSavedMovie) => {
            setSavedMovies((prev) => [...prev, newSavedMovie]);
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  const handleDeleteMovie = (movie) => {
    setIsLoading(true);
    deleteMovie(movie._id)
      .then((card) => {
        const updatedSavedMovies = savedMovies.filter(item => card._id !== item._id);
        localStorage.setItem('savedMovies', updatedSavedMovies);
        setSavedMovies(prev => updatedSavedMovies);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const searchMovies = (searchRequest, isMovieFilter) => {
    if (searchRequest.trim() === '') {
      setPopupMessage('Нужно ввести ключевое слово');
      setIsPopupOpen(true);
      return;
    }
    setIsLoading(true);
    if (!movies || movies.length === 0) {
      moviesApi.getMovies()
        .then((data) => {
          setMovies(data);
          const filteredMovies = search(data, isMovieFilter, searchRequest);
          localStorage.setItem('searchRequest', searchRequest);
          localStorage.setItem('searchedMovies', JSON.stringify(filteredMovies));
          localStorage.setItem('filter', isMovieFilter);
          setSearchedMovies(filteredMovies);
        })
        .catch(error => {
          setPopupMessage(error);
          setIsPopupOpen(true);
        })
        .finally(() => {
          setIsLoading(false);
        })
    } else {
      const filteredMovies = search(movies, isMovieFilter, searchRequest);
      localStorage.setItem('searchRequest', searchRequest);
      localStorage.setItem('searchedMovies', JSON.stringify(filteredMovies));
      localStorage.setItem('filter', isMovieFilter);
      setSearchedMovies(filteredMovies);
      setIsLoading(false);
    }
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setPopupMessage(null);
  };

  const handleUpdateUser = (newUserInfo) => {
    setIsLoading(true);
    updateUserInfo(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
        setPopupMessage('Профиль успешно редактирован!');
        setIsPopupOpen(true);
      })
      .catch(error => {
        setPopupMessage('При обновлении профиля произошла ошибка.');
        setIsPopupOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSignOut = () => {
    return logOut().then(() => {
      localStorage.clear();
      setCurrentUser(null);
      setPopupMessage(null);
      setMovies(null);
      setSavedMovies(null);
      setSearchedMovies(null);
      setIsLoggedIn(false);
      history.push('/');
    })
      .catch(error => {
        setPopupMessage(error.message);
        setIsPopupOpen(true);
      })
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="App">
      <Routes>
        <Route path='/' element={<Main loggedIn={isLoggedIn} />} />
        <Route path='/movies'
          element={<ProtectedRoute loggedIn={isLoggedIn}>
            <Movies 
          movies={searchedMovies}
          savedMovies={savedMovies}
          onSearchMovies={searchMovies}
          isLoading={isLoading}
          onSave={handleSaveMovie}
          onDelete={handleDeleteMovie}></Movies>
          </ProtectedRoute>}
          />
        <Route path='/saved-movies/*'
          element={<ProtectedRoute loggedIn={isLoggedIn}>
            <SavedMovies
          movies={savedMovies}
          isLoading={isLoading}
          onDelete={handleDeleteMovie}></SavedMovies>
          </ProtectedRoute>}
          />
        <Route path='/profile'
          element={<ProtectedRoute loggedIn={isLoggedIn}>
          <Profile
          currentUser={currentUser}
          onUpdateUser={handleUpdateUser}
          onSignOut={handleSignOut}></Profile>
          </ProtectedRoute>}
          />
        <Route path='/signup'
          element={<Register onRegister={handleRegistration} />} />
        <Route path='/signin'
          element={<Login onLogin={handleAuthorization} />} />

          <Route path='/movies'
            element={isLoggedIn ? <Navigate to='/movies' /> : <Navigate to='/' />} />
          <Route path='/saved-movies'
            element={isLoggedIn ? <Navigate to='/saved-movies' /> : <Navigate to='/' />} />
          <Route path='/profile'
            element={isLoggedIn ? <Navigate to='/profile' /> : <Navigate to='/' />} />
          <Route path='/signup'
            element={!isLoggedIn ? <Navigate to='/signup' /> : <Navigate to='/' />} />
          <Route path='/signin'
            element={!isLoggedIn ? <Navigate to='/signin' /> : <Navigate to='/' />} />
        <Route path='*'
          element={<NotFoundPage loggedIn={isLoggedIn} />} />
      </Routes>

      <InfoTooltip
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          message={popupMessage}
        />
    </div>

    
    </CurrentUserContext.Provider>
  );
}

export default App;