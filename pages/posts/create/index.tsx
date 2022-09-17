import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import Container from "../../../components/container";
import CustomButton from "../../../components/customComponents/customButton";
import CustomDatePicker from "../../../components/customComponents/customDatePicker";
import CustomFormStatusSelect from "../../../components/customComponents/customFormStatusSelect";
import CustomInput from "../../../components/customComponents/customInput";
import Header from "../../../components/header";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { IPost } from "../../../models/IPost";
import { createPost } from "../../../store/reducers/postsSlice";
import st from "./createPost.module.scss";

const CreatePost: NextPage = () => {
	const { posts } = useAppSelector((state) => state),
		router = useRouter(),
		dispatch = useAppDispatch(),
		[data, setData] = useState<IPost>({
			id: posts.length + 1,
			title: "",
			date: "",
			status: "",
		}),
		defState = {
			title: false,
			date: false,
			status: false,
		},
		[isErr, setIsErr] = useState(defState);

	const handleChange = (key: string, value: string) => {
		setData((prev) => ({ ...prev, [key]: value }));
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (data.status && data.date) {
			dispatch(createPost(data));
			router.push("/posts");
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
							setValue={(e) => handleChange("title", e)}
							isErr={isErr.title}
						/>
						<CustomFormStatusSelect
							isErr={isErr.status}
							handleChange={(e) => handleChange("status", e)}
						/>
						<CustomDatePicker
							isErr={isErr.date}
							handleChange={(e) => {
								if ({ ...e }?._d)
									handleChange("date", `${new Date(Date.parse({ ...e }?._d)).toISOString()}`);
							}}
						/>
						<CustomButton type="submit" title="Submit" width={163} />
					</form>
				</div>
			</Container>
		</>
	);
};

export default CreatePost;
