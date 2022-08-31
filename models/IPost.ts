export interface IPostItem {
	title: string | null;
	status: string | null;
	date: Date | null;
}

export interface IPost {
	data: IPostItem[];
}
