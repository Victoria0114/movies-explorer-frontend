import React from "react";

import "./AboutProject.css";
import Title from "../Title/Title";

function AboutProject() {
  return (
    <section id="about" className="about">
      <Title title='О проекте' />
      <div className="about__container">
        <div className="column">
          <h2 className="column__title">
						Дипломный проект включал 5 этапов
					</h2>
          <p className="column__text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="column">
          <h2 className="column__title">
						На выполнение диплома ушло 5 недель
					</h2>
          <p className="column__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about__grafic">
        <div className="about__grafic-cell about__grafic-cell_first-week">
          <p className="about__grafic-text">1 неделя</p>
        </div>
        <div className="about__grafic-cell about__grafic-cell_four-weeks">
          <p className="about__grafic-text">4 недели</p>
        </div>
      </div>
      <div className="about__grafic">
        <div className="about__grafic-cell about__grafic-cell_first-week span">
          <p className="about__grafic-text grey-color">Back-end</p>
        </div>
        <div className="about__grafic-cell about__grafic-cell_four-weeks span">
          <p className="about__grafic-text grey-color">Front-end</p>
        </div>
      </div>
      {/* <div class="grid-grafic">
        <div class="grid-cell grid-cell_greenline">1 неделя</div>
        <div class="grid-cell grid-cell_greyline">4 недели</div>
        <div class="grid-cell grid-cell_underline">Back-end</div>
        <div class="grid-cell grid-cell_underline">Front-end</div>
      </div> */}
    </section>
  );
}

export default AboutProject;