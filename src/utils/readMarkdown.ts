import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { ArticleType } from '@/service/type';

export async function getPostBySlug(
	slug: string,
	lang: string,
	category: string,
): Promise<ArticleType> {
	let filePath: string;
	let fileContents: string;

	try {
		filePath = path.join(process.cwd(), 'posts', lang, category, `${slug}.md`);
		fileContents = fs.readFileSync(filePath, 'utf8');
	} catch (error) {
		if (lang === 'en-US') {
			// fallback to zh-TW
			filePath = path.join(process.cwd(), 'posts', 'zh-TW', category || '', `${slug}.md`);
			fileContents = fs.readFileSync(filePath, 'utf8');
		} else {
			throw error;
		}
	}
	const { data, content } = matter(fileContents);

	const post = {
		id: slug,
		attributes: {
			category: '',
			title: data.title || '',
			publish_at: data.publish_at || '',
			createdAt: data.createdAt || '',
			updatedAt: data.updatedAt || '',
			publishedAt: data.publishedAt || '',
			locale: data.locale || '',
			description: data.description || '',
			visibility: data.visibility || false,
			lang,
			content,
			slug,
			cover_image_path: data.cover_image_path || null,
		},
	};
	return post;
}

export async function getAllPosts(lang: string, category?: string): Promise<ArticleType[]> {
	let files: string[] = [];
	if (!category || category === 'all') {
		// if no category, read all posts recursively
		const dir = path.join(process.cwd(), 'posts', lang);
		const getAllFiles = (dirPath: string): string[] => {
			return fs.readdirSync(dirPath).reduce((acc, file) => {
				const fullPath = path.join(dirPath, file);
				if (fs.statSync(fullPath).isDirectory()) {
					return acc.concat(getAllFiles(fullPath));
				}
				if (file.endsWith('.md')) {
					return acc.concat(fullPath);
				}
				return acc;
			}, [] as string[]);
		};
		files = getAllFiles(dir);
	} else {
		// if specified category, read all posts in the category
		files = fs
			.readdirSync(path.join(process.cwd(), 'posts', lang, category))
			.map((file) => path.join(process.cwd(), 'posts', lang, category, file));
	}

	const posts = files.map((filePath) => {
		const slug = path.basename(filePath).replace(/\.md$/, '');
		const fileContents = fs.readFileSync(filePath, 'utf8');
		const { data, content } = matter(fileContents);

		return {
			id: slug,
			attributes: {
				category: data.category || '',
				title: data.title || '',
				publish_at: data.publish_at || '',
				createdAt: data.createdAt || '',
				updatedAt: data.updatedAt || '',
				publishedAt: data.publishedAt || '',
				locale: data.locale || '',
				description: data.description || '',
				visibility: data.visibility || false,
				lang,
				content,
				slug,
				cover_image_path: data.cover_image_path || null,
			},
		};
	});

	return posts;
}
