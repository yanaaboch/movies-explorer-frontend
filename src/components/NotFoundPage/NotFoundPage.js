import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  const history = useNavigate();

  const goBack = () => {
    history.goBack();
  }
  return (
    <section className='page__container'>
      <div className='page__info-block'>
        <span className='page__status'>404</span>
        <span className='page__notfound'>Страница не найдена</span>
      </div>
      <button onClick={goBack} className='page__link'>Назад</button>
    </section>
  )
};

export default NotFoundPage;