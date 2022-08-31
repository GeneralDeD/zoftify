import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store, wrapper } from '../store/store';
import Header from '../components/header';
import Sidebar from '../components/sidebar';

function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<div className="app">
				<Sidebar />
				<div className="content">
					<Header />
					<Component {...pageProps} />
				</div>
			</div>
		</Provider>
	);
}

export default wrapper.withRedux(App);
