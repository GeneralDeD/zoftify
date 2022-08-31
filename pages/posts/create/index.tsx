import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Container from '../../../components/container';
import CustomButton from '../../../components/customButton';
import CustomDatePicker from '../../../components/customComponents/customDatePicker';
import CustomFormStatusSelect from '../../../components/customComponents/customFormStatusSelect';
import CustomInput from '../../../components/customComponents/customInput';
import Header from '../../../components/header';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { IPostItem } from '../../../models/IPost';
import { createPost } from '../../../store/reducers/postsSlice';
import st from './createPost.module.scss';

export default function CreatePost() {
	const posts = useAppSelector((state) => state.posts.data),
		router = useRouter(),
		dispatch = useAppDispatch(),
		[data, setData] = useState<IPostItem>({
			id: posts.length + 1,
			title: '',
			date: '',
			status: '',
		}),
		defState = {
			title: false,
			date: false,
			status: false,
		},
		[isErr, setIsErr] = useState(defState);

	useEffect(() => {
		console.log(data);
	}, [data]);

	const handleChange = (key: string, value: string) => {
		setData((prev) => ({ ...prev, [key]: value }));
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (data.status && data.date) {
			dispatch(createPost(data));
			router.push('/posts');
		} else if (!data.status) {
			setIsErr({ ...defState, status: true });
		} else {
			setIsErr({ ...defState, date: true });
		}
	};

	return (
		<>
			<Header title="New Post" hasBackBtn={true} link="/posts" />
			<Container>
				<div className={st.createPost}>
					<p>Post information</p>
					<form onSubmit={handleSubmit}>
						<CustomInput
							placeholder="Title"
							value={data.title}
							setValue={(e) => handleChange('title', e)}
							isErr={isErr.title}
						/>
						<CustomFormStatusSelect
							isErr={isErr.status}
							value={data.status}
							handleChange={(e) => handleChange('status', e)}
						/>
						<CustomDatePicker
							isErr={isErr.date}
							handleChange={(e) => {
								if ({ ...e }?._d)
									handleChange('date', `${new Date(Date.parse({ ...e }?._d)).toISOString()}`);
							}}
						/>
						<CustomButton type="submit" title="Submit" width={163} />
					</form>
				</div>
			</Container>
		</>
	);
}
