import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Container from '../../components/container';
import CustomButton from '../../components/customButton';
import CustomPagination from '../../components/customPagination';
import CustomSearch from '../../components/customSearch';
import CustomSwitcher from '../../components/customSwitcher';
import CustomTable from '../../components/customTable';
import { wrapper } from '../../store/store';
import st from './posts.module.scss';

export default function Posts() {
	const router = useRouter();

	const data = [
		{
			id: 18,
			title: 'Next.js is the future of React',
			date: '2022-07-16T18:36:17.710Z',
			status: 'draft',
		},
		{
			id: 17,
			title: 'Why do you need Lint?',
			date: '2022-06-16T18:36:17.710Z',
			status: 'published',
		},
		{
			id: 16,
			title: 'React.js vs Vue.js, what’s better for you next project?',
			date: '2022-05-16T18:36:17.710Z',
			status: 'published',
		},
	];

	return (
		<Container>
			<div className={st.posts}>
				<div className={st.posts__header}>
					<CustomSearch />
					<CustomButton
						width={163}
						title="Create Post"
						handleClick={() => {
							router.push('/posts/add');
						}}
					/>
				</div>
				<div className={st.posts__switchers}>
					<CustomSwitcher title="All statuses" count={20} isActive={true} />
					<CustomSwitcher title="Draft" count={1} />
					<CustomSwitcher title="Published" count={19} />
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
							{data.map((item) => (
								<tr key={item.id}>
									<td>{item.id}</td>
									<td>{item.title}</td>
									<td>{item.date}</td>
									<td>{item.status}</td>
								</tr>
							))}
						</tbody>
					</table>
				</CustomTable>
				<div>
					<CustomPagination />
				</div>
			</div>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
	console.log(store.getState());
	return { props: {} };
});
