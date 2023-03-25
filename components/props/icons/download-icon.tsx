import React from "react";

const DownloadIcon = ({
	height,
	width,
}: {
	height?: string;
	width?: string;
}) => {
	return (
		<svg
			width={height ? height : "40"}
			height={width ? width : "40"}
			viewBox="0 0 46 46"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M22.6667 32.7958C22.2889 32.7958 21.9347 32.7363 21.6042 32.6173C21.2736 32.5002 20.9667 32.3 20.6833 32.0167L10.4833 21.8167C9.96389 21.2972 9.70417 20.6361 9.70417 19.8333C9.70417 19.0306 9.96389 18.3694 10.4833 17.85C11.0028 17.3306 11.6752 17.0586 12.5007 17.034C13.328 17.0113 14.0014 17.2597 14.5208 17.7792L19.8333 23.0917V2.83333C19.8333 2.03056 20.1053 1.35717 20.6493 0.813167C21.1914 0.271056 21.8639 0 22.6667 0C23.4694 0 24.1428 0.271056 24.6868 0.813167C25.2289 1.35717 25.5 2.03056 25.5 2.83333V23.0917L30.8125 17.7792C31.3319 17.2597 32.0053 17.0113 32.8327 17.034C33.6581 17.0586 34.3306 17.3306 34.85 17.85C35.3694 18.3694 35.6292 19.0306 35.6292 19.8333C35.6292 20.6361 35.3694 21.2972 34.85 21.8167L24.65 32.0167C24.3667 32.3 24.0597 32.5002 23.7292 32.6173C23.3986 32.7363 23.0444 32.7958 22.6667 32.7958ZM5.66667 45.3333C4.10833 45.3333 2.77478 44.7789 1.666 43.6702C0.555333 42.5595 0 41.225 0 39.6667V34C0 33.1972 0.271056 32.5238 0.813167 31.9798C1.35717 31.4377 2.03056 31.1667 2.83333 31.1667C3.63611 31.1667 4.3095 31.4377 4.8535 31.9798C5.39561 32.5238 5.66667 33.1972 5.66667 34V39.6667H39.6667V34C39.6667 33.1972 39.9387 32.5238 40.4827 31.9798C41.0248 31.4377 41.6972 31.1667 42.5 31.1667C43.3028 31.1667 43.9752 31.4377 44.5173 31.9798C45.0613 32.5238 45.3333 33.1972 45.3333 34V39.6667C45.3333 41.225 44.7789 42.5595 43.6702 43.6702C42.5595 44.7789 41.225 45.3333 39.6667 45.3333H5.66667Z"
				fill="url(#paint0_linear_630_4)"
			/>
			<defs>
				<linearGradient
					id="paint0_linear_630_4"
					x1="22.6667"
					y1="-29.4667"
					x2="22.6667"
					y2="45.3333"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#BF953F" />
					<stop offset="0.234375" stopColor="#FCF6BA" />
					<stop offset="0.515625" stopColor="#B38728" />
					<stop offset="0.78125" stopColor="#FBF5B7" />
					<stop offset="1" stopColor="#AA771C" />
				</linearGradient>
			</defs>
		</svg>
	);
};

export default DownloadIcon;
