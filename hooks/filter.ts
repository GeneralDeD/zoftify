import { IPost } from './../models/IPost';
import { ICounts } from '../pages/posts';

interface IUseFilterData {
	data: IPost[];
	search: string;
	status: string;
	page: number;
	limit: number;
}

export const useFilterData = ({ data, search, status, page, limit }: IUseFilterData) => {
	const countsSum: ICounts = {
		draft: 0,
		published: 0,
	};

	let filteredData = data;

	const incCount = () => {
		filteredData.forEach((item) => countsSum[item.status]++);
	};

	if (search && status) {
		filteredData = filteredData.filter(
			(item) => item.title?.includes(search.toString()) && ++countsSum[item.status]
		);
		switch (status) {
			case 'draft': {
				filteredData = filteredData.filter((item) => item.status === 'draft');
				break;
			}
			case 'published': {
				filteredData = filteredData.filter((item) => item.status === 'published');
				break;
			}
		}
	} else if (search) {
		filteredData = filteredData.filter(
			(item) => item.title?.includes(search.toString()) && ++countsSum[item.status]
		);
	} else if (status) {
		incCount();
		switch (status) {
			case 'draft': {
				filteredData = filteredData.filter((item) => item.status === 'draft');
				break;
			}
			case 'published': {
				filteredData = filteredData.filter((item) => item.status === 'published');
				break;
			}
		}
	} else incCount();

	return {
		data: filteredData.slice((+page - 1) * +limit, +page * +limit),
		counts: countsSum,
	};
};
