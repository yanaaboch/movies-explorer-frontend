import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import './App.css';

import Main from "../Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main loggedIn={isLoggedIn} />} />
        <Route path='/movies'
          element={<Movies loggedIn={isLoggedIn} />} />
        <Route path='saved-movies'
          element={<SavedMovies loggedIn={isLoggedIn} />} />
        <Route path='/profile'
          element={<Profile loggedIn={isLoggedIn} />} />
        <Route path='/signup'
          element={<Register loggedIn={isLoggedIn} />} />
        <Route path='/signin'
          element={<Login loggedIn={isLoggedIn} />} />
        <Route path='*'
          element={<NotFoundPage loggedIn={isLoggedIn} />} />
      </Routes>
    </div>
  );
}

export default App;