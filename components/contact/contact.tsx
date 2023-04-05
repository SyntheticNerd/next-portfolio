import React, { useEffect, useRef, useState } from "react";
import { sendForm } from "@emailjs/browser";
import classes from "./contact.module.scss";
import BorderWrapper from "../props/borderWrapper";
import clsx from "clsx";
import GoldBtn from "../props/goldBtn";
import LoadingSpinner from "../props/loadingSpinner";
import ReactTyped from "react-typed";
import { motion, AnimatePresence } from "framer-motion";
import { Parallax } from "react-scroll-parallax";
import { useAppSelector } from "../../features/store";
import { windowSizeState } from "../../features/ui/uiSlice";

const validateEmail = (email: string) => {
	const reg =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return reg.test(email);
};

const Contact = () => {
	const formRef = useRef<HTMLFormElement>(null);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [nameError, setNameError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [messageError, setMessageError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [sendError, setSendError] = useState(false);
	const [attempted, setAttempted] = useState(false);
	const [to, setTo] = useState<NodeJS.Timeout>();

	useEffect(() => {
		if (attempted && !loading) {
			const _to = setTimeout(() => {
				if (!sendError) {
					setName("");
					setEmail("");
					setMessage("");
				}
				setSendError(false);
				setAttempted(false);
			}, 8000);
			setTo(_to);
		}
		return clearTimeout(to);
	}, [loading]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (name.length <= 0) {
			setNameError(true);
		} else {
			setNameError(false);
		}
		if (message.length <= 0) {
			setMessageError(true);
		} else {
			setMessageError(false);
		}
		if (!validateEmail(email)) {
			setEmailError(true);
		} else {
			setEmailError(false);
		}

		if (
			validateEmail(email) &&
			name.length > 0 &&
			email.length > 0 &&
			message.length > 0 &&
			formRef.current !== null
		) {
			setLoading(true);
			setAttempted(true);
			sendForm(
				process.env.NEXT_PUBLIC_EMAILJS_SERVICE!,
				process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE!,
				formRef.current,
				process.env.NEXT_PUBLIC_EMAILJS_KEY!
			).then(
				(result) => {
					setLoading(false);
					setSendError(false);
				},
				(error) => {
					setLoading(false);
					setSendError(true);
				}
			);
		}
	};

	const container = useRef<HTMLDivElement>(null);

	const [topOffset, setTopOffset] = useState(0);

	useEffect(() => {
		if (container.current) {
			console.log(
				container.current.getBoundingClientRect().top + window.pageYOffset
			);
			setTopOffset(
				container.current.getBoundingClientRect().top +
					window.pageYOffset -
					container.current.clientHeight
			);
		}
	}, [container]);

	const scrollStart = topOffset - 600;
	const scrollEnd = topOffset - 0;

	return (
		<div
			className={classes.formWrapper}
			ref={container}
		>
			<Parallax
				translateY={[-250, 0]}
				opacity={[0, 1]}
				startScroll={scrollStart}
				endScroll={scrollEnd}
			>
				<BorderWrapper
					style={{ boxShadow: "var(--nav-bar-shadow)", width: "100%" }}
					borderSize="3px"
				>
					<form onSubmit={handleSubmit} ref={formRef} noValidate>
						{attempted && (
							<div className={classes.loadingOverlay}>
								<AnimatePresence>
									{loading ? (
										<>
											<LoadingSpinner />
											<p>
												Sending
												<ReactTyped
													strings={["..."]}
													typeSpeed={200}
													backSpeed={200}
													showCursor={false}
													loop
												/>
											</p>
										</>
									) : sendError ? (
										<div className={classes.wentWrong}>
											<h2>Sending Failed</h2>
											<p>Apologize.</p>
											<p>Please try again later or reach out to me on </p>
											<a
												href="https://www.linkedin.com/in/andrew-schroepfer/"
												target="_blank"
												rel="noreferrer"
											>
												LinkedIn
											</a>
										</div>
									) : (
										<>
											<motion.h2
												initial={{ opacity: 0, scale: 0.1 }}
												animate={{ opacity: 1, scale: 2 }}
												exit={{ opacity: 0 }}
												style={{ color: "var(--success)" }}
												transition={{ duration: 3 }}
											>
												SUCCESS
											</motion.h2>
										</>
									)}
								</AnimatePresence>
							</div>
						)}
						<h2>Feel Like Chatting?</h2>

						<div className={classes.flexBox}>
							<div
								className={clsx(
									classes.inputContainer,
									name.length > 0 ? classes.notEmpty : ""
								)}
							>
								<BorderWrapper
									borderSize="2px"
									borderRadius="4px"
									borderClass={classes.borderClass}
								>
									<label htmlFor="name">Name</label>
								</BorderWrapper>
								<p
									className={clsx(
										classes.helper,
										nameError ? classes.error : ""
									)}
								>
									(required)
								</p>
								<input
									value={name}
									onChange={(e) => setName(e.target.value)}
									type="text"
									name="name"
									id="name"
								/>
							</div>
							<div
								className={clsx(
									classes.inputContainer,
									email.length > 0 ? classes.notEmpty : ""
								)}
							>
								<BorderWrapper
									borderSize="2px"
									borderRadius="4px"
									borderClass={classes.borderClass}
								>
									<label htmlFor="email">Email</label>
								</BorderWrapper>
								<p
									className={clsx(
										classes.helper,
										emailError ? classes.error : ""
									)}
								>
									{emailError ? "Please use a valid email" : "(required)"}
								</p>
								<input
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									type="email"
									name="email"
									id="email"
								/>
							</div>
						</div>
						<div
							className={clsx(
								classes.textAreaContainer,
								message.length > 0 ? classes.notEmpty : ""
							)}
						>
							<BorderWrapper
								borderSize="2px"
								borderRadius="4px"
								borderClass={classes.borderClass}
							>
								<label htmlFor="message">Message</label>
							</BorderWrapper>
							<p
								className={clsx(
									classes.helper,
									messageError ? classes.error : ""
								)}
							>
								(required)
							</p>
							<textarea
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								name="message"
								id="message"
							/>
						</div>
						<GoldBtn>Send</GoldBtn>
					</form>
				</BorderWrapper>
			</Parallax>
		</div>
	);
};

export default Contact;
