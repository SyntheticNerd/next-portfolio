import React, { useState } from "react";

import classes from "./aboutMe.module.scss";
import btnClasses from "../../styles/buttons.module.scss";
import commonClasses from "../../styles/common.module.scss";
import MySkills from "./mySkills";
import GoldBtn from "../props/goldBtn";
import Modal from "../props/modal";
import BorderWrapper from "../props/borderWrapper";
import DownloadIcon from "../props/icons/download-icon";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../features/store";
import { openResumeState, setOpenResume } from "../../features/ui/uiSlice";

const AboutMe = () => {
	// const [openResume, setOpenResume] = useState(false);
	const router = useRouter();
	const openResume = useAppSelector(openResumeState);
	const dispatch = useAppDispatch();

	return (
		<div className={classes.aboutMeContainer}>
			<div className={classes.summary}>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					<h1>About Me</h1>
				</div>
				<p>
					I am a multidisciplinary developer with web development, UX
					design, and game development skills. I create customized digital
					solutions that align with my client{"'"}s brand identity, emphasizing
					agility and aesthetics. I have a broad range of technical skills,
					including proficiency in various programming languages, software
					architecture, and cloud platforms. I uses agile methodologies and
					Scrum development practices, conduct user research, and performs data
					analysis to deliver quality and efficient solutions.
				</p>
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
				>
					Download Resume
				</GoldBtn>
			</div>
			<MySkills />
			<Modal
				isOpen={openResume}
				handleClose={() => dispatch(setOpenResume(false))}
				handleOpen={() => dispatch(setOpenResume(true))}
			>
				<div className={classes.resumeWrapper}>
					<div className={classes.toolBar}>
						<BorderWrapper
							borderRadius="50%"
							borderSize="2px"
							borderClass={btnClasses.btnShadow2}
						>
							<a
								className={classes.closeBtn}
								href="/andrewSchResumePublic.pdf"
								download="andrewSchResume"
							>
								<DownloadIcon height="60%" />
							</a>
						</BorderWrapper>
						<BorderWrapper
							borderRadius="50%"
							borderSize="2px"
							borderClass={btnClasses.btnShadow2}
						>
							<button
								className={classes.closeBtn}
								onClick={() => dispatch(setOpenResume(false))}
							>
								<div />
								<div />
							</button>
						</BorderWrapper>
					</div>

					<iframe
						title="test"
						src="/andrewSchResumePublic.pdf"
						width="100%"
						height="92%"
						style={{ border: "none" }}
					/>
				</div>
			</Modal>
		</div>
	);
};

export default AboutMe;
