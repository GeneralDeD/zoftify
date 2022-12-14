import { Select } from "antd";
import { FC } from "react";
const { Option } = Select;

interface ICustomStatus {
	value: string;
	handleChange: (e: string) => void;
}

const CustomStatus: FC<ICustomStatus> = ({ value, handleChange }) => {
	return (
		<div className="customStatus">
			<Select
				defaultValue={value}
				onChange={(e) => handleChange(e)}
				suffixIcon={
					<svg
						width="14"
						height="7"
						viewBox="0 0 14 7"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12.28 0.966675L7.9333 5.31334C7.41997 5.82668 6.57997 5.82668 6.06664 5.31334L1.71997 0.966675"
							stroke="#111111"
							strokeWidth="1.5"
							strokeMiterlimit="10"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				}
			>
				<Option value="draft">Draft</Option>
				<Option value="published">Published</Option>
			</Select>
		</div>
	);
};

export default CustomStatus;
