import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

const Navigation = ({ loggedIn }) => {
    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  
    const toggleBurgerMenu = () => {
      setIsBurgerMenuOpen(!isBurgerMenuOpen);
    }
  
    return (
      <nav className='navigation'>
        {loggedIn ? (
          <>
            <div className='navigation__movies'>
              <Link to='/movies' className={'navigation__movies-link_active'}>
                Фильмы
              </Link>
              <Link to='/saved-movies' className={'navigation__movies-link_active'}>
                Сохранённые фильмы
              </Link>
            </div>
            <div>
              <Link to='/profile'>
                <button className='navigation__button_account' type='button'>
                  Аккаунт
                </button>
              </Link>
            </div>
          </>
        ) : (
          <div className='navigation__auth'>
            <Link to='/signup' className='navigation__link'>Регистрация</Link>
            <Link to='/signin'>
              <button className='navigation__button' type='button'>
                Войти
              </button>
            </Link>
          </div>
        )}
        {!isBurgerMenuOpen && loggedIn ? (
          <button className='burger__button' type='button' onClick={toggleBurgerMenu} />
        ) : <BurgerMenu onClose={toggleBurgerMenu} />
        }
      </nav>
    )
  };
export default Navigation;