import React from 'react';

import CustomLink from '../CustomLink/CustomLink';

import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__about">Учебный проект Яндекс.Практикум&nbsp;х&nbsp;BeatFilm.</p>
      <ul className="footer__list">
        <li className="footer__item footer__item_type_link">
          <CustomLink className="footer__link" path="https://practicum.yandex.ru/">
            Яндекс.Практикум
          </CustomLink>
        </li>
        <li className="footer__item footer__item_type_link">
          <CustomLink className="footer__link" path="https://github.com/yandex-praktikum">
            Github
          </CustomLink>
        </li>
        <li className="footer__item footer__item_type_copyright">&copy;2022</li>
      </ul>
    </footer>
  );
}

export default Footer;
