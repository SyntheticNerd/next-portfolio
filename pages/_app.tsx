import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/layout";
import { Analytics } from "@vercel/analytics/react";

import Head from "next/head";
import { Provider } from "react-redux";
import { wrapper } from "../features/store";
import { ParallaxProvider } from "react-scroll-parallax";

function MyApp({ Component, ...rest }: AppProps) {
	const { store, props } = wrapper.useWrappedStore(rest);

	return (
		<>
		<Provider store={store}>
			<ParallaxProvider>
				<Layout>
					<Head>
						<meta
							name="viewport"
							content="width=device-width, initial-scale=1.0"
						/>
					</Head>
					<Component {...props.pageProps} />
				</Layout>
			</ParallaxProvider>
		</Provider>
		<Analytics />
		</>
	);
}

export default MyApp;
