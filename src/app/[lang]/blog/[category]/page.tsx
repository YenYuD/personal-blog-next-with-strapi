import type { Metadata } from 'next';
import type { Language } from '@/service/type';
import { ArticlesService } from '@/service/server/articleService';
import { UiService } from '@/service/server/uiService';
import { CategoryService } from '@/service/server/categoryService';
import { siteTitle } from '@/constants/uiConfig';
import { processSearchParams } from '@/service/utils/processSearchParams';
import { mapLanguageParam } from '@/service/utils/langaugeMapping';
import Articles from '@/containers/Articles';
import { BlogSideBar } from '@/containers/layouts';
import { capitalize } from '@/lib/capitalize';

export const metadata: Metadata = {
	title: `${siteTitle} | Blog`,
	description: '...',
};

export async function generateStaticParams() {
	const languages = await UiService.getLanguages();
	const categories = await CategoryService.getCategories(
		processSearchParams({
			fields: ['name', 'path'],
		}),
	);

	const languageParams = languages.data.map(({ attributes: { value } }) => ({
		params: {
			lang: value,
			category: 'all',
		},
	}));

	const categoryParams = languages.data.map(({ attributes: { value } }) =>
		categories.data.flatMap(({ attributes: { path } }) => ({
			params: {
				lang: value,
				category: path,
			},
		})),
	);

	return [...languageParams, ...categoryParams];
}

export default async function BlogPage({
	params: { lang, category },
}: {
	params: { lang: Language; category: string };
}) {
	const isAll = category === 'all';
	let displayedCategoryText = 'All Articles';

	const { data: articles } = await ArticlesService.getArticles(
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

		if (!categoryInfo.length) {
			return {
				notFound: true,
			};
		}

		const {
			attributes: { name },
		} = categoryInfo[0];
		displayedCategoryText = capitalize(name);
	}

	return (
		<>
			<BlogSideBar lang={lang} />
			<div>
				<h2 className="text-4xl text-primary font-semibold py-2">{displayedCategoryText}</h2>
				<div className="flex flex-col sm:grid grid-cols-2 gap-4">
					<Articles articles={articles} />
				</div>
			</div>
		</>
	);
}
