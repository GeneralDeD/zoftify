import st from './container.module.scss';

interface IContainer {
	children: JSX.Element;
}

export default function Container({ children }: IContainer) {
	return <div className={st.container}>{children}</div>;
}
