import Image from "next/image";
import React, { useState } from "react";
import classes from "./project.module.scss";
import { motion } from "framer-motion";
import { ProjectType } from "../../../utils/types";

interface Props {
	projectData: ProjectType;
}
const Pictures = ({ projectData }: Props) => {
	const [hover, setHover] = useState(false);
	return (
		<div
			className={classes.images}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			{projectData.deskImgUrl && (
				<motion.div className={classes.desktopImage}>
					<Image
						src={projectData.deskImgUrl}
						alt={projectData.title + " Desktop Image"}
						height={372}
						width={660}
					/>
				</motion.div>
			)}
			{projectData.tabletImgUrl && (
				<motion.div
					className={classes.tabletImage}
					animate={{
						transform: hover
							? "translateX(-90%) translateY(-5%) rotate(-20deg)"
							: "translateX(0px) translateY(0px) rotate(0deg)",
					}}
				>
					<Image
						src={projectData.tabletImgUrl}
						alt={projectData.title + " Tablet Image"}
						height={360}
						width={260}
					/>
				</motion.div>
			)}
			{projectData.mobileImgUrl && (
				<motion.div
					className={classes.cellphoneImage}
					animate={{
						transform: hover
							? "translateX(130%) translateY(-20%) rotate(20deg)"
							: "translateX(0px) translateY(0px) rotate(0deg)",
					}}
				>
					<Image
						src={projectData.mobileImgUrl}
						alt={projectData.title + " Mobile Image"}
						height={292}
						width={145}
					/>
				</motion.div>
			)}
		</div>
	);
};

export default Pictures;
