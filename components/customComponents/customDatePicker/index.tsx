import { DatePicker } from "antd";
import React, { FC } from "react";

interface ICustomDatePicker {
	isErr: boolean;
	handleChange: (e: any) => void;
}

const CustomDatePicker: FC<ICustomDatePicker> = ({ isErr, handleChange }) => (
	<div className={`customDatePicker ${isErr && "customDatePicker__isErr"}`}>
		<DatePicker placeholder="Time" showTime onChange={(e) => handleChange(e)} />
	</div>
);

export default CustomDatePicker;
