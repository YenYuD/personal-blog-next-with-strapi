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
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
};

export default nextConfig;
