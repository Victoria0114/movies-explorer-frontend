import React from "react";
import { useForm } from "react-hook-form";
import AuthForm from "../Forms/AuthForm/AuthForm";
import MailInput from "../Forms/Inputs/MailInput";
import PasswordInput from "../Forms/Inputs/PasswordInput";
import TextInput from "../Forms/Inputs/TextInput";

export default function Register({ onRegister }) {
	const {
      register,
	  handleSubmit,
      formState: { errors, isValid },
    } = useForm({ mode: "onChange" });
    
    const submitData = (data) => {
	  onRegister(data);
    }

	return(
		<AuthForm
			title={'Добро пожаловать!'}
			buttonText={'Зарегистрироваться'}
			navLink={'/sign-in'}
			question={'Уже зарегистрированы?'}
			navLinkTitle={"Войти"}
			onSubmit={handleSubmit(submitData)}
			isValid={isValid}
		>
			<MailInput
			  type={'email'}
				title={'email'}
				label={'e-mail'}
				placeholder={'e-mail'}
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
			<TextInput
			    type={'text'}
				title={'name'}
				label={'Имя'}
				placeholder={'Имя'}
				register={register}
				errors={errors}
			/>
		</AuthForm>
	);
}	