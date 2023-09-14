import React, {useState} from "react";
import "./SearchForm.css";
import logo from '../../../images/search_icon.svg'
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";

export default function SearchForm({
	searchQuery,
	handleSearchChange,
	onSearchClick,
	onToggle,
	defaultValue,
	isToggled,
}) {
  
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (searchQuery === "") {
      setValidationError("Нужно ввести ключевое слово");
      return;
    }
    setValidationError("");
    onSearchClick();
  };
  return (
    <div className="searchform">
        <form className="searchform__bar" onSubmit={handleSubmit}>
			<label className="searchform__label">
			  <input 
	  			className="searchform__input"
				id="search-input" 
				type="search"
				placeholder="Фильм"
				value=""
				required
				defaultValue={defaultValue}
				onChange={handleSearchChange}
				autoComplete="off"
			  />
			</label>

			<button 
			  className="searchform__button" 
			  type="submit"
			>
			  <img className="searchform__icon" src={logo} alt="поиск"/>
			</button>
        </form>
	    {validationError && (
          <span className="searchform__validation">
            Необходимо ввести ключевое слово из названия фильма
          </span>
        )}
		<div className="searchform__toggle-container">
			<ToggleSwitch
			  onToggle={onToggle} 
			  isToggled={isToggled}
			/>
			<span className="searchform__toggle-title">Короткометражки</span>
		</div>
		<span className="searchform__border-bottom"/>
    </div>
  );
}