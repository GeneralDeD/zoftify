import { FC } from "react";
import st from "./container.module.scss";

interface IContainer {
	children: JSX.Element;
}

const Container: FC<IContainer> = ({ children }) => {
	return <div className={st.container}>{children}</div>;
};

export default Container;
