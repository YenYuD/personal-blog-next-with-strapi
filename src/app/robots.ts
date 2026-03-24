import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_LINK || 'http://localhost:5678';

	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: ['/api/', '/_next/', '/static/'],
			},
		],
		sitemap: `${baseUrl}/sitemap.xml`,
	};
}
