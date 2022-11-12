import React from 'react';
import Header from '../Header/Header';
import './Promo.css';
import promo from '../../images/landing-logo.png';

const Promo = ({ loggedIn }) => {
  return (
    <section className='promo'>
      <Header loggedIn={loggedIn} />
      <div className='promo__container'>
        <div className='promo__text'>
        <h1 className='promo__title'>
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <p className='promo__description'>
        Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <button className='promo__button'>Узнать больше</button>
        </div>
      <img className='promo__logo' src={promo} alt='Логотип Промо.' />
      </div>
    </section>
  )
};

export default Promo;