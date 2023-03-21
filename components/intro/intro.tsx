import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import ReactTyped from "react-typed";
import useMousePosition from "../../utils/hooks/useMousePosition";
import BorderWrapper from "../props/borderWrapper";
import classes from "./intro.module.scss";
import Ticker from "./ticker";
import GoldBtn from "../props/goldBtn";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../features/store";
import { setOpenResume } from "../../features/ui/uiSlice";

const skillList = [
	"JavaScript",
	"TypeScript",
	"HTML",
	"CSS",
	"Python",
	"C++",
	"React",
	"Next.JS",
	"Redux",
	"Redux Toolkit",
	"Node",
	"Express",
	"MongoDB",
	"Mongoose",
	"SQL",
	"MySql",
	"Sequelize",
	"Firebase",
	"UX Design",
	"Figma",
];

const Intro = () => {
	const introRef = useRef<HTMLDivElement>(null);
	const [introWidth, setIntroWidth] = useState(500);
	const mousePosition = useMousePosition(introRef);
	const router = useRouter();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (introRef.current) {
			setIntroWidth(introRef.current.clientWidth);
		}
	});

	return (
		<div className={classes.introWrapper}>
			<motion.div
				ref={introRef}
				style={{}}
				className={classes.animatedWrapper}
				animate={{
					boxShadow:
						mousePosition.x && mousePosition.y
							? `${Math.round(
									(mousePosition.x - window.screen.width / 2) * -0.03
							  )}px ${
									Math.round(
										(mousePosition.y - window.screen.height / 2) * -0.05
									) + 8
							  }px 16px rgba(0, 0, 0, 0.5)`
							: "var(--nav-bar-shadow)",
					rotateY:
						mousePosition.x && mousePosition.y
							? `${Math.round(
									(mousePosition.x - window.screen.width / 2) * 0.02
							  )}deg`
							: 0,
					rotateX:
						mousePosition.x && mousePosition.y
							? `${Math.round(
									(mousePosition.y - window.screen.height / 2) * -0.02
							  )}deg`
							: 0,
				}}
			>
				<BorderWrapper style={{ width: "100%" }}>
					<div
						className={classes.intro}
						style={{ fontSize: `${introWidth / 16}px` }}
					>
						<h1>Hello,</h1>
						<h1>
							{/* TODO Redirect to about me sectioni */}
							{/* eslint-disable-next-line react/no-unescaped-entities */}
							I'm <span className={classes.name}>Andrew</span>,
						</h1>
						<h2>
							<ReactTyped
								strings={[
									"Web Developer",
									"UX Designer",
									"Game Developer",
									"Digital Artist",
									"React Developer",
								]}
								typeSpeed={25}
								backSpeed={50}
								loop
							/>
						</h2>
					</div>
				</BorderWrapper>
			</motion.div>
			<GoldBtn
				onClick={() => {
					let newPath = router.asPath;
					if (!newPath.includes("resume")) {
						newPath =
							router.asPath.slice(-1) === "/"
								? router.asPath + "resume"
								: router.asPath + "/resume";
						router.replace(newPath, undefined, { scroll: false });
						dispatch(setOpenResume(true));
					} else {
						dispatch(setOpenResume(true));
					}
				}}
				style={{marginBottom: "5vh"}}
			>
				Download Resume
			</GoldBtn>
			<Ticker baseVelocity={-3}>
				{skillList.map((skill) => (
					<p key={skill}>{skill}</p>
				))}
			</Ticker>
		</div>
	);
};

export default Intro;
