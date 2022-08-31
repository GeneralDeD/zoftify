import st from './customButton.module.scss';

interface ICustomButton {
	title: string;
	width: number;
	handleClick: () => void;
}

export default function CustomButton({ title, width, handleClick }: ICustomButton) {
	return (
		<button className={st.customButton} style={{ width: `${width}px` }} onClick={() => handleClick}>
			{title}
		</button>
	);
}
