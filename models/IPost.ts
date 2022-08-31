export interface IPostItem {
	id: number;
	title: string | null;
	status: string;
	date: string;
}

export interface IPost {
	data: IPostItem[];
}
