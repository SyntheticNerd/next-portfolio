import React, { useEffect, useRef, useState } from "react";
import formClasses from "../../../styles/forms.module.scss";
import classes from "./adminProjects.module.scss";

import clsx from "clsx";
import MarkdownInterpreter from "../../props/markdown-interpreter";

const ArticleForm = ({
	articleHook,
}: {
	articleHook: {
		article: { articleBody: string };
		setArticleBody: (body: string) => void;
	};
}) => {
	const [preview, setPreview] = useState(false);
	const [body, setBody] = useState(
		articleHook
			? articleHook.article
				? articleHook.article.articleBody
				: ""
			: ""
	);
	const [cursorPosition, setCursorPosition] = useState<number>(0);

	const bodyRef = useRef<HTMLTextAreaElement>(null);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key == "Tab") {
			e.preventDefault();
			const target = e.target as HTMLTextAreaElement;
			setBody(
				`${body.substring(0, target.selectionStart)}\t${body.substring(
					target.selectionEnd
				)}`
			);
			setCursorPosition(target.selectionStart + 1);
		}
	};

	useEffect(() => {
		if (bodyRef.current) {
			bodyRef.current.setSelectionRange(cursorPosition, cursorPosition);
		}
	}, [cursorPosition]);

	return (
		<div className={classes.articleFormWrapper}>
			<label htmlFor="article">Article</label>
			<div className={clsx(classes.articleControlPanel)}>
				<button
					className={!preview ? classes.previewActive : ""}
					type="button"
					onClick={() => setPreview(false)}
				>
					[MD]
				</button>
				<button
					className={preview ? classes.previewActive : ""}
					type="button"
					onClick={() => setPreview(true)}
				>
					Preview
				</button>
			</div>
			<div className={classes.markDownContainer}>
				{preview ? (
					<div style={{ backgroundColor: "var(--ele-3)", padding: "16px" }}>
						<MarkdownInterpreter body={body} />
					</div>
				) : (
					<div className={formClasses.inputWrapper}>
						<textarea
							ref={bodyRef}
							onKeyDown={handleKeyDown}
							onChange={(e) => {
								articleHook.setArticleBody(e.target.value);
								setBody(e.target.value);
							}}
							value={body}
							name="article"
							id="article"
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default ArticleForm;
