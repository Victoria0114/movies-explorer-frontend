import React from "react";

import "./Nav.css";

export default function Nav() {
  return (
    <nav className="nav">
      <ul className="nav__container">
        <li className="nav__link-wrapper">
          <a className="nav__link" href="#about">О проекте</a>
        </li>
        <li className="nav__link-wrapper">
          <a className="nav__link" href="#tech">Технологии</a>
        </li>
        <li className="nav__link-wrapper">
          <a className="nav__link" href="#portfolio">Студент</a>
        </li>
      </ul>
    </nav>
  );
}