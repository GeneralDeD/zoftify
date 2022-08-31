import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import React from 'react';

// const onChange: DatePickerProps['onChange'] = (date, dateString) => {
// 	console.log(date, dateString);
// };

interface ICustomDatePicker {
	isErr: boolean;
	handleChange: (e: any) => void;
}

const CustomDatePicker: React.FC<ICustomDatePicker> = ({ isErr, handleChange }) => (
	<div className={`customDatePicker ${isErr && 'customDatePicker__isErr'}`}>
		<DatePicker placeholder="Time" showTime onChange={(e) => handleChange(e)} />
	</div>
);

export default CustomDatePicker;
