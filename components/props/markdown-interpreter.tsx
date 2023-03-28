import React from "react";
import ReactMarkdown, { Components } from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import mainCode from "react-syntax-highlighter/dist/cjs/styles/prism/pojoaque";
import inlineCode from "react-syntax-highlighter/dist/cjs/styles/prism/pojoaque";
import Image from "next/image";
import remarkGfm from "remark-gfm";

interface MarkdownElement {
	type: string;
	tagName?: string;
	properties?: Object & { src: string; alt: string };
}

const MarkdownInterpreter = ({ body }: { body: string }) => {
	const components: Components = {
		ul(unorderedList) {
			return <ul>{unorderedList.children}</ul>;
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
				<SyntaxHighlighter style={mainCode} language={language}>
					{retypedChildren}
				</SyntaxHighlighter>
			);
		},
	};
	return (
		<ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
			{body}
		</ReactMarkdown>
	);
};

export default MarkdownInterpreter;
