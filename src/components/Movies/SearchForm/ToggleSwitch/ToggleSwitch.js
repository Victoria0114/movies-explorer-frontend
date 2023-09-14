import React from "react";

import "./ToggleSwitch.css";

export default function ToggleSwitch({ onToggle, isToggled }) {
  return (
		<label class="toggle">
			<input onChange={onToggle} checked={isToggled} type="checkbox" id="toggle"/>
			<span class="toggle__slider"></span>
		</label>
  );
}