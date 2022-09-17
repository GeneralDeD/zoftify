import { FC } from "react";
import st from "./customInput.module.scss";

interface ICustomInput {
	isErr: boolean;
	placeholder: string;
	value: string;
	setValue: (e: string) => void;
}

const CustomInput: FC<ICustomInput> = ({ isErr, placeholder, value, setValue }) => {
	return (
		<input
			className={`${st.customInput} ${isErr && st.customInput__isErr}`}
			placeholder={placeholder}
			value={value}
			onChange={(e) => setValue(e.target.value)}
			required={true}
		/>
	);
};

export default CustomInput;
