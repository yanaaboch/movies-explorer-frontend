import React, { useEffect, useContext } from 'react';
import './Profile.css';
import Header from '../Header/Header';
import useForm from '../../hooks/useForm';
import CurrentUserContext from '../../contexts/CurrentUserContext';

const Profile = ({ onUpdateUser, onSignOut, loggedIn }) => {
  const currentUser = useContext(CurrentUserContext);
  const { enteredValues, handleChange, isFormValid, resetForm } = useForm();

  const handleSubmit = (event) => {
    event.preventDefault();

    onUpdateUser({
      name: enteredValues.name,
      email: enteredValues.email,
    });
  };

  useEffect(() => {
    currentUser ? resetForm(currentUser) : resetForm();
  }, [currentUser, resetForm]);

  const isValueSameAsWas = (!isFormValid || (currentUser.name === enteredValues.name && currentUser.email === enteredValues.email));

  return (
    <section>
      <Header loggedIn={loggedIn} />
      <div className='profile__container'>
        <h1 className='profile__title'>Привет, {currentUser.name}!</h1>
        <form className='profile___form form' onSubmit={handleSubmit}>
          <div className='profile__value'>
            <label className='profile__label'>Имя</label>
            <input
              type='text'
              name='name'
              value={enteredValues.name || ''}
              onChange={handleChange}
              className='profile__input'
              required
              />
          </div>
          <div className='profile__line'></div>
          <div className='profile__value'>
            <label className='profile__label'>
              E-mail
            </label>
            <input
             name='email'
             value={enteredValues.email || ''}
             onChange={handleChange}
              className='profile__input'
              required
              />
              </div>
          <div className='profile__bottom'>
            <button
              className='profile__edit'
              type='submit'
              disabled={isValueSameAsWas}
            >
              Редактировать
            </button>
            <button
              className='profile__logout'
              type='button'
              onClick={() => onSignOut()}
            >
              Выйти из аккаунта
            </button>
          </div>
        </form>
        
      </div>
    </section>
  )
};

export default Profile;