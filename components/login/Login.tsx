import Link from "next/link";
import React, { Dispatch, FormEvent, RefObject, useRef, useState } from "react";
import classes from "./login.module.scss";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import BorderWrapper from "../props/borderWrapper";
import { getSession, signIn } from "next-auth/react";

const Login = ({ setSessionState }: { setSessionState: Dispatch<any> }) => {
	const [isLogin, setIsLogin] = useState<boolean>(true);
	const usernameInputRef = useRef<HTMLInputElement>(null);
	const passwordInputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();

	function switchAuthModeHandler() {
		setIsLogin((prevState) => !prevState);
	}

	const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!usernameInputRef.current || !passwordInputRef.current) {
			return;
		}
		//optional add validation
		if (isLogin) {
			const result = await signIn("credentials", {
				redirect: false,
				username: usernameInputRef.current.value,
				password: passwordInputRef.current.value,
			});
			if (!result!.error) {
				const newSession = await getSession();
				setSessionState(newSession);
			}
		} else {
			try {
				const result = await createUser(
					usernameInputRef.current.value,
					passwordInputRef.current.value
				);
			} catch (error) {
				console.log("THIS ERROR", error);
			}
		}
	};

	async function createUser(username: string, password: string) {
		const response = await fetch("/api/auth/signup", {
			method: "POST",
			body: JSON.stringify({ username: username, password: password }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message || "Something went wrong");
		}

		return data;
	}

	return (
		<motion.div drag className={classes.loginContainer}>
			<BorderWrapper>
				<div className={classes.auth}>
					<h1>Admin Login</h1>
					<form onSubmit={submitHandler}>
						<div className={classes.control}>
							<label htmlFor="username">User Name</label>
							<input
								ref={usernameInputRef}
								type="username"
								id="username"
								required
							/>
						</div>
						<div className={classes.control}>
							<label htmlFor="password">Password</label>
							<input
								ref={passwordInputRef}
								type="password"
								id="password"
								required
							/>
						</div>
						<div className={classes.actions}>
							<button>{isLogin ? "Login" : "Create Account"}</button>
						</div>
					</form>
				</div>
			</BorderWrapper>
		</motion.div>
	);
};

export default Login;
