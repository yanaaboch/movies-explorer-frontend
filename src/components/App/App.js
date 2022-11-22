import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";

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

// import moviesApi from "../../utils/MovieApi";
import {
  register,
  authorize,
  getContent,
  updateUserInfo,
  saveMovie,
  deleteMovie,
  getSavedMovies
} from "../../utils/MainApi";

// import { search, saveToLocalStorage } from "../../utils/utils";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  //const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const history = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    handleTokenCheck()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

  const handleRegistration = async ({ name, email, password }) => {
    return register({ name, email, password })
      .then(() => {
        handleAuthorization({ email, password });
      })
      .catch(error => {
        setPopupMessage(error);
          setIsPopupOpen(true);
      });
  };

  const handleAuthorization = async (data) => {
    return authorize(data)
      .then((data) => {
        setIsLoggedIn(true);
        localStorage.setItem('jwt', data.token);
        history.push('/movies');
        Promise.all([getContent(data.token), getSavedMovies(data.token)])
          .then(([userInfo, userMovies]) => {
            setCurrentUser(userInfo);
            localStorage.setItem('savedMovies', JSON.stringify(userMovies));
            setSavedMovies(userMovies);
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            setIsLoading(false);
          })
      })
      .catch(error => {
        setPopupMessage(error);
        setIsPopupOpen(true);
      });
  };

  const handleSaveMovie = (movie) => {
    const jwt = localStorage.getItem('jwt');
    const handledMovie = savedMovies.find(item => {
      return item.movieId === movie.id
    });
    const isLiked = Boolean(handledMovie);
    const id = handledMovie ? handledMovie._id : null;
    if (isLiked) {
      deleteMovie(id, jwt)
        .then((card) => {
          const updatedSavedMovies = savedMovies.filter(item => card._id !== item._id);
          localStorage.setItem('savedMovies', updatedSavedMovies);
          setSavedMovies(updatedSavedMovies);
        })
        .catch(error => {
          setPopupMessage(error);
          setIsPopupOpen(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
      } else {
        saveMovie(movie, jwt)
          .then((newSavedMovie) => {
            setSavedMovies((prev) => [...prev, newSavedMovie]);
        })
        .catch((error) => {
          setPopupMessage(error);
          setIsPopupOpen(true);
        })
    }
  }

  const handleDeleteMovie = (movie) => {
    setIsLoading(true);
    const jwt = localStorage.getItem('jwt');
    deleteMovie(movie._id, jwt)
      .then((card) => {
        const updatedSavedMovies = savedMovies.filter(item => card._id !== item._id);
        localStorage.setItem('savedMovies', updatedSavedMovies);
        setSavedMovies(prev => updatedSavedMovies);
      })
      .catch(error => {
        setPopupMessage(error);
        setIsPopupOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setPopupMessage('');
  };

  const handleUpdateUser = (newUserInfo) => {
    const jwt = localStorage.getItem('jwt');
    setIsLoading(true);
    updateUserInfo(newUserInfo, jwt)
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
    localStorage.clear();
    setCurrentUser({});
    setPopupMessage('');
    setSavedMovies([]);
    setIsLoggedIn(false);
    history.push('/');
  };

  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    getContent(jwt)
      .then((data) => {
        setIsLoggedIn(true);
        setCurrentUser(data)
        history(location.pathname);
      })
      .catch((err) => console.log(err));
    getSavedMovies(jwt)
      .then((movies) => {
        setSavedMovies(movies)
      })
      .catch((err) => console.log(err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="App">
      <Routes>
        <Route path='/' element={<Main loggedIn={isLoggedIn} />} />
        <Route path='/signup'
          element={!isLoggedIn ? (
          <Register onRegister={handleRegistration} />) : (<Navigate to='/' />)} />
        <Route path='/signin'
          element={!isLoggedIn ? (
          <Login onLogin={handleAuthorization} />) : (<Navigate to='/' />)} />
        <Route path='/movies'
          element={<ProtectedRoute loggedIn={isLoggedIn}>
            <Movies 
          savedMovies={savedMovies}
          onLoading={setIsLoading}
          isLoading={isLoading}
          onSave={handleSaveMovie}
          onDelete={handleDeleteMovie}
          setPopupMessage={setPopupMessage}
          setIsPopupOpen={setIsPopupOpen}></Movies>
          </ProtectedRoute>}
          />
        <Route path='/saved-movies/*'
          element={<ProtectedRoute loggedIn={isLoggedIn}>
            <SavedMovies
          savedMovies={savedMovies}
          isLoading={isLoading}
          onDelete={handleDeleteMovie}
          setPopupMessage={setPopupMessage}
          setIsPopupOpen={setIsPopupOpen}></SavedMovies>
          </ProtectedRoute>}
          />
        <Route path='/profile'
          element={<ProtectedRoute loggedIn={isLoggedIn}>
          <Profile
          onUpdateUser={handleUpdateUser}
          onSignOut={handleSignOut}></Profile>
          </ProtectedRoute>}
          />
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