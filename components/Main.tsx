import { useRouter } from "next/router";
import React, { useEffect } from "react";
import AboutMe from "./aboutMe/aboutMe";
import Featured from "./featured/featured";
import Intro from "./intro/intro";
import Background from "./layout/background/background";
import MidBackground from "./layout/background/midBackground";
import { Element as ScrollElement, scroller } from "react-scroll";
import { useAppDispatch, useAppSelector } from "../features/store";
import { openResumeState, setOpenResume } from "../features/ui/uiSlice";
import Contact from "./contact/contact";
import Footer from "./layout/footer/footer";

const scrollPoints = ["home", "projects", "about-me", "contact"];

const Main = () => {
	const router = useRouter();
	const slugs = router.query.slug;
	const dispatch = useAppDispatch();
	const resumeOpen = useAppSelector(openResumeState);
	useEffect(() => {
		if (slugs) {
			if (typeof slugs !== "string") {
				slugs.forEach((slug: string) => {
					console.log(slug);
					if (slug === "resume") {
						console.log("IN HERE");
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
	}, [slugs]);

	return (
		<main>
			<div id="modal-portal" />
			<Background>
				<ScrollElement name="home" />
				<Intro />
				<MidBackground style={{ zIndex: "1" }}>
					<ScrollElement name="projects">
						<Featured />
					</ScrollElement>
					<ScrollElement name="about-me">
						<AboutMe />
					</ScrollElement>
				</MidBackground>
				<ScrollElement name="contact" style={{ zIndex: "0" }}>
					<Contact />
				</ScrollElement>
				<Footer />
			</Background>
		</main>
	);
};

export default Main;
