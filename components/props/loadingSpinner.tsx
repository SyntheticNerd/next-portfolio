import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
	const containerVariants = {
		start: {
			rotateX: 0,
			rotateY: 0,
			rotateZ: 0,
			transition: { duration: 5, repeat: Infinity, ease: "linear" },
		},
		end: {
			rotateX: 360,
			rotateY: 360,
			rotateZ: 360,
			transition: { duration: 5, repeat: Infinity, ease: "linear" },
		},
	};
	const insideContainerVariants = {
		start: {
			rotateX: 0,
			rotateY: 0,
			rotateZ: 0,
			transition: { duration: 3, repeat: Infinity, ease: "linear" },
		},
		end: {
			rotateX: -360,
			rotateY: -360,
			rotateZ: -360,
			transition: { duration: 3, repeat: Infinity, ease: "linear" },
		},
	};

	const faceVariants = {
		start: {
			opacity: 0,
			transition: { ease: "linear", duration: 1.5 },
		},
		end: {
			opacity: 1,
			transition: { ease: "linear", duration: 1.5 },
		},
	};

	return (
		<div style={{ position: "relative", width: "100px", height: "100px" }}>
			<motion.div
				variants={containerVariants}
				initial="start"
				animate="end"
				style={{
					width: "100px",
					height: "100px",
					// position: "relative",
					perspective: "800px",
					transformStyle: "preserve-3d",
					position: "absolute",
				}}
			>
				<motion.div
					variants={faceVariants}
					style={{
						position: "absolute",
						width: "100%",
						height: "100%",
						border: "2px solid var(--goldish)",
						transform: "translateZ(50px)",
					}}
				/>
				<motion.div
					variants={faceVariants}
					style={{
						position: "absolute",
						width: "100%",
						height: "100%",
						border: "2px solid var(--goldish)",
						transform: "rotateY(90deg) translateZ(50px)",
					}}
				/>
				<motion.div
					variants={faceVariants}
					style={{
						position: "absolute",
						width: "100%",
						height: "100%",
						border: "2px solid var(--goldish)",
						transform: "rotateY(180deg) translateZ(50px)",
					}}
				/>
				<motion.div
					variants={faceVariants}
					style={{
						position: "absolute",
						width: "100%",
						height: "100%",
						border: "2px solid var(--goldish)",
						transform: "rotateY(-90deg) translateZ(50px)",
					}}
				/>
				<motion.div
					variants={faceVariants}
					style={{
						position: "absolute",
						width: "100%",
						height: "100%",
						border: "2px solid var(--goldish)",
						transform: "rotateX(90deg) translateZ(50px)",
					}}
				/>
				<motion.div
					variants={faceVariants}
					style={{
						position: "absolute",
						width: "100%",
						height: "100%",
						border: "2px solid var(--goldish)",
						transform: "rotateX(-90deg) translateZ(50px)",
					}}
				/>
			</motion.div>
			<motion.div
				variants={insideContainerVariants}
				initial="start"
				animate="end"
				style={{
					width: "100px",
					height: "100px",
					perspective: "800px",
					transformStyle: "preserve-3d",
					position: "absolute",
					scale: "0.5",
				}}
			>
				<motion.div
					variants={faceVariants}
					style={{
						position: "absolute",
						width: "100%",
						height: "100%",
						border: "2px solid var(--goldish)",
						transform: "translateZ(50px)",
					}}
				/>
				<motion.div
					variants={faceVariants}
					style={{
						position: "absolute",
						width: "100%",
						height: "100%",
						border: "2px solid var(--goldish)",
						transform: "rotateY(90deg) translateZ(50px)",
					}}
				/>
				<motion.div
					variants={faceVariants}
					style={{
						position: "absolute",
						width: "100%",
						height: "100%",
						border: "2px solid var(--goldish)",
						transform: "rotateY(180deg) translateZ(50px)",
					}}
				/>
				<motion.div
					variants={faceVariants}
					style={{
						position: "absolute",
						width: "100%",
						height: "100%",
						border: "2px solid var(--goldish)",
						transform: "rotateY(-90deg) translateZ(50px)",
					}}
				/>
				<motion.div
					variants={faceVariants}
					style={{
						position: "absolute",
						width: "100%",
						height: "100%",
						border: "2px solid var(--goldish)",
						transform: "rotateX(90deg) translateZ(50px)",
					}}
				/>
				<motion.div
					variants={faceVariants}
					style={{
						position: "absolute",
						width: "100%",
						height: "100%",
						border: "2px solid var(--goldish)",
						transform: "rotateX(-90deg) translateZ(50px)",
					}}
				/>
			</motion.div>
		</div>
	);
};

export default LoadingSpinner;
