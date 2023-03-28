import { GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import ResizableMenu from "../components/admin/resizableMenu";


import { updateAllProjects } from "../features/admin/projectsSlice";
import { wrapper } from "../features/store";
import { ProjectType } from "../utils/types";

interface Props {
	session: any;
	projects: ProjectType[];
	err: any;
}

export default function Admin({ session }: Props) {
	return (
		<>
			<Head>
				<title>Admin</title>
				<meta name="description" content="Synthetic Nerd Portfolio and Blog" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="admin-wrapper">
				<ResizableMenu session={session}>
				</ResizableMenu>
			</div>
		</>
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
