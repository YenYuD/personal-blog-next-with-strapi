import { ArticlesService } from '@/service/server/articleService';
import type { Metadata } from 'next';
import { siteTitle } from '@/constants/uiConfig';
import { processSearchParams } from '@/service/utils/processSearchParams';
import Articles from '@/containers/Articles';
import { mapLanguageParam } from '@/service/utils/langaugeMapping';
import type { Language } from '@/service/type';
import { UiService } from '@/service/server/uiService';
import { BlogSideBar } from '@/containers/layouts';

export const metadata: Metadata = {
	title: `${siteTitle} | Blog`,
	description: '...',
};

export async function generateStaticParams() {
	const languages = await UiService.getLanguages();

	return (
		languages.data.map(({ attributes: { value } }) => ({
			lang: value,
			category: 'all',
		})) ?? []
	);
}

export default async function BlogPage({
	params: { lang, category },
}: {
	params: { lang: Language; category: string };
}) {
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
			...(category !== 'all'
				? {
						filters: {
							category: {
								path: {
									$eq: category,
								},
							},
						},
					}
				: {}),
		}),
	);

	const firstCapital = category.charAt(0).toUpperCase() + category.slice(1);

	return (
		<>
			<BlogSideBar lang={lang} />
			<div>
				<h2 className="text-4xl text-primary font-semibold py-2">{firstCapital}</h2>
				<div className="flex flex-col sm:grid grid-cols-2 gap-4">
					<Articles articles={articles} />
				</div>
			</div>
		</>
	);
}
