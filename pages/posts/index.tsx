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
import { IPostItem } from '../../models/IPost';
import { useEffect, useState } from 'react';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import CustomStatus from '../../components/customStatus';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setPostStatus } from '../../store/reducers/postsSlice';
import Header from '../../components/header';
TimeAgo.addDefaultLocale(en);

interface IPosts {
	counts: {
		draft: number;
		published: number;
	};
	status: string;
	search: string;
	page: number;
	limit: number;
}

export default function Posts({ status, search, counts, page, limit }: IPosts) {
	const router = useRouter(),
		dispatch = useAppDispatch(),
		data = useAppSelector((state) => state.posts),
		[posts, setPosts] = useState<IPostItem[]>(data),
		[searchInput, setSearchInput] = useState(search),
		switchers = [
			{
				id: '',
				title: 'All statuses',
				// count: counts.draft + counts.published,
				count: 20,
			},
			{
				id: 'draft',
				title: 'Draft',
				// count: counts.draft,
				count: 20,
			},
			{
				id: 'published',
				title: 'Published',
				// count: counts.published,
				count: 20,
			},
		],
		limits = [5, 10, 15];

	const timeAgo = new TimeAgo('en-US');

	useEffect(() => {
		type ICounts = {
			[key: string]: number;
		};

		const counts: ICounts = {
			draft: 0,
			published: 0,
		};

		const incCount = () => {
			data.forEach((item) => counts[item.status]++);
		};

		console.log(posts, status);

		if (search && status) {
			setPosts(data.filter((item) => item.title?.includes(search.toString()) && ++counts[item.status]));

			switch (status) {
				case 'draft': {
					setPosts(data.filter((item) => item.status === 'draft'));
					break;
				}
				case 'published': {
					setPosts(data.filter((item) => item.status === 'published'));
					break;
				}
			}
		} else if (search) {
			setPosts(data.filter((item) => item.title?.includes(search.toString()) && ++counts[item.status]));
		} else if (status) {
			incCount();

			console.log('yes');

			switch (status) {
				case 'draft': {
					setPosts(data.filter((item) => item.status === 'draft'));
					break;
				}
				case 'published': {
					setPosts(data.filter((item) => item.status === 'published'));
					break;
				}
			}
		} else {
			incCount();
			setPosts(data);
		}
	}, [status, search]);

	const handleChange = (key: string, value: string) => {
		const query = router.query;
		delete query[key];

		if (value) {
			query[key] = value;
		}

		const routerQuery = objToQuery(query);

		router.push(`${router.pathname}${routerQuery && `?${routerQuery}`}`);
	};

	const renderPage = () => {
		const query = router.query;

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
								{posts.map((item) => (
									<tr key={item.id}>
										<td>{item.id}</td>
										<td>{item.title}</td>
										<td>{timeAgo.format(new Date(Date.parse(item.date)))}</td>
										<td>
											<CustomStatus
												value={item.status}
												handleChange={(e) => dispatch(setPostStatus({ value: e, id: item.id }))}
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
						{/* <CustomPagination
							current={page}
							limit={limit}
							total={status ? 2 : counts.draft + counts.published}
							handleChange={(e) => handleChange('page', `${e}`)}
						/> */}
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

// export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
// 	let { posts } = store.getState();
// 	const { search, status, page = 1, limit = 5 } = ctx.query;

// 	console.log(posts);

// 	type ICounts = {
// 		[key: string]: number;
// 	};

// 	const counts: ICounts = {
// 		draft: 0,
// 		published: 0,
// 	};

// 	const incCount = () => {
// 		posts.forEach((item) => counts[item.status]++);
// 	};

// 	if (search && status) {
// 		posts = posts.filter((item) => item.title?.includes(search.toString()) && ++counts[item.status]);

// 		switch (status) {
// 			case 'draft': {
// 				posts = posts.filter((item) => item.status === 'draft');
// 				break;
// 			}
// 			case 'published': {
// 				posts = posts.filter((item) => item.status === 'published');
// 				break;
// 			}
// 		}
// 	} else if (search) {
// 		posts = posts.filter((item) => item.title?.includes(search.toString()) && ++counts[item.status]);
// 	} else if (status) {
// 		incCount();

// 		switch (status) {
// 			case 'draft': {
// 				posts = posts.filter((item) => item.status === 'draft');
// 				break;
// 			}
// 			case 'published': {
// 				posts = posts.filter((item) => item.status === 'published');
// 				break;
// 			}
// 		}
// 	} else incCount();

// 	return {
// 		props: {
// 			posts: posts.slice((+page - 1) * +limit, +page * +limit),
// 			counts,
// 			status: status || '',
// 			search: search || '',
// 			page,
// 			limit,
// 		},
// 	};
// });

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
