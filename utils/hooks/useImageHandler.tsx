import { useState } from "react";

export const useImgFileHandler = (_url?: string) => {
	let [url, setUrl] = useState<string>(_url ? _url : "");
	let [file, setFile] = useState<File>();
	let changeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.currentTarget && event.currentTarget.files) {
			let file = event.currentTarget.files[0];
			setUrl(URL.createObjectURL(file));
			setFile(file);
		}
	};
	const reset = () => {
		setUrl("");
		setFile(undefined);
	};
	return { url, file, changeHandler, reset };
};
