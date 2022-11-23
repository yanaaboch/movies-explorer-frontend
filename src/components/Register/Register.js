import React from 'react';
import { Link } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import './Register.css';
import logo from '../../images/logo.svg';

const Register = ({ onRegister }) => {
  const { enteredValues, errors, handleChange, isFormValid } = useForm();

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegister(enteredValues);
  };

  return (
    <section className='register__container'>
      <div className='register__header'>
        <Link to='/'>
          <img
            src={logo}
            alt='Логотип'
            className='register__logo'
          />
        </Link>

        <h1 className='register__title'>Добро пожаловать!</h1>
      </div>

      <form className='register__form form' onSubmit={handleSubmit}>
        <label className='register__label' htmlFor='name'>Имя</label>
        <input
          className='register__input'
          type='text'
          id='name'
          name='name'
          minLength={2}
          required
          value={enteredValues.name || ''}
          onChange={handleChange}
        />
        <span className='register__error'>{errors.name}</span>
        <label className='register__label'htmlFor='email'>E-mail</label>
        <input
          className='register__input'
          type='email'
          id='email'
          name='email'
          required
          value={enteredValues.email || ''}
          onChange={handleChange}
        />
        <span className='register__error'>{errors.email}</span>
        <label className='register__label' htmlFor='password'>Пароль</label>
        <input
          className='register__input'
          type='password'
          id='password'
          name='password'
          minLength={6}
          required
          value={enteredValues.password || ''}
          onChange={handleChange}
        />
        <span className='register__error'>{errors.password}</span>
        <button className='register__button' type='submit' disabled={!isFormValid}>Зарегистрироваться</button>
      </form>
      <div className='register__bottom'>
        <span>Уже зарегистрированы?</span>
        <Link to='/signin' className='register__link'>Войти</Link>
      </div>

    </section>
  )
};

export default Register;