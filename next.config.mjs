/** @type {import('next').NextConfig} */
const nextConfig = {
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: process.env.NEXT_PUBLIC_CLOUDINARY_DOMAIN?.replace('https://', '') || 'res.cloudinary.com',
			},
		],
		formats: ['image/avif', 'image/webp'],
	},
	compress: true,
	// SWC minification is enabled by default in Next.js 14+
	swcMinify: true,
	experimental: {
		// Optimize package imports to reduce bundle size
		optimizePackageImports: ['lucide-react', 'react-syntax-highlighter'],
	},
	// Enable React strict mode for better development experience
	reactStrictMode: true,
};

export default nextConfig;
