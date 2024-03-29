import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Main from "../components/Main";
import { updateAllProjects } from "../features/admin/projectsSlice";
import { wrapper } from "../features/store";

export default function Home() {
	return (
		<div>
			<Head>
				<title>Synthetic Nerd</title>
				<meta name="description" content="Synthetic Nerd Portfolio and Blog" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Main />
		</div>
	);
}

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async (context: GetServerSidePropsContext) => {
		const session = await getSession({ req: context.req });

		try {
			const response = await fetch(`${process.env.API_BASE_URL}/projects`);
			const projects = await response.json();
			store.dispatch(updateAllProjects(projects));
			return {
				props: {
					session,
					error: false,
				},
			};
		} catch (err) {
			return {
				props: {
					session,
					error: err,
				},
			};
		}
	}
);
