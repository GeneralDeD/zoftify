import BackBtn from '../backBtn';
import st from './header.module.scss';

interface IHeader {
	title: string;
	hasBackBtn?: boolean | false;
	link?: string;
}

export default function Header({ title, hasBackBtn, link }: IHeader) {
	return (
		<div className={st.header}>
			{hasBackBtn && <BackBtn link={link || ''} />}
			{title}
		</div>
	);
}
