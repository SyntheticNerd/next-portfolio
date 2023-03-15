import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/layout";

import Head from "next/head";
import { Provider } from "react-redux";
import { wrapper } from "../features/store";

function MyApp({ Component, ...rest }: AppProps) {
	const { store, props } = wrapper.useWrappedStore(rest);

	return (
		<Provider store={store}>
			<Layout>
				<Head>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
				</Head>
				<Component {...props.pageProps} />
			</Layout>
		</Provider>
	);
}

export default MyApp;
