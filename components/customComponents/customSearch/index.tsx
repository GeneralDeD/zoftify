import { Input } from 'antd';
import React from 'react';

const { Search } = Input;

interface ICustomSearch {
	search: string;
	handleChange: () => void;
	setSearch: (e: string) => void;
}

const CustomSearch: React.FC<ICustomSearch> = ({ search, setSearch, handleChange }) => (
	<div className="customSearch">
		<Search
			placeholder="Search"
			value={search}
			onChange={(e) => setSearch(e.target.value)}
			allowClear
			onSearch={handleChange}
		/>
	</div>
);

export default CustomSearch;
