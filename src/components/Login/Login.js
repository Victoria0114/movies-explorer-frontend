import React from "react";
import { useForm } from "react-hook-form";

import AuthForm from "../Forms/AuthForm/AuthForm";
import MailInput from "../Forms/Inputs/MailInput";
import PasswordInput from "../Forms/Inputs/PasswordInput";

export default function Login({ handleLogin }) {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid},
	} = useForm({ mode: "onChange"});

	const submitData = (data) => {handleLogin(data)}

	return(
		<div className="login">
			<AuthForm 
				title={'Рады видеть!'}
				buttonText={'Войти'}
				navLink={'/sign-up'}
				question={'Ещё не зарегистрированы?'}
				navLinkTitle={'Регистрация'}
				onSubmit={handleSubmit(submitData)}
				isValid={isValid}
			>
				<MailInput
			      type={'email'}
				  title={'email'}
				  label={'E-mail'}
				  placeholder={'pochta@yandex.ru'}
				  register={register}
				  errors={errors}
			    />
			    <PasswordInput
			      type={'password'}
				  title={'password'}
				  label={'Пароль'}
				  placeholder={'Пароль'}
				  register={register}
				  errors={errors}
			    />
			</AuthForm>
		</div>
	);
}
