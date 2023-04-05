import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactTyped from "react-typed";
import useMousePosition from "../../utils/hooks/useMousePosition";
import BorderWrapper from "../props/borderWrapper";
import classes from "./intro.module.scss";
import Ticker from "./ticker";
import GoldBtn from "../props/goldBtn";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../features/store";
import { setOpenResume, windowSizeState } from "../../features/ui/uiSlice";

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
	const [cardHover, setCardHover] = useState(false);
	const [buttonHover, setButtonHover] = useState(false);
	const introRef = useRef<HTMLDivElement>(null);
	const [introWidth, setIntroWidth] = useState(500);
	const mousePosition = useMousePosition(introRef);
	const router = useRouter();
	const dispatch = useAppDispatch();
	const screenSize = useAppSelector(windowSizeState)

	useEffect(() => {
		if (introRef.current) {
			setIntroWidth(introRef.current.clientWidth);
		}
	});

	const [showButton, setShowButton] = useState(false);

	useEffect(() => {
		setShowButton(true);
	}, []);

	const bounceAnimation = {
		y: [0, -30, 0, -20, 0, -5, 0, 0, 0, 0, 0, 0, 0, 0],
		transition: {
			repeat: Infinity,
			type: "spring",
			stiffness: 100,
			damping: 5,
			mass: 1.5,
			velocity: 10,
			restSpeed: 0.001,
			duration: 5,
		},
	};
	return (
		<div className={classes.introWrapper}>
			<motion.div
				ref={introRef}
				style={{}}
				className={classes.animatedWrapper}
				onMouseEnter={() => setCardHover(true)}
				onMouseLeave={() => setCardHover(false)}
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
								backDelay={2000}
								loop
							/>
						</h2>
					</div>
				</BorderWrapper>
			</motion.div>
			<AnimatePresence>
				{showButton && (
					<motion.div
						style={{ position: "relative" }}
						initial={{ y: 1000 }}
						animate={{ y: 0 }}
						transition={{
							duration: 3,
							type: "spring",
							stiffness: 100,
							damping: 15,
						}}
					>
						<motion.div
							animate={!buttonHover ? bounceAnimation : "none"}
							transition={
								!buttonHover
									? bounceAnimation.transition
									: {
											repeat: 0,
									  }
							}
							onMouseEnter={() => setButtonHover(true)}
							onMouseLeave={() => setButtonHover(false)}
						>
							<GoldBtn
								onClick={() => {
									let newPath = router.asPath;
									if (!newPath.includes("resume")) {
										newPath =
											router.asPath.slice(-1) === "/"
												? router.asPath + "resume"
												: router.asPath + "/resume";
										router.push(newPath, undefined, { scroll: false });
										// dispatch(setOpenResume(true));
									} else {
										dispatch(setOpenResume(true));
									}
								}}
								borderStyle={{ marginBottom: "5vh" }}
								borderClass={classes.specialResumeBtn}
							>
								Download Resume
							</GoldBtn>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
			<Ticker baseVelocity={-3}>
				{skillList.map((skill) => (
					<p key={skill}>{skill}</p>
				))}
			</Ticker>
		</div>
	);
};

export default Intro;
