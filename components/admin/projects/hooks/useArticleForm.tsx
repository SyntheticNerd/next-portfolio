import { useState } from "react";
import { ArticleType, ProjectType } from "../../../../utils/types";

export interface ArticleHook {
	article: ArticleType;
	setArticleBody: (articleBody: string) => void;
}

export const useArticleForm = (project?: ProjectType) => {
	const [articleBody, setArticleBody] = useState(
		project ? (project.article ? project.article.articleBody : "") : ""
	);
	const article = { articleBody };
	return { article, setArticleBody } as ArticleHook;
};
