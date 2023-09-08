import '../AuthForm/AuthForm.css';

export default function MailInput({ type, title, label, register, errors, placeholder, defaultValue }) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

  return(
    <>
      <label className="auth-form__label">{label}</label>
      <input
        {...register("email", {
          required: "Заполните это поле.",
          minLength: {
            value: 6,
            message: "Электронная почта должна содержать не менеее 6 символов",
          },
          maxLength: {
            value: 6,
            message: "Электронная почта должна содержать не более 40 символов",
          },
          pattern: {
            value: emailRegex,
            massage: "Адрес электронной почты должен содержать символ ' @ ' "
          }
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