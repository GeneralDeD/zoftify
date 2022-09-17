import { Input } from "antd";
import { FC } from "react";

const { Search } = Input;

interface ICustomSearch {
	search: string;
	handleChange: () => void;
	setSearch: (e: string) => void;
}

const CustomSearch: FC<ICustomSearch> = ({ search, setSearch, handleChange }) => (
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
