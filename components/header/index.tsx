import { FC } from "react";
import BackBtn from "../backButton";
import st from "./header.module.scss";

interface IHeader {
	title: string;
	hasBackBtn?: boolean | false;
	link?: string;
}

const Header: FC<IHeader> = ({ title, hasBackBtn, link }) => {
	return (
		<div className={st.header}>
			{hasBackBtn && <BackBtn link={link || ""} />}
			{title}
		</div>
	);
};

export default Header;
