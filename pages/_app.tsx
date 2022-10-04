import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store, wrapper } from "../store/store";
import Sidebar from "../components/sidebar";
import Head from "next/head";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Router from "next/router";

NProgress.configure({
	minimum: 0.3,
	easing: "ease",
	speed: 800,
	showSpinner: false,
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

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
