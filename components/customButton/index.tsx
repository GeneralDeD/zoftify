import React from 'react';
import st from './customButton.module.scss';

interface ICustomButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	title: string;
	width: number;
	handleClick?: () => void;
}

export default function CustomButton({ type, title, width, handleClick }: ICustomButton) {
	return (
		<button type={type} className={st.customButton} style={{ width: `${width}px` }} onClick={handleClick}>
			{title}
		</button>
	);
}
