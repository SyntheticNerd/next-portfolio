import clsx from "clsx";
import React, { useState } from "react";
import classes from "./aboutMe.module.scss";
import Tab from "./tab";
import { AnimationControls, motion, useAnimationControls } from "framer-motion";

interface SkillType {
	[myKey: string]: { title: string; img: string }[];
}

const skills: SkillType = {
	"Front-End": [
		{ title: "JavaScript", img: "" },
		{ title: "TypeScript", img: "" },
		{ title: "HTML", img: "" },
		{ title: "CSS", img: "" },
		{ title: "React", img: "" },
		{ title: "Next.JS", img: "" },
		{ title: "Redux", img: "" },
		{ title: "Redux Toolkit", img: "" },
		{ title: "UX Design", img: "" },
		{ title: "Figma", img: "" },
		{ title: "Adobe XD", img: "" },
		{ title: "Photoshop", img: "" },
		{ title: "Illustrator", img: "" },
	],
	"Back-End": [
		{ title: "Python", img: "" },
		{ title: "Django", img: "" },
		{ title: "Node", img: "" },
		{ title: "Express", img: "" },
		{ title: "Webpack", img: "" },
		{ title: "MongoDB", img: "" },
		{ title: "Mongoose", img: "" },
		{ title: "SQL", img: "" },
		{ title: "MySql", img: "" },
		{ title: "Sequelize", img: "" },
		{ title: "PostgreSQL", img: "" },
		{ title: "Firebase", img: "" },
		{ title: "RT/Storage DB", img: "" },
		{ title: "Cloud Functions", img: "" },
		{ title: "SDK", img: "" },
	],
	"Game-Dev": [
		{ title: "C++", img: "" },
		{ title: "Unreal Engine", img: "" },
		{ title: "C#", img: "" },
		{ title: "Unity", img: "" },
		{ title: "DirectX", img: "" },
		{ title: "OpenGL", img: "" },
		{ title: "GameMaker Studio", img: "" },
	],
	Tools: [
		{ title: "AWS", img: "" },
		{ title: "Amplify", img: "" },
		{ title: "Lambda", img: "" },
		{ title: "CloudFront", img: "" },
		{ title: "Docker", img: "" },
		{ title: "Kubernetes", img: "" },
		{ title: "Agile Methodologies", img: "" },
	],
};

const MySkills = () => {
	const filePosition = [...Object.keys(skills)];
	const [fileElevation, setFileElevation] = useState([...Object.keys(skills)]);
	const file1Controls = useAnimationControls();
	const file2Controls = useAnimationControls();
	const file3Controls = useAnimationControls();
	const file4Controls = useAnimationControls();
	const controlArray = [
		file1Controls,
		file2Controls,
		file3Controls,
		file4Controls,
	];

	const handleFileChange = (category: string) => {
		const newTop = filePosition.indexOf(category);
		const oldTop = filePosition.indexOf(fileElevation[0]);
		const _fileEle = fileElevation.filter((file) => file !== category);
		_fileEle.unshift(category);

		_fileEle.forEach((ele, i) => {
			if (i === 0) {
				controlArray[filePosition.indexOf(ele)].start({
					x: ["0%", "-105%", "-105%", "0%"],
					rotate: [0, -5, -5, 0, 0],
					zIndex: 5,
					y: "0%",
					transition: {
						duration: 1.5,
						zIndex: { delay: 1 },
					},
				});
			} else {
				controlArray[filePosition.indexOf(ele)].start({
					zIndex: 5 - i,
					y: `-${i * 3}%`,
					transition: {
						duration: 1.5,
						zIndex: { delay: 1 },
					},
				});
			}
		});
		setFileElevation(_fileEle);
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
					initial={{ y: `-${i * 3}%` }}
					animate={controlArray[i]}
					transition={{ duration: 2 }}
				>
					<Tab onClick={() => handleFileChange(category)}>
						<h3>{category}</h3>
					</Tab>
					<div className={classes.skillWrapper}>
						{skills[category].map((skill, i) => (
							<div className={classes.skill} key={i}>
								<div className={classes.sizer} />
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
