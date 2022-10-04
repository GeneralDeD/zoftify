import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import Container from "../../components/container";
import CustomButton from "../../components/customComponents/customButton";
import CustomPagination from "../../components/customComponents/customPagination";
import CustomSearch from "../../components/customComponents/customSearch";
import CustomSelect from "../../components/customComponents/customSelect";
import CustomSwitcher from "../../components/customComponents/customSwitcher";
import CustomTable from "../../components/customComponents/customTable";
import CustomStatus from "../../components/customComponents/customStatus";
import { wrapper } from "../../store/store";
import st from "./posts.module.scss";
import { IPost } from "../../models/IPost";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setPostStatus } from "../../store/reducers/postsSlice";
import Header from "../../components/header";
import { useFilterData } from "../../hooks/filter";
import { ObjectToQuery } from "../../utils/objectToQuery";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { LINKS } from "../../assets/links";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

export type ICounts = {
	[key: string]: number;
};

interface IPostsPage {
	status: string;
	search: string;
	page: number;
	limit: number;
}

export interface IAllData {
	posts: IPost[];
	counts: ICounts;
}

const Posts: NextPage<IPostsPage> = ({ status, search, page, limit }) => {
	const router = useRouter(),
		dispatch = useAppDispatch(),
		data = useAppSelector((state) => state.posts),
		[allData, setAllData] = useState<IAllData>({ posts: data, counts: { draft: 0, published: 0 } }),
		[searchInput, setSearchInput] = useState(search),
		switchers = [
			{
				id: "",
				title: "All statuses",
				count: allData.counts.draft + allData.counts.published,
			},
			{
				id: "draft",
				title: "Draft",
				count: allData.counts.draft,
			},
			{
				id: "published",
				title: "Published",
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

		const routerQuery = ObjectToQuery(query);

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
							handleChange={() => handleChange("search", searchInput)}
						/>
						<CustomButton
							width={163}
							title="Create Post"
							handleClick={() => {
								router.push(LINKS.CREATEPOST);
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
								handleChange={() => handleChange("status", item.id)}
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
							page={page}
							limit={limit}
							total={
								status ? allData.counts[status] : allData.counts.draft + allData.counts.published
							}
							options={limits}
							handleChange={(e) => handleChange("limit", `${e}`)}
						/>
						<CustomPagination
							current={page}
							limit={limit}
							total={
								status ? allData.counts[status] : allData.counts.draft + allData.counts.published
							}
							handleChange={(e) => handleChange("page", `${e}`)}
						/>
					</div>
				</div>
			</Container>
		</>
	);
};

export default Posts;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
	() => async (ctx) => {
		const { search, status, page = 1, limit = 5 } = ctx.query;

		return {
			props: {
				status: status || "",
				search: search || "",
				page,
				limit,
			},
		};
	}
);
