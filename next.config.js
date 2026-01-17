/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["localhost"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
	paths: {
		"@/*": ["./*"],
	},
};

module.exports = nextConfig;
