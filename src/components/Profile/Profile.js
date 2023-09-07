import React, { useState, useContext } from "react";
import './Profile.css'
import { CurrentUserContext } from "../../context/context";

export default function Profile({ error, onUpdateProfile, onLogout}) {
	const nameInput = "друг"
	const currentUser = useContext(CurrentUserContext);
	const [isFormEditable, setFormEditable] = useState(true);

	function handleEditBnt() {
        setFormEditable(!isFormEditable);
    }

	return(
		<section className="profile">
			<div className="profile__container">
				<div className="profile__data-set">
					<h2 className="profile__title">Привет, {currentUser.name} {nameInput} !</h2>
					<form className="profile__data-string">
						<span className="profile__text">Имя</span>
						<span className="profile__text">{currentUser.name} </span>
					</form>
					<span className="underline"/>
					<form className="profile__data-string">
						<span className="profile__text">E-mail</span>
						<span className="profile__text">{currentUser.email}</span>
					</form>
				</div>
				{/* <div className="profile__buttons">
					<button className="profile__btn">Редактировать</button>
					<button className="profile__btn profile__btn_red">Выйти из аккаунта</button>
				</div> */}
				<div className={"profile__buttons"}>
                        {/* {error.isError && <span className="profile__error">
                        {error.message}
                        </span>} */}
                        <button className={`profile__bnt-save profile__btn ${isFormEditable && 'profile__bnt_hidden'}`}>
                            Сохранить
                        </button>
                        <button className={`profile__edit-btn profile__btn ${!isFormEditable && 'profile__bnt_hidden'}`}
                                type="button"
                                onClick={handleEditBnt}
                        >Редактировать
                        </button>
                        <button
                            className={`profile__logout-bnt  profile__btn ${!isFormEditable && 'profile__bnt_hidden'}`}
                            type="button"
                            onClick={onLogout}
                        >Выйти из аккаунта
                        </button>
                    </div>
			</div>
		</section>
	);
}