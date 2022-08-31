import BackBtn from '../backBtn';
import st from './header.module.scss';

export default function Header() {
	return (
		<div className={st.header}>
			<BackBtn />
			Posts
		</div>
	);
}
