import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <ul className='portfolio__projects'>
        <li>
          <a className='portfolio__link' rel='noreferrer' href='https://github.com/yanaaboch/how-to-learn' target='_blank'>
            Статичный сайт
          </a>
          <span>↗</span>
        </li>
        <li>
          <a className='portfolio__link' rel='noreferrer' href='https://github.com/yanaaboch/russian-travel' target='_blank'>
            Адаптивный сайт
          </a>
          <span>↗</span>
        </li>
        <li>
          <a className='portfolio__link' rel='noreferrer' href='https://github.com/yanaaboch/react-mesto-api-full' target='_blank'>
            Одностраничное приложение
          </a>
          <span>↗</span>
        </li>
      </ul>
    </section>
  )
};

export default Portfolio;