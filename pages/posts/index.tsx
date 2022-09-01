import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Container from '../../components/container';
import CustomButton from '../../components/customButton';
import CustomPagination from '../../components/customPagination';
import CustomSearch from '../../components/customSearch';
import CustomSelect from '../../components/customSelect';
import CustomSwitcher from '../../components/customSwitcher';
import CustomTable from '../../components/customTable';
import { wrapper } from '../../store/store';
import st from './posts.module.scss';
import { IPost } from '../../models/IPost';
import { useEffect, useState } from 'react';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import CustomStatus from '../../components/customStatus';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setPostStatus } from '../../store/reducers/postsSlice';
import Header from '../../components/header';
import { useFilterData } from '../../hooks/filter';
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

export type ICounts = {
	[key: string]: number;
};

interface IPosts {
	status: string;
	search: string;
	page: number;
	limit: number;
}

export interface IAllData {
	posts: IPost[];
	counts: ICounts;
}

export default function Posts({ status, search, page, limit }: IPosts) {
	const router = useRouter(),
		dispatch = useAppDispatch(),
		data = useAppSelector((state) => state.posts),
		[allData, setAllData] = useState<IAllData>({ posts: data, counts: { draft: 0, published: 0 } }),
		[searchInput, setSearchInput] = useState(search),
		switchers = [
			{
				id: '',
				title: 'All statuses',
				count: allData.counts.draft + allData.counts.published,
			},
			{
				id: 'draft',
				title: 'Draft',
				count: allData.counts.draft,
			},
			{
				id: 'published',
				title: 'Published',
				count: allData.counts.published,
			},
		],
		limits = [5, 10, 15];

	useFilterData({ data, search, status, page, limit, setAllData });

	const handleChange = (key: string, value: string) => {
		const query = router.query;
		delete query[key];

		if (value) {
			query[key] = value;
		}

		const routerQuery = objToQuery(query);

		router.push(`${router.pathname}${routerQuery && `?${routerQuery}`}`);
	};

	return (
		<>
			<Header title="Posts" />
			<Container>
				<div className={st.posts}>
					<div className={st.posts__header}>
						<CustomSearch
							search={searchInput}
							setSearch={setSearchInput}
							handleChange={() => handleChange('search', searchInput)}
						/>
						<CustomButton
							width={163}
							title="Create Post"
							handleClick={() => {
								router.push('/posts/create');
							}}
						/>
					</div>
					<div className={st.posts__switchers}>
						{switchers.map((item) => (
							<CustomSwitcher
								key={item.id}
								title={item.title}
								count={item.count}
								isActive={status === item.id}
								handleChange={() => handleChange('status', item.id)}
							/>
						))}
					</div>
					<CustomTable>
						<table>
							<thead>
								<tr>
									<th>ID</th>
									<th>Title</th>
									<th>Time</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>
								{allData.posts.map((item) => (
									<tr key={item.id}>
										<td>{item.id}</td>
										<td>{item.title}</td>
										<td>{timeAgo.format(new Date(Date.parse(item.date)))}</td>
										<td>
											<CustomStatus
												value={item.status}
												handleChange={(e) => {
													dispatch(setPostStatus({ value: e, id: item.id }));
												}}
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</CustomTable>
					<div className={st.posts__footer}>
						<CustomSelect
							value={limit}
							options={limits}
							handleChange={(e) => handleChange('limit', `${e}`)}
						/>
						<CustomPagination
							current={page}
							limit={limit}
							total={status ? allData.counts[status] : allData.counts.draft + allData.counts.published}
							handleChange={(e) => handleChange('page', `${e}`)}
						/>
					</div>
				</div>
			</Container>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
	const { search, status, page = 1, limit = 5 } = ctx.query;

	return {
		props: {
			status: status || '',
			search: search || '',
			page,
			limit,
		},
	};
});

const objToQuery = (obj: any) => {
	let str = [];
	for (let p in obj) {
		if (Array.isArray(obj[p])) {
			const st = [];
			st.push(`${p}=${obj[p][0]}`);
			if (obj[p]?.length > 1) {
				for (let j = 1; j < obj[p].length; j++) {
					st.push(obj[p][j]);
				}
			}
			str.push(st.join(','));
		} else if (obj.hasOwnProperty(p) && obj[p]?.length && obj[p] !== 'Any') {
			str.push(`${p}=${obj[p]}`);
		} else if (typeof obj[p] == 'number') {
			str.push(`${p}=${obj[p]}`);
		}
	}
	return str.join('&');
};
