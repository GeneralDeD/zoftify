import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store, wrapper } from "../store/store";
import Sidebar from "../components/sidebar";
import Head from "next/head";

function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Zoftify Test App</title>
				<link rel="icon" type="image/svg" href="/zoftify.svg" />
			</Head>
			<Provider store={store}>
				<div className="app">
					<Sidebar />
					<div className="content">
						<Component {...pageProps} />
					</div>
				</div>
			</Provider>
		</>
	);
}

export default wrapper.withRedux(App);
