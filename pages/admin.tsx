import { GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import ResizableMenu from "../components/admin/resizableMenu";
import Featured from "../components/featured/featured";
import Intro from "../components/intro/intro";
import Background from "../components/layout/background/background";
import Login from "../components/login/Login";
import {
	newProjects,
	updateAllProjects,
} from "../features/admin/projectsSlice";
import { useAppDispatch, useAppSelector, wrapper } from "../features/store";
import { ProjectType } from "../utils/types";

interface Props {
	session: any;
	projects: ProjectType[];
}

export default function Admin({ session, projects }: Props) {
	const dispatch = useAppDispatch();
	const projectState = useAppSelector(newProjects);
	useEffect(() => {
		// dispatch(updateAllProjects(projects));
	}, [projects, dispatch]);
	return (
		<>
			<Head>
				<title>Admin</title>
				<meta name="description" content="Synthetic Nerd Portfolio and Blog" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="admin-wrapper">
				<ResizableMenu session={session}>
					<main>
						<Background />
						<Intro />
						<Featured />
					</main>
				</ResizableMenu>
			</div>
		</>
	);
}

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async (context: GetServerSidePropsContext) => {
		const session = await getSession({ req: context.req });
		const response = await fetch(`${process.env.API_BASE_URL}/projects`);
		const projects = await response.json();

		store.dispatch(updateAllProjects(projects));

		return {
			props: {
				session,
				projects,
			},
		};
	}
);
