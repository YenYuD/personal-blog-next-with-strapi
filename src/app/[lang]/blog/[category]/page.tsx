import type { Metadata } from 'next';
import type { ArticleType, CategoryType, Language } from '@/service/type';
import { ArticlesService } from '@/service/server/articleService';
import { UiService } from '@/service/server/uiService';
import { CategoryService } from '@/service/server/categoryService';
import { siteTitle } from '@/constants/uiConfig';
import { processSearchParams } from '@/service/utils/processSearchParams';
import { mapLanguageParam } from '@/service/utils/langaugeMapping';
import Articles from '@/containers/Articles';
import { BlogSideBar } from '@/containers/layouts';
import { capitalize } from '@/lib/capitalize';

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
			? `${siteTitle} | ${capitalize(categoryInfo.attributes.name)} | Blog`
			: `${siteTitle} | Blog`,
	};
}

async function getLanguageParams() {
	const languages = await UiService.getLanguages();
	return languages.data.map(({ attributes: { value } }) => ({
		params: { lang: value, category: 'all' },
	}));
}

async function getCategoryParams(languages: { data: { attributes: { value: string } }[] }) {
	const categories = await CategoryService.getCategories(
		processSearchParams({ fields: ['name', 'path'] }),
	);
	return languages.data.flatMap(({ attributes: { value } }) =>
		categories.data.map(({ attributes: { path } }) => ({
			params: { lang: value, category: path },
		})),
	);
}

export async function generateStaticParams() {
	const languages = await UiService.getLanguages();
	return [...(await getLanguageParams()), ...(await getCategoryParams(languages))];
}

function BlogContent({
	displayedText,
	articles,
}: {
	displayedText: string;
	articles: ArticleType[];
}) {
	return (
		<div>
			<h2 className="text-4xl text-primary font-semibold py-2">{displayedText}</h2>
			<div className="flex flex-col sm:grid grid-cols-2 gap-4">
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
					<BlogSideBar lang={lang} />
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
		<>
			<BlogSideBar lang={lang} />
			<BlogContent displayedText={displayedText} articles={articles} />
		</>
	);
}
