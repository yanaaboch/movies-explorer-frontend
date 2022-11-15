import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './BurgerMenu.css';

const BurgerMenu = ({ onClose }) => {
  return (
    <section className='burger'>
      <div className='burger__backdrop'>
        <div className='burger__container'>
          <button type='button' className='burger__close-btn' onClick={() => onClose()} />
          <div className='burger__menu'>
            <NavLink to='/' className='burger__link'>
              Главная
            </NavLink>
            <NavLink to='/movies' className='burger__link'>
              Фильмы
            </NavLink>
            <NavLink to='/saved-movies' className='burger__link'>
              Сохранённые фильмы
            </NavLink>
          </div>
            <Link to='/profile'>
              <button className='burger__button_account'>Аккаунт</button>
            </Link>
        </div>
      </div>
    </section>
  )
};

export default BurgerMenu;