/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "syntheticnerd-portfolio.s3.us-west-1.amazonaws.com",
				port: "",
				pathname: "/next-s3-uploads/**",
			},
		],
	},
};

module.exports = nextConfig;
