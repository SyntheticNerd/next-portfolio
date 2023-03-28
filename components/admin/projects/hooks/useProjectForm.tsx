import { useS3Upload } from "next-s3-upload";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { technologies } from "../../../../utils/dummyData";
import { useImgFileHandler } from "../../../../utils/hooks/useImageHandler";
import { ProjectType } from "../../../../utils/types";

export const useProjectForm = (project?: ProjectType) => {
	const router = useRouter();
	const [collapseTechUsed, setCollapseTechUsed] = useState(true);
	const [creating, setCreating] = useState(false);

	const [title, setTitle] = useState<string>(project ? project.title : "");
	const [body, setBody] = useState<string>(project ? project.body : "");
	const [github, setGithub] = useState<string>(project ? project.github : "");
	const [liveSite, setLiveSite] = useState<string>(
		project ? project.liveSite : ""
	);

	const desktopImg = useImgFileHandler(project ? project.deskImgUrl : "");
	const tabletImg = useImgFileHandler(project ? project.tabletImgUrl : "");
	const mobileImg = useImgFileHandler(project ? project.mobileImgUrl : "");

	const [techSelected, setTechSelected] = useState<string[]>(
		project ? project.techSelected : []
	);
	const [otherTech, setOtherTech] = useState<string>("");
	const [techOptions, setTechOptions] = useState(technologies);
	//TODO I think if a custom tech option is added it will exist on the project but not persist in the tech option
	const [alignLeft, setAlignLeft] = useState(
		project ? project.alignLeft : true
	);
	const [featured, setFeatured] = useState(project ? project.featured : false);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const addOtherTechHandler = () => {
		if (techOptions.indexOf(otherTech) >= 0) {
			addTechHandler(otherTech);
		} else {
			setTechOptions((old) => [...old, otherTech]);
			setTechSelected((old) => [...old, otherTech]);
		}
		setOtherTech("");
	};

	const addTechHandler = (tech: string) => {
		if (techSelected.indexOf(tech) < 0) {
			setTechSelected((old) => [...old, tech]);
		} else {
			setTechSelected((old) => old.filter((item) => item !== tech));
		}
	};

	let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

	const resetForm = () => {
		setTitle("");
		setBody("");
		setGithub("");
		setLiveSite("");
		desktopImg.reset();
		tabletImg.reset();
		mobileImg.reset();
		setTechSelected([]);
		setAlignLeft(true);
		setFeatured(false);
	};

	return {
		collapseTechUsed,
		setCollapseTechUsed,
		creating,
		setCreating,
		title,
		setTitle,
		body,
		setBody,
		github,
		setGithub,
		liveSite,
		setLiveSite,
		desktopImg,
		tabletImg,
		mobileImg,
		techSelected,
		setTechSelected,
		otherTech,
		setOtherTech,
		techOptions,
		setTechOptions,
		alignLeft,
		setAlignLeft,
		featured,
		setFeatured,
		FileInput,
		openFileDialog,
		uploadToS3,
		addOtherTechHandler,
		addTechHandler,
		resetForm,
		loading,
		setLoading,
	};
};
