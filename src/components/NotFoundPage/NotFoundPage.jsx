import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../Button/Button';

import './NotFoundPage.css';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <section className="not-found-page">
      <h2 className="not-found-page__title">404</h2>
      <p className="not-found-page__subtitle">Страница не&nbsp;найдена</p>

      <Button
        className="not-found-page__button"
        onClick={() => {
          navigate(-1);
        }}
      >
        Назад
      </Button>
    </section>
  );
}

export default NotFoundPage;
