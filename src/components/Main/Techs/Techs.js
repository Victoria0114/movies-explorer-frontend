import React from "react";

import "./Techs.css";
import Title from "../Title/Title";

export default function Techs() {
  return (
    <section id="tech" className="tech">
      <Title title="Технологии" />
      <div className="tech__container">
        <h2 className="tech__title">7 технологий</h2>
        <p className="tech__subtitle">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
				<div className="tech__stack-box">
					<div className="tech__stack">HTML</div>
					<div className="tech__stack">CSS</div>
					<div className="tech__stack">JS</div>
					<div className="tech__stack">React</div>
					<div className="tech__stack">Git</div>
					<div className="tech__stack">Express.js</div>
					<div className="tech__stack">MongoDB</div>
				</div>
      </div>
    </section>
  );
}