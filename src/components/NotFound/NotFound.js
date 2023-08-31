import React from "react";

import './NotFound.css'
import { Link, useNavigate } from "react-router-dom";

function NotFound() {
	const navigate = useNavigate()

	return(
		<section className='page-not-found'>
            <h2 className='page-not-found__title'>404</h2>
            <p className='page-not-found__subtitle'>Страница не найдена</p>
            <Link className='page-not-found__link' onClick={() => navigate(-2)}>Назад</Link>
        </section>
	);
}

export default NotFound;
