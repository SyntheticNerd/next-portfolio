import React, { useState } from "react";
import BorderWrapper from "../../props/borderWrapper";
import GoldBtn from "../../props/goldBtn";
import GithubIcon from "../../props/icons/github-icon";
import classes from "./project.module.scss";
import btnClasses from "../../../styles/buttons.module.scss";
import WebpageIcon from "../../props/icons/webpage-icon";
import { ProjectType } from "../../../utils/types";
import Modal from "../../props/modal";
import MarkdownInterpreter from "../../props/markdown-interpreter";

const Summary = ({ projectData }: { projectData: ProjectType }) => {
	const { title, body, github, liveSite, article } = projectData;
	const [articleOpen, setArticleOpen] = useState(false);
	return (
		<div className={classes.summary}>
			<h2>{title}</h2>
			<p>{body}</p>
			<div>
				{projectData.article?.articleBody && (
					<BorderWrapper
						borderClass={btnClasses.btnShadow2}
						borderRadius="64px"
						borderSize="3px"
					>
						<button
							className={btnClasses.largePill}
							onClick={() => setArticleOpen(true)}
						>
							Read Article
						</button>
					</BorderWrapper>
				)}
				{github && (
					<BorderWrapper
						borderClass={btnClasses.btnShadow2}
						borderRadius="50%"
						borderSize="3px"
					>
						<a
							href={github}
							className={btnClasses.github}
							rel="noreferrer noopener"
							target="_blank"
							title="Github"
						>
							<GithubIcon />
						</a>
					</BorderWrapper>
				)}
				{liveSite && (
					<BorderWrapper
						borderClass={btnClasses.btnShadow2}
						borderRadius="50%"
						borderSize="3px"
					>
						<a
							className={btnClasses.webPage}
							href={liveSite}
							rel="noreferrer noopener"
							target="_blank"
							title="Live Site"
						>
							<WebpageIcon />
						</a>
					</BorderWrapper>
				)}
			</div>
			{articleOpen && article !== null && (
				<Modal
					isOpen={articleOpen}
					handleOpen={() => setArticleOpen(true)}
					handleClose={() => setArticleOpen(false)}
				>
					<div className={classes.article}>
						<MarkdownInterpreter body={article!.articleBody} />
					</div>
				</Modal>
			)}
		</div>
	);
};

export default Summary;
