import clsx from "clsx";
import React, { useEffect, useState } from "react";
import classes from "./aboutMe.module.scss";
import commonClasses from "../../styles/common.module.scss";
import Tab from "./tab";
import { motion, useAnimationControls, useDragControls } from "framer-motion";
import { useAppSelector } from "../../features/store";
import { windowSizeState } from "../../features/ui/uiSlice";
import Image, { StaticImageData } from "next/image";

import javascriptIcon from "./icons/javascript-icon.png";
import typescriptIcon from "./icons/typescript-icon.png";
import htmlIcon from "./icons/html-icon.png";
import cssIcon from "./icons/css-icon.png";
import reactIcon from "./icons/react-icon.png";
import nextjsIcon from "./icons/nextjs-icon.png";
import reduxIcon from "./icons/redux-icon.png";
import uxIcon from "./icons/ux-icon.png";
import figmaIcon from "./icons/figma-icon.png";
import xdIcon from "./icons/xd-icon.png";
import photoshopIcon from "./icons/photoshop-icon.png";
import illustratorIcon from "./icons/illustrator-icon.png";
import pythonIcon from "./icons/python-icon.png";
import djangoIcon from "./icons/django-icon.png";
import nodeIcon from "./icons/node-icon.png";
import expressIcon from "./icons/express-icon.png";
import webpackIcon from "./icons/webpack-icon.png";
import mongodbIcon from "./icons/mongodb-icon.png";
import mongooseIcon from "./icons/mongoose-icon.png";
import sqlIcon from "./icons/sql-icon.png";
import mysqlIcon from "./icons/mysql-icon.png";
import sequalizeIcon from "./icons/sequalize-icon.png";
import postgresqlIcon from "./icons/postgresql-icon.png";
import firebaseIcon from "./icons/firebase-icon.png";
import cplusplusIcon from "./icons/cplusplus-icon.png";
import unrealIcon from "./icons/unreal-icon.png";
import csharpIcon from "./icons/csharp-icon.png";
import unityIcon from "./icons/unity-icon.png";
import gamemakerIcon from "./icons/gamemaker-icon.png";
import awsIcon from "./icons/aws-icon.png";
import amiplifyIcon from "./icons/amiplify-icon.png";
import lambdaIcon from "./icons/lambda-icon.png";
import cloudfrontIcon from "./icons/cloudfront-icon.png";
import dockerIcon from "./icons/docker-icon.png";
import kubernetesIcon from "./icons/kubernetes-icon.png";
import agileIcon from "./icons/agile-icon.png";
import { Parallax, useParallax } from "react-scroll-parallax";

interface SkillType {
	[myKey: string]: { title: string; img: StaticImageData | null }[];
}

const skills: SkillType = {
	"Front-End": [
		{ title: "JavaScript", img: javascriptIcon },
		{ title: "TypeScript", img: typescriptIcon },
		{ title: "HTML", img: htmlIcon },
		{ title: "CSS", img: cssIcon },
		{ title: "React", img: reactIcon },
		{ title: "Next.JS", img: nextjsIcon },
		{ title: "Redux", img: reduxIcon },
		{ title: "UX Design", img: uxIcon },
		{ title: "Figma", img: figmaIcon },
		{ title: "Adobe XD", img: xdIcon },
		{ title: "", img: null },
		{ title: "", img: null },
	],
	"Back-End": [
		{ title: "Python", img: pythonIcon },
		{ title: "Django", img: djangoIcon },
		{ title: "Node", img: nodeIcon },
		{ title: "Express", img: expressIcon },
		{ title: "Webpack", img: webpackIcon },
		{ title: "MongoDB", img: mongodbIcon },
		{ title: "Mongoose", img: mongooseIcon },
		{ title: "SQL", img: sqlIcon },
		{ title: "MySql", img: mysqlIcon },
		{ title: "Sequelize", img: sequalizeIcon },
		{ title: "PostgreSQL", img: postgresqlIcon },
		{ title: "Firebase", img: firebaseIcon },
	],
	"Game-Dev": [
		{ title: "C++", img: cplusplusIcon },
		{ title: "Unreal Engine", img: unrealIcon },
		{ title: "C#", img: csharpIcon },
		{ title: "Unity", img: unityIcon },
		{ title: "GameMaker Studio", img: gamemakerIcon },
		{ title: "", img: null },
		{ title: "", img: null },
		{ title: "", img: null },
		{ title: "", img: null },
		{ title: "", img: null },
		{ title: "", img: null },
		{ title: "", img: null },
	],
	Tools: [
		{ title: "AWS", img: awsIcon },
		{ title: "Amplify", img: amiplifyIcon },
		{ title: "Lambda", img: lambdaIcon },
		{ title: "CloudFront", img: cloudfrontIcon },
		{ title: "Docker", img: dockerIcon },
		{ title: "Kubernetes", img: kubernetesIcon },
		{ title: "Agile Methodologies", img: agileIcon },
		{ title: "Photoshop", img: photoshopIcon },
		{ title: "Illustrator", img: illustratorIcon },

		{ title: "", img: null },
		{ title: "", img: null },
		{ title: "", img: null },
	],
};

// TODO: make spacing larger after width 680
const MySkills = () => {
	const experimentalModifier = 4;
	const screenSize = useAppSelector(windowSizeState);
	const filePosition = [...Object.keys(skills)];
	const [fileElevation, setFileElevation] = useState([...Object.keys(skills)]);
	const [wasDragged, setWasDragged] = useState(false);

	const file1Anim = useAnimationControls();
	const file2Anim = useAnimationControls();
	const file3Anim = useAnimationControls();
	const file4Anim = useAnimationControls();

	const file1Drag = useDragControls();
	const file2Drag = useDragControls();
	const file3Drag = useDragControls();
	const file4Drag = useDragControls();

	const controlArray = [
		{ anim: file1Anim, drag: file1Drag },
		{ anim: file2Anim, drag: file2Drag },
		{ anim: file3Anim, drag: file3Drag },
		{ anim: file4Anim, drag: file4Drag },
	];

	const handleDrag = (
		e: MouseEvent | TouchEvent | PointerEvent,
		category: string
	) => {
		const newTop = filePosition.indexOf(category);
		controlArray[newTop].drag.start(e);
	};

	const handleFileChange = (
		e: MouseEvent | TouchEvent | PointerEvent,
		category: string
	) => {
		// Give controlArray index of the file clicked
		const newTop = filePosition.indexOf(category);
		// Give controlArray index of the current top
		const oldTop = filePosition.indexOf(fileElevation[0]);
		// Start drag controls
		// If the file changed is the top file
		if (newTop === oldTop) {
			// Send File to back and bring rest forward
			fileElevation.forEach((ele, i) => {
				if (i === 0) {
					// There will be two animations one for mobile on for desktop
					controlArray[filePosition.indexOf(ele)].anim.start({
						x:
							screenSize.width <= 1074
								? ["0%", "-10%", "-10%", "0%"] //Mobile
								: ["0%", "-110%", "-110%", "0%"], //Desktop
						y:
							screenSize.width <= 1074
								? ["0%", `-140%`, `-120%`, `-${9 * experimentalModifier}%`] // Mobile
								: ["0%", "-50%", "-50%", `-${9 * experimentalModifier}%`], // Desktop
						rotate: [0, -5, -5, 0, 0],
						zIndex: 2,
						transition: {
							duration: 1.5,
							zIndex: { delay: 0.5 },
						},
					});
				} else {
					controlArray[filePosition.indexOf(ele)].anim.start({
						zIndex: 6 - i,
						y: `-${(i - 1) * 3 * experimentalModifier}%`,
						transition: {
							duration: 1.5,
							zIndex: { delay: 0.5 },
						},
					});
				}
			});
			const _fileEle = fileElevation.filter((file) => file !== category);
			_fileEle.push(category);
			setFileElevation(_fileEle);
		}
		// If the file changed is NOT the top file
		else {
			//Move it to the front and move the rest back
			const _fileEle = fileElevation.filter((file) => file !== category);
			_fileEle.unshift(category);
			_fileEle.forEach((ele, i) => {
				if (i === 0) {
					controlArray[filePosition.indexOf(ele)].anim.start({
						x:
							screenSize.width <= 1074
								? ["0%", "-10%", "-10%", "0%"] //Mobile
								: ["0%", "-110%", "-110%", "0%"], //Desktop
						y:
							screenSize.width <= 1074
								? ["0%", `-140%`, `-120%`, `0%`] // Mobile
								: ["0%", "-50%", "-50%", `0%`], // Desktop
						rotate: [0, -5, -5, 0, 0],
						zIndex: 5,
						transition: {
							duration: 1.5,
							zIndex: { delay: 0.5 },
						},
					});
				} else {
					controlArray[filePosition.indexOf(ele)].anim.start({
						zIndex: 5 - i,
						y: `-${i * 3 * experimentalModifier}%`,
						transition: {
							duration: 1.5,
							zIndex: { delay: 0.5 },
						},
					});
				}
			});
			setFileElevation(_fileEle);
		}
	};
	return (
		<div className={classes.skillFolders}>
			{filePosition.map((category, i) => (
				<motion.div
					key={category}
					className={clsx(
						classes.folder,
						classes[`elevation${fileElevation.indexOf(category)}`],
						classes[`position${i}`]
					)}
					drag
					dragListener={false}
					dragSnapToOrigin={true}
					dragElastic={0.8}
					dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
					initial={{ y: `-${i * 3 * experimentalModifier}%` }}
					animate={controlArray[i].anim}
					dragControls={controlArray[i].drag}
					transition={{ duration: 2 }}
					onDragStart={() => {
						// Track is folder was dragged
						setWasDragged(true);
					}}
					onDragEnd={(event: MouseEvent) => {
						handleFileChange(event, category);
					}}
				>
					<Tab
						onClick={(event) => {
							// If folder was dragged set drag to false,
							// DO NOT handleFileChange
							if (!wasDragged) {
								handleFileChange(event, category);
							} else {
								setWasDragged(false);
							}
						}}
						onMouseDown={(event) => {
							handleDrag(event, category);
						}}
					>
						<h3 className={commonClasses.goldText}>{category}</h3>
					</Tab>
					<div className={classes.skillWrapper}>
						{skills[category].map((skill, i) => (
							<div className={classes.skill} key={i}>
								<div className={classes.sizer}>
									{skill.img && <Image src={skill.img} alt={skill.title} />}
								</div>
								<p>{skill.title}</p>
							</div>
						))}
					</div>
				</motion.div>
			))}
		</div>
	);
};

export default MySkills;
