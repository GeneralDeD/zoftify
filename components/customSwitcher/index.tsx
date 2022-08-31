import st from './customSwitcher.module.scss';

interface ICustomSwitcher {
	title: string;
	count: number;
	isActive?: boolean;
}

export default function CustomSwitcher({ title, count, isActive }: ICustomSwitcher) {
	return (
		<div className={`${st.customSwitcher} ${isActive && st.customSwitcher__active}`}>
			<span className={st.customSwitcher__title}>{title}</span>
			<span className={st.customSwitcher__count}>{count}</span>
		</div>
	);
}
