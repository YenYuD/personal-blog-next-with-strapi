import type { Metadata } from 'next';
import type { ArticleType, CategoryType, Language } from '@/service/type';
import { Separator } from '@/components/ui/separator';
import { CategoryService } from '@/service/server/categoryService';
import { siteTitle } from '@/constants/uiConfig';
import { processSearchParams } from '@/service/utils/processSearchParams';
import { mapLanguageParam } from '@/service/utils/langaugeMapping';
import Articles from '@/containers/Articles';
import { capitalize } from '@/lib/capitalize';
import { BlogSideBar } from '@/containers/layouts';
import { UiService } from '@/service/server/uiService';
import { Suspense } from 'react';
import { LoadingSkeleton } from '@/components/custom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getAllPosts } from '@/utils/readMarkdown'

async function fetchCategoryInfo(lang: Language, category: string): Promise<CategoryType | null> {
	const { data: categoryInfo } = await CategoryService.getCategories(
		processSearchParams({
			locale: mapLanguageParam(lang),
			filters: {
				path: {
					$eq: category,
				},
			},
		}),
	);

	return categoryInfo.length ? categoryInfo[0] : null;
}

export async function generateMetadata({
	params: { lang, category },
}: {
	params: {
		lang: Language;
		category: string;
	};
}): Promise<Metadata> {
	const categoryInfo = await fetchCategoryInfo(lang, category);

	return {
		title: categoryInfo
			? `${siteTitle} | Blog | ${capitalize(categoryInfo.attributes.name)} `
			: `${siteTitle} | Blog`,
	};
}

export async function generateStaticParams() {
	const categories = (
		await CategoryService.getCategories(
			processSearchParams({
				fields: ['name'],
			}),
		)
	).data
		.map((category) => category.attributes.name)
		.concat('all');

	const languages = (
		await UiService.getLanguages(
			processSearchParams({
				fields: ['value'],
			}),
		)
	).data.map((lang) => lang.attributes.value);

	return languages.flatMap((lang) =>
		categories.map((category) => ({
			lang,
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

	const text = displayedText === 'all' ? 'All Articles' : capitalize(displayedText)

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
	const posts = await getAllPosts(lang, category)

	return (
		<div className="mx-auto w-full h-full max-w-6xl pt-[5rem] flex flex-col md:flex-row gap-6 lg:gap-12 p-4">
			<BlogSideBar lang={lang} />
			<Suspense fallback={<LoadingSkeleton />}>
				<BlogContent displayedText={category} articles={posts} />
			</Suspense>
		</div>
	);
}
