import React from 'react';

import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="about-project__title">О&nbsp;проекте</h2>
      <div className="about-project__text-section">
        <div className="about-project__text-block">
          <h3 className="about-project__subtitle ">Дипломный проект включал 5&nbsp;этапов</h3>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности
            и&nbsp;финальные доработки.
          </p>
        </div>
        <div className="about-project__text-block">
          <h3 className="about-project__subtitle ">
            На&nbsp;выполнение диплома ушло 5&nbsp;недель
          </h3>
          <p className="about-project__text">
            У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать,
            чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__timeline">
        <div className="about-project__timeline-box about-project__timeline-box_type_backend">
          <p className="about-project__timeline-term about-project__timeline-term_type_backend">
            1&nbsp;неделя
          </p>
          <p className="about-project__timeline-description">Back-end</p>
        </div>
        <div className="about-project__timeline-box about-project__timeline-box_type_frontend">
          <p className="about-project__timeline-term about-project__timeline-term_type_frontend">
            4&nbsp;недели
          </p>
          <p className="about-project__timeline-description">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
