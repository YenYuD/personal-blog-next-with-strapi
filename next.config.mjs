/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**.herokuapp.com',
				port: '',
				pathname: '/uploads/**',
			},
		],
	},
	redirects: async () => {
		return [
			{
				source: '/',
				destination: '/en',
				permanent: true,
			},
		];
	},
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
};

export default nextConfig;
