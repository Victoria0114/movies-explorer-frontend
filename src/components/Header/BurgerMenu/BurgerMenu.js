import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import "./BurgerMenu.css";
import closeIcon from "../../../images/close_icon.svg";
import burgerIconBlack from "../../../images/icon_burger_black.svg";
import burgerIconWhite from "../../../images/burger-icon-white.svg";

function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const urlPath = useLocation();
  const iconBurger = urlPath.pathname === "/" ? burgerIconWhite : burgerIconBlack;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`burger-menu ${isOpen ? "open" : ""}`}>
      <button className="burger-menu__button">
        <img
        onClick={toggleMenu}
        src={iconBurger}
        alt="меню"
      />
      </button>

      <div
        className={`burger-menu__overlay ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      />
      <nav className="burger-menu__container">
        <button 
         className="burger-menu__btn-close"
         onClick={toggleMenu}
         src={closeIcon}
         alt="закрыть"
        >
        </button>
        <ul className="burger-menu__nav">
          <li className="burger-menu__li">
            <NavLink to="/" className="burger-menu__link" onClick={toggleMenu}>Главная</NavLink>
          </li>
          <li className="burger-menu__li">
            <NavLink to="movies" className="burger-menu__link" onClick={toggleMenu}>Фильмы</NavLink>
          </li>
          <li className="burger-menu__li">
            <NavLink to="/saved-movies"className="burger-menu__link" onClick={toggleMenu}>Сохраненные фильмы</NavLink>
          </li>
        </ul>
        <NavLink to="/profile" className="burger-menu__btn-acc" onClick={toggleMenu}>Аккаунт</NavLink>
      </nav>
    </div>
  );
}

export default BurgerMenu;
