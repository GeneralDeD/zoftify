import st from './customTable.module.scss';

interface ICustomTable {
	children: JSX.Element;
}

export default function CustomTable({ children }: ICustomTable) {
	return <div className={st.customTable}>{children}</div>;
}
