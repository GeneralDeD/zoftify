import { IPost, IPostItem } from './../../models/IPost';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IPost = {
	data: [
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
		{
			id: 15,
			title: 'Pixel-perfect development at Zoftify. Essential steps to take.',
			date: '2022-05-16T18:36:17.710Z',
			status: 'draft',
		},
		{
			id: 14,
			title: 'Pixel-perfect development at Zoftify. Essential steps to take.',
			date: '2022-05-12T18:36:17.710Z',
			status: 'published',
		},
		{
			id: 13,
			title: 'React.js vs Vue.js, what’s better for you next project?',
			date: '2022-05-11T18:36:17.710Z',
			status: 'draft',
		},
		{
			id: 12,
			title: 'React.js vs ANGULAR.js, what’s better for you next project?',
			date: '2022-05-06T18:36:17.710Z',
			status: 'published',
		},
	],
};

export const posts = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		createPost: (state, action: PayloadAction<IPostItem>) => {
			state.data.push(action.payload);
		},
		setPostStatus: (state, action: PayloadAction<{ value: string; id: number }>) => {
			const index = state.data.findIndex((item) => item.id === action.payload.id);
			state.data[index].status = action.payload.value;
		},
	},
});

export const { createPost, setPostStatus } = posts.actions;

export default posts.reducer;
