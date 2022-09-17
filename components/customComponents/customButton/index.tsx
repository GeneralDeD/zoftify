import React, { FC } from "react";
import st from "./customButton.module.scss";

interface ICustomButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	title: string;
	width: number;
	handleClick?: () => void;
}

const CustomButton: FC<ICustomButton> = ({ type, title, width, handleClick }) => {
	return (
		<button
			type={type}
			className={st.customButton}
			style={{ width: `${width}px` }}
			onClick={handleClick}
		>
			{title}
		</button>
	);
};

export default CustomButton;
