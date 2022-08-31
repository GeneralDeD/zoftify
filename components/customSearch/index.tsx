import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import React from 'react';

const { Search } = Input;

const suffix = (
	<AudioOutlined
		style={{
			fontSize: 16,
			color: '#1890ff',
		}}
	/>
);

const onSearch = (value: string) => console.log(value);

const CustomSearch: React.FC = () => (
	<div className="customSearch">
		<Search placeholder="Search" allowClear onSearch={onSearch} style={{ width: 200 }} />
	</div>
);

export default CustomSearch;
