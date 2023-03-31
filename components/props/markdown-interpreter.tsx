import React, { useEffect, useMemo, useState } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import mainCode from "react-syntax-highlighter/dist/cjs/styles/prism/pojoaque";
import inlineCode from "react-syntax-highlighter/dist/cjs/styles/prism/pojoaque";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import remarkable from "remarkable";
import remarkSlug from "remark-slug";
import remarkToc from "remark-toc";
import classes from "./markdown-classes.module.scss";
import clsx from "clsx";

interface MarkdownElement {
	type: string;
	tagName?: string;
	properties?: Object & { src: string; alt: string };
}

const MarkdownInterpreter = ({ body }: { body: string }) => {
	// const [toc, setToc] = useState<any[]>([]);

	const [openToc, setOpenToc] = useState(false);

	useEffect(() => {
		console.log(openToc);
	}, [openToc]);

	const components: Components = {
		h1(h1) {
			const text = h1.children[0] as string;
			const id = text.toLowerCase().replace(/\s+/g, "-");
			return (
				<h1 id={classes.id}>
					<a href={`#${id}`}>{h1.children}</a>
				</h1>
			);
		},
		h2(h2) {
			const text = h2.children[0] as string;
			const id = text.toLowerCase().replace(/\s+/g, "-");

			return (
				<h2
					id={id}
					className={clsx(
						id === "table-of-contents"
							? openToc
								? `${classes.tableOfContents} ${classes.tocOpen}`
								: classes.tableOfContents
							: ""
					)}
					onClick={() => setOpenToc((old) => !old)}
				>
					<a href={`#${id}`}>{h2.children}</a>
				</h2>
			);
		},
		h3(h3) {
			const text = h3.children[0] as string;
			const id = text.toLowerCase().replace(/\s+/g, "-");

			return (
				<h3 id={id}>
					<a href={`#${id}`}>{h3.children}</a>
				</h3>
			);
		},
		h4(h4) {
			const text = h4.children[0] as string;
			const id = text.toLowerCase().replace(/\s+/g, "-");

			return (
				<h4 id={id}>
					<a href={`#${id}`}>{h4.children}</a>
				</h4>
			);
		},
		h5(h5) {
			const text = h5.children[0] as string;
			const id = text.toLowerCase().replace(/\s+/g, "-");

			return (
				<h5 id={id}>
					<a href={`#${id}`}>{h5.children}</a>
				</h5>
			);
		},
		h6(h6) {
			const text = h6.children[0] as string;
			const id = text.toLowerCase().replace(/\s+/g, "-");

			return (
				<h6 id={id}>
					<a href={`#${id}`}>{h6.children}</a>
				</h6>
			);
		},
		ul(unorderedList) {
			return <ul onBlur={() => setOpenToc(false)}>{unorderedList.children}</ul>;
		},
		ol(orderedList) {
			return <ol>{orderedList.children}</ol>;
		},
		li(listItem) {
			return <li style={{ marginLeft: "1em" }}>{listItem.children}</li>;
		},
		p(paragraph) {
			const { node } = paragraph;
			const element: MarkdownElement = JSON.parse(
				JSON.stringify(node.children[0])
			);
			if (element.tagName === "img") {
				return (
					<div className={""}>
						<Image
							src={element.properties!.src}
							alt={element.properties!.alt}
							width={600}
							height={300}
						/>
					</div>
				);
			}
			return <p>{paragraph.children}</p>;
		},
		code(code) {
			const { className, children, inline } = code;
			const language = className ? className!.split("-")[1] : "txt";
			let retypedChildren: string[] = JSON.parse(JSON.stringify(children));
			if (inline) {
				return (
					<SyntaxHighlighter
						style={inlineCode}
						language={language}
						customStyle={{ display: "inline", padding: "4px" }}
					>
						{retypedChildren}
					</SyntaxHighlighter>
				);
			}
			return (
				<div style={{ marginBottom: "16px" }}>
					<SyntaxHighlighter style={mainCode} language={language}>
						{retypedChildren}
					</SyntaxHighlighter>
				</div>
			);
		},
	};
	return (
		<ReactMarkdown
			components={components}
			remarkPlugins={[remarkGfm, remarkToc]}
			skipHtml={true}
			className={classes.markDown}
		>
			{body}
		</ReactMarkdown>
	);
};

export default MarkdownInterpreter;
