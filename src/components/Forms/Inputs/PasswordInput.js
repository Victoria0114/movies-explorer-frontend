import '../AuthForm/AuthForm.css';

export default function PasswordInput({ type, title, label, register, errors, placeholder, defaultValue }) {

  return(
    <>
      <label className="auth-form__label">{label}</label>
      <input
        {...register('password', {
          required: "Заполните это поле.",
          minLength: {
            value: 5,
            message: "Пароль должен быть не короче 5 символов",
          },
          maxLength: {
            value: 40,
            message: "Пароль должен содержать не более 40 символов",
          },
        })}
        id={`${title}-input`}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="auth-form__input"
      />
      <span className="auth-form__error-message auth-form__error-message_active">
				{errors?.[title] && <div>{errors?.[title]?.message}</div>}
      </span>			
    </>
  );
}