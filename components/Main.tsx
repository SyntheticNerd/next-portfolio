import { useRouter } from "next/router";
import React, { useEffect } from "react";
import AboutMe from "./aboutMe/aboutMe";
import Featured from "./featured/featured";
import Intro from "./intro/intro";
import Background from "./layout/background/background";
import MidBackground from "./layout/background/midBackground";
import { Element as ScrollElement, scroller } from "react-scroll";
import { useAppDispatch } from "../features/store";
import { setOpenResume } from "../features/ui/uiSlice";
import Contact from "./contact/contact";
import Footer from "./layout/footer/footer";

const scrollPoints = ["home", "projects", "about-me", "contact"];

const Main = () => {
	const router = useRouter();
	const slugs = router.query.slug;
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (slugs) {
			console.log(slugs);
			if (typeof slugs !== "string") {
				slugs.forEach((slug: string) => {
					if (slug === "resume") {
						dispatch(setOpenResume(true));
					} else if (scrollPoints.indexOf(slug) > -1) {
						scroller.scrollTo(slug, {
							duration: 800,
							delay: 0,
							smooth: "ease",
							offset: 0,
						});
					} else {
						console.log("MAYBE WE SHOULD 404???");
					}
				});
			}
		} else
			scroller.scrollTo("home", {
				duration: 800,
				delay: 0,
				smooth: "ease",
				offset: 0,
			});
	}, []);
	return (
		<main>
			<Background>
				<ScrollElement name="home">
					<Intro />
				</ScrollElement>
				<MidBackground>
					<ScrollElement name="projects">
						<Featured />
					</ScrollElement>
					<ScrollElement name="about-me">
						<AboutMe />
					</ScrollElement>
				</MidBackground>
				<ScrollElement name="contact">
				<Contact />
				</ScrollElement>
				<Footer />
			</Background>
		</main>
	);
};

export default Main;
