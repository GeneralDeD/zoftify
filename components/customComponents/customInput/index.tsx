import st from './customInput.module.scss';

interface ICustomInput {
	isErr: boolean;
	placeholder: string;
	value: string;
	setValue: (e: string) => void;
}

export default function CustomInput({ isErr, placeholder, value, setValue }: ICustomInput) {
	return (
		<input
			className={`${st.customInput} ${isErr && st.customInput__isErr}`}
			placeholder={placeholder}
			value={value}
			onChange={(e) => setValue(e.target.value)}
			required={true}
		/>
	);
}
