import './AboutMe.css';
import photo from '../../images/me.jpg';

const AboutMe = () => {
  return (
    <section className='aboutme'>
      <h2 className='aboutme__title'>Студент</h2>
      <div className='aboutme__content'>
        <div className='aboutme__info'>
          <span className='aboutme__name'>Яна</span>
          <span className='aboutme__job'>Фронтенд-разработчик, 26 лет</span>
          <span className='aboutme__bio'>
            Я живу в Саратове. Училась в Москве на факультете химической технологии. Сейчас мне интересна веб-разработка, я постоянно изучаю что-то новое и стремлюсь улучшать свои навыки. В свободное время занимаюсь спортом и воспитываю двух собак. Мечтаю увидеть Тихий океан и получить работу фронтенд-разработчиком.
          </span>
          <a className='aboutme__link' href='https://github.com/yanaaboch' target='_blank' rel='noreferrer'>Github</a>
        </div>
        <img
          className='aboutme__photo'
          src={photo}
          alt='Моё фото'
        />
      </div>
    </section>
  )
};

export default AboutMe;