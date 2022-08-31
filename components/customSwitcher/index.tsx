import st from './customSwitcher.module.scss';

interface ICustomSwitcher {
	title: string;
	count: number;
	isActive?: boolean;
	handleChange: () => void;
}

export default function CustomSwitcher({ title, count, isActive, handleChange }: ICustomSwitcher) {
	return (
		<div className={`${st.customSwitcher} ${isActive && st.customSwitcher__active}`} onClick={handleChange}>
			<span className={st.customSwitcher__title}>{title}</span>
			<span className={st.customSwitcher__count}>{count}</span>
		</div>
	);
}
