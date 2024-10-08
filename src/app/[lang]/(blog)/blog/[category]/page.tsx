import type { Metadata } from 'next';
import type { ArticleType, CategoryType, Language } from '@/service/type';
import { ArticlesService } from '@/service/server/articleService';
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
	return (
		<div className="flex-1">
			<h2 className="text-4xl text-primary py-2">{displayedText}</h2>
			<Separator className="w-full" />
			<div className="flex flex-col gap-4 mt-2">
				<Articles articles={articles} />
			</div>
		</div>
	);
}

export default async function BlogPage({
	params: { lang, category },
}: {
	params: { lang: Language; category: string };
}) {
	const isAll = category === 'all';
	let displayedText = 'All Articles';

	const { data: articles = [] } = await ArticlesService.getArticles(
		processSearchParams({
			locale: mapLanguageParam(lang),
			populate: {
				cover_image: {
					fields: ['url', 'width', 'height', 'name', 'hash'],
				},
				category: {
					fields: ['name'],
				},
			},
			...(!isAll && {
				filters: {
					category: {
						path: {
							$eq: category,
						},
					},
				},
			}),
		}),
	);

	if (!isAll) {
		const categoryInfo = await fetchCategoryInfo(lang, category);
		if (!categoryInfo) {
			return (
				<>
					<div>
						<h2 className="text-4xl text-primary font-semibold py-2">{category}</h2>
						<div className="flex flex-col sm:grid grid-cols-2 gap-4">No articles found.</div>
					</div>
				</>
			);
		}
		displayedText = capitalize(categoryInfo.attributes.name);
	}

	return (
		<div className="mx-auto w-full h-full max-w-6xl pt-[5rem] flex flex-col md:flex-row gap-6 lg:gap-12 p-4 pb-[2.5rem]">
			<Suspense fallback={<div className="md:basis-1/4 max-w-[285px]">Loading...</div>}>
				<BlogSideBar lang={lang} />
			</Suspense>
			<Suspense fallback={<LoadingSkeleton />}>
				<BlogContent displayedText={displayedText} articles={articles} />
			</Suspense>
		</div>
	);
}
