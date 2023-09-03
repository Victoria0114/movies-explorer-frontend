import React from "react";

import './Logo.css';
import logo from '../../images/logo.svg';
import { NavLink } from "react-router-dom";

function Logo() {
	return(
		<NavLink to="/">
			<img className="logo" alt="Логотип сайта" src={logo}   />
		</NavLink>
	);
};

export default Logo;
