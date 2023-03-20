import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import Main from "../components/Main";
import { updateAllProjects } from "../features/admin/projectsSlice";
import { wrapper } from "../features/store";
import navBtnData from "../components/layout/navigation/navBtnData";

export default function Home() {
	const router = useRouter();
	const slug = router.query.slug;
	return (
		<div>
			<Head>
				<title>
					{slug
						? navBtnData.findIndex((nav) => nav.id === slug[0]) > -1
							? navBtnData[navBtnData.findIndex((nav) => nav.id === slug[0])]
									.title
							: slug[0] === "resume"
							? "Resume"
							: "Synthetic Nerd"
						: "Synthetic Nerd"}
				</title>
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
