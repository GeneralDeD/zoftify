import React from 'react';
import { Pagination } from 'antd';

interface ICustomPagination {
	current: number;
	limit: number;
	total: number;
	handleChange: (e: string) => void;
}

const CustomPagination: React.FC<ICustomPagination> = ({ current, limit, total, handleChange }) => {
	return (
		<div className="customPagination">
			<Pagination current={+current} onChange={(e) => handleChange(`${e}`)} pageSize={limit} total={total} />
		</div>
	);
};

export default CustomPagination;
