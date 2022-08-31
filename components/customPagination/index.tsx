import React from 'react';
import { Pagination } from 'antd';
import st from './customPagination.module.scss';

const CustomPagination: React.FC = () => {
	return <Pagination defaultCurrent={1} total={50} />;
};

export default CustomPagination;
