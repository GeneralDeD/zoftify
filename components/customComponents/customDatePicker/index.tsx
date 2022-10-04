import { DatePicker } from "antd";
import React, { FC } from "react";

interface ICustomDatePicker {
	isError: boolean;
	handleChange: (e: any) => void;
}

const CustomDatePicker: FC<ICustomDatePicker> = ({ isError, handleChange }) => (
	<div className={`customDatePicker ${isError && "customDatePicker__isError"}`}>
		<DatePicker placeholder="Time" showTime onChange={(e) => handleChange(e)} />
	</div>
);

export default CustomDatePicker;
