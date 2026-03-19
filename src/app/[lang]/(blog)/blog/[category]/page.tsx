import type { Metadata } from 'next';
import type { ArticleType, Language } from '@/service/type';
import { Separator } from '@/components/ui/separator';
import { siteTitle } from '@/constants/uiConfig';
import { capitalize } from '@/lib/capitalize';
import { BlogSideBar } from '@/containers/layouts';
import { Suspense } from 'react';
import { LoadingSkeleton } from '@/components/custom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getAllPosts } from '@/utils/readMarkdown';
import Articles from '@/containers/Articles';

export async function generateMetadata({
	params: { category },
}: {
	params: {
		category: string;
	};
}): Promise<Metadata> {
	return {
		title: category ? `${siteTitle} | Blog | ${capitalize(category)} ` : `${siteTitle} | Blog`,
	};
}

// Enable ISR - revalidate every hour
export const revalidate = 3600;

// Allow dynamic params for new categories
export const dynamicParams = true;

export async function generateStaticParams() {
	const categories = ['all', 'frontend', 'uncategorized'];
	const languages = ['en-US', 'zh-TW'];

	return languages.flatMap((language) =>
		categories.map((category) => ({
			lang: language,
			category,
		})),
	);
}

function BlogContent({
	displayedText,
	articles,
}: {
	displayedText: string;
	articles: ArticleType[];
}) {
	const text = displayedText === 'all' ? 'All Articles' : capitalize(displayedText);

	return (
		<ScrollArea className="flex-1">
			<h2 className="text-4xl text-primary py-2">{text}</h2>
			<Separator className="w-full" />
			<div className="flex flex-col gap-4 mt-2">
				<Articles articles={articles} />
			</div>
		</ScrollArea>
	);
}

export default async function BlogPage({
	params: { lang, category },
}: {
	params: { lang: Language; category: string };
}) {
	const posts = await getAllPosts(lang, category);

	return (
		<div className="mx-auto w-full h-full max-w-6xl pt-[5rem] flex flex-col md:flex-row gap-6 lg:gap-12 p-4">
			<BlogSideBar lang={lang} />
			<Suspense fallback={<LoadingSkeleton />}>
				<BlogContent displayedText={category} articles={posts} />
			</Suspense>
		</div>
	);
}
