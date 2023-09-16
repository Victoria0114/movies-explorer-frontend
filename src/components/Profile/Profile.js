import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

import './Profile.css'
import { CurrentUserContext } from "../../context/context";
import TextInput from "../Forms/Inputs/TextInput";
import MailInput from "../Forms/Inputs/MailInput";

export default function Profile({ onSave, onLogOut }) {
	const { register, handleSubmit, watch,
        formState: { errors, isValid },
    } = useForm({ mode: "onChange" });
    
    const nameInputValue = watch('name');
    const emailInputValue = watch('email');
    const { currentUser } = useContext(CurrentUserContext);
    const [isInputsVisible, setIsnputsVisible] = useState(false);
    const [isSaveButtonValid, setIsSaveButtonValid] = useState(false);
    const isButtonDisabled = isValid && isSaveButtonValid;
    const saveBtnClassName = `profile__save-btn ${isButtonDisabled ? "" : "profile__save-btn_disabled"}`
    
    useEffect(() => {
      const isNameEqual = nameInputValue === currentUser.name;
      const isEmailEqual = emailInputValue === currentUser.email;
      setIsSaveButtonValid(!(isNameEqual && isEmailEqual));
    }, [nameInputValue, emailInputValue, currentUser]);
        
    
    const handleUnlockInputs = () => {
      setIsnputsVisible(true);
    };
        
    const submitData = (data) => {
      setIsnputsVisible(false);
      onSave(data);  
    }

	return(
		<section className="profile">
			<div className="profile__container">
				<div className="profile__data-set">
					<h2 className="profile__title">Привет, {currentUser.name}!</h2>
					<div className="profile__data-string">
						<span className="profile__text">Имя</span>
						<span className={`profile__text ${isInputsVisible ? "hidden" : ""}`}>{currentUser.name} </span>
            <div className={`profile__input-container ${isInputsVisible ? "" : "hidden"}`}>
              <TextInput
                type={"text"}
                title={"name"}
                defaultValue={currentUser.name}
                register={register}
                errors={errors}
              />
            </div>
					</div>
					<span className="underline"/>
					<div className="profile__data-string">
						<span className="profile__text">E-mail</span>
						<span className={`profile__text ${isInputsVisible ? "hidden" : ""}`}>{currentUser.email}</span>
            <div className={`profile__input-container ${isInputsVisible ? "" : "hidden"}`}>
              <MailInput
                type={"email"}
                title={"email"}
                defaultValue={currentUser.email}
                register={register}
                errors={errors}
              />
            </div>
					</div>
				</div>
				<div className={"profile__buttons"}>
          {!isInputsVisible ? (
            <>
              <button className="profile__btn profile__edit-btn" onClick={handleUnlockInputs}>
                Редактировать
              </button>
              <button
                onClick={onLogOut}
                className="profile__btn profile__logout-bnt"
              >
               Выйти из аккаунта
              </button>
             </> 
          ) : (
            <button
              className={saveBtnClassName}
              onClick={handleSubmit(submitData)}
              disabled={!isButtonDisabled}
            >
             Сохранить
            </button>
          )}

          {/* <button className={`profile__bnt-save profile__btn ${isFormEditable && 'profile__bnt_hidden'}`}
						        onClick={handleSubmit}
					    >Сохранить
                        </button>
                        <button className={`profile__edit-btn profile__btn ${!isFormEditable && 'profile__bnt_hidden'}`}
                                type="button"
                                onClick={handleUnlock}
                        >Редактировать
                        </button>
                        <button
                            className={`profile__logout-bnt  profile__btn ${!isFormEditable && 'profile__bnt_hidden'}`}
                            type="button"
                            onClick={onSignOut}
                        >Выйти из аккаунта
           </button> */}
        </div>
			</div>
		</section>
	);
}