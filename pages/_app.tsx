import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/layout";

import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "../features/store";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<Layout>
				<Head>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
				</Head>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}

export default MyApp;
