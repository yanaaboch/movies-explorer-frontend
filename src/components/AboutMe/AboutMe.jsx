import React from 'react';

import CustomLink from '../CustomLink/CustomLink';

import photo from '../../images/about-me-photo.jpg';

import './AboutMe.css';

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__inner">
        <img className="about-me__photo" src={photo} alt="Фотография разработчика" />
        <h3 className="about-me__name ">Яна</h3>
        <p className="about-me__profession">Фронтенд-разработчик, 26 лет</p>
        <p className="about-me__text">
          Я живу в Саратове. Училась в Москве на факультете химической технологии.
          Сейчас мне интересна веб-разработка,
          я постоянно изучаю что-то новое и стремлюсь улучшать свои навыки.
          В свободное время занимаюсь спортом и воспитываю двух собак.
          Мечтаю увидеть Тихий океан и получить работу фронтенд-разработчиком.
        </p>
        <CustomLink className="about-me__link" path="https://github.com/yanaaboch">
          Github
        </CustomLink>
      </div>
    </section>
  );
}

export default AboutMe;
