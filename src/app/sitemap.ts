import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/utils/readMarkdown';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_LINK || 'http://localhost:5678';
	const languages = ['en-US', 'zh-TW'];
	const categories = ['all', 'frontend', 'uncategorized'];

	// Static pages
	const staticPages: MetadataRoute.Sitemap = languages.flatMap((lang) => [
		{
			url: `${baseUrl}/${lang}`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1.0,
		},
		...categories.map((category) => ({
			url: `${baseUrl}/${lang}/blog/${category}`,
			lastModified: new Date(),
			changeFrequency: 'weekly' as const,
			priority: 0.8,
		})),
	]);

	// Dynamic blog post pages
	const postPages: MetadataRoute.Sitemap = [];

	for (const lang of languages) {
		try {
			const posts = await getAllPosts(lang);

			for (const post of posts) {
				if (post.attributes.visibility) {
					postPages.push({
						url: `${baseUrl}/${lang}/blog/${post.attributes.category}/${post.attributes.slug}`,
						lastModified: new Date(post.attributes.publish_at || Date.now()),
						changeFrequency: 'monthly',
						priority: 0.7,
					});
				}
			}
		} catch (error) {
			console.error(`Error generating sitemap for language ${lang}:`, error);
		}
	}

	return [...staticPages, ...postPages];
}
