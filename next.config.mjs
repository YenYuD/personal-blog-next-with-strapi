/** @type {import('next').NextConfig} */
const nextConfig = {
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
