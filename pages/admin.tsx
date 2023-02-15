import { GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import ResizableMenu from "../components/admin/resizableMenu";
import Featured from "../components/featured/featured";
import Intro from "../components/intro/intro";
import Background from "../components/layout/background/background";
import Login from "../components/login/Login";

export default function Admin({ session }: { session: any }) {
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getSession({ req: context.req });
	//this way if we are not authenticated we are incapable of getting to the profile page
	console.log("SESSION", session);
	return {
		props: {
			session,
		},
	};
}
