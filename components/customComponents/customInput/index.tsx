import { FC } from "react";
import st from "./customInput.module.scss";

interface ICustomInput {
	isError: boolean;
	placeholder: string;
	value: string;
	setValue: (e: string) => void;
}

const CustomInput: FC<ICustomInput> = ({ isError, placeholder, value, setValue }) => {
	return (
		<input
			className={`${st.customInput} ${isError && st.customInput__isError}`}
			placeholder={placeholder}
			value={value}
			onChange={(e) => setValue(e.target.value)}
			required={true}
		/>
	);
};

export default CustomInput;
