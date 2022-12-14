import { Select } from "antd";
import { FC } from "react";
const { Option } = Select;

interface ICustomSelect {
	value: number;
	options: number[];
	handleChange: (e: number) => void;
	page: number;
	limit: number;
	total: number;
}

const CustomSelect: FC<ICustomSelect> = ({ value, options, page, limit, total, handleChange }) => {
	return (
		<div className="customSelect">
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
				{options.map((item) => (
					<Option key={item} value={item}>
						{item}
					</Option>
				))}
			</Select>
			<div>
				Showing {(page - 1) * limit + 1} - {page * limit > total ? total : page * limit} of {total}
			</div>
		</div>
	);
};

export default CustomSelect;
