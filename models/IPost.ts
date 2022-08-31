export interface IPostItem {
	id: number;
	title: string;
	status: string;
	date: string;
}

export interface IPost {
	data: IPostItem[];
}
