import { IPost, IPostItem } from './../../models/IPost';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IPost = {
	data: [],
};

export const posts = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		createPost: (state, action: PayloadAction<IPostItem>) => {
			state.data.push(action.payload);
		},
	},
});

export const { createPost } = posts.actions;

export default posts.reducer;
