import { useRouter } from "next/router";
import { FC } from "react";
import st from "./backButton.module.scss";

interface IBackBtn {
	link: string;
}

const BackBtn: FC<IBackBtn> = ({ link }) => {
	const router = useRouter();

	return (
		<div className={st.backBtn} onClick={() => router.push(link)}>
			<svg
				width="14"
				height="12"
				viewBox="0 0 14 12"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M5.83333 10.0834L1.75 6.00002M1.75 6.00002L5.83333 1.91669M1.75 6.00002H12.25"
					stroke="#2F2F2F"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</div>
	);
};

export default BackBtn;
