import React from 'react';

import '../InfoTooltip/InfoTooltip.css'
import successLogo from '../../images/reg-ok.svg';
import deniedLogo from '../../images/reg-no.svg';

function InfoTooltip({ name, isOpen, onClose, condition, handleOverlayClick, successTitle, deniedTitle }) {

	return (
		<section className={`popup ${isOpen ? "popup_opened" : ""} popup_type_${name}`} onClick={handleOverlayClick} >
			<div className="popup__container overlay">
				<button
					className="popup__close-button"
					aria-label="Закрыть"
					type="button"
					onClick={onClose} 
				/>
				{condition ? (
					<>
						<img className="popup__image_infotooltip" src={successLogo} alt={successTitle} />
						<p className="popup__title_infotooltip">{successTitle}</p>
					</>
				) : (
					<>
						<img className="popup__image_infotooltip" src={deniedLogo} alt={deniedTitle} />
						<p className="popup__title_infotooltip">{deniedTitle}</p>
					</>
				)
				}
			</div>
		</section>
	)
}

export default InfoTooltip;