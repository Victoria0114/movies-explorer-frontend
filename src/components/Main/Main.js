import React from "react";

import Promo from "./Promo/Promo";
import Nav from "./Nav/Nav";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import Portfolio from "./Portfolio/Portfolio";

function Main() {
	return(
		<main>
			<Promo />
			<Nav />
			<AboutProject />
			<Techs />
			<Portfolio />
		</main>
	)
}

export default Main;
