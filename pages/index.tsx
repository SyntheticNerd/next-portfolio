import Head from "next/head";
import Featured from "../components/featured/featured";
import Intro from "../components/intro/intro";
import Background from "../components/layout/background/background";

export default function Home() {
	return (
		<div>
			<Head>
				<title>Synthetic Nerd</title>
				<meta name="description" content="Synthetic Nerd Portfolio and Blog" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<Background />
				<Intro />
				<Featured />
			</main>
			<footer></footer>
		</div>
	);
}
