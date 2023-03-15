import React from "react";

import classes from "./aboutMe.module.scss";

const AboutMe = () => {
	return (
		<div className={classes.aboutMeContainer}>
			<div className={classes.summary}>
				<h1>About Me</h1>
				<p>
					Andrew is a versatile digital creative with web development, UX
					design, and game development skills. He creates customized digital
					solutions that align with his client{"'"}s brand identity, emphasizing
					agility and aesthetics. Andrew has a broad range of technical skills,
					including proficiency in various programming languages, software
					architecture, and cloud platforms. He uses agile methodologies and
					Scrum development practices, conducts user research, and performs data
					analysis to deliver quality and efficient software solutions.
				</p>
			</div>
			<div className={classes.skillFolders}></div>
		</div>
	);
};

export default AboutMe;
