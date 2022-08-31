import Container from '../../../components/container';
import Header from '../../../components/header';
import st from './createPost.module.scss';

export default function CreatePost() {
	return (
		<>
			<Header title="New Post" hasBackBtn={true} link="/posts" />
			<Container>
				<div className={st.createPost}>
					<p>Post information</p>
					<form></form>
				</div>
			</Container>
		</>
	);
}
