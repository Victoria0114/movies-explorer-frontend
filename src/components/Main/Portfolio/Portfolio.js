import React from "react";

import "./Portfolio.css";
import Title from "../Title/Title";
import photo from "../../../images/photo.jpg";
import { workOne, workTwo, workThree } from "../../../utils/constants.js";

export default function Portfolio() {
  const getWork = (title, link) => {
    return (
      <a 
        className="portfolio__app-container portfolio__app-link _underline"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <p className="portfolio__app-title">{title}</p>
        <span>&#x2197;</span>
      </a>
    );
  };

  return (
    <section id="portfolio" className="portfolio">
      <Title title="Студент" />
      <div className="portfolio__about">
        <div className="portfolio__about-container">
          <h2 className="portfolio__title">Виктория</h2>
          <p className="portfolio__subtitle">Фронтенд-разработчик, 31 год</p>
          <p className="portfolio__text">
          Я родилась и живу в Долгопрудном. Закончила факультет экономики МГТУ Станкин. 
          У меня есть муж и сын. С 2014 года занимаюсь продажей столешниц, подоконников и т.д. из 
          кварца, натурального и искусственного камня в компании «MyQuartz». 
          В декретном отпуске решила пойти учиться в ЯндексПрактикум на веб-разработчика.
          </p>
          <a
            className="portfolio__github-link"
            href="https://github.com/Victoria0114"
						target="_blank"
						rel="noopener noreferrer"
          >
            Github
          </a>
        </div>
        <img src={photo} className="portfolio__photo" alt="фото" />
      </div>
      
      <span className="portfolio__links-title">Портфолио</span>
      <div className="portfolio__apps-container">
        {getWork("Статичный сайт", workOne)}
        {getWork("Адаптивный сайт", workTwo)}
        {getWork("Одностраничное приложение", workThree)}
      </div>
    </section>
  );
}