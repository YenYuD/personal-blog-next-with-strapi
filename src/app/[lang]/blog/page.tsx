import CardWrapper from '@/components/custom/CardWrapper';
import { ArticlesService } from '@/service/server/articleService';
import ReactMarkdown from 'react-markdown';
import type { Metadata } from 'next';
import { processSearchParams } from '@/service/utils/processSearchParams';
import { UiService } from '@/service/server/uiService';
import { mapLanguageParam } from '@/service/utils/langaugeMapping';
import type { Language } from '@/service/type';

export const metadata: Metadata = {
	title: 'Emily.dev | Blog',
	description: 'Hi, I am Emily, a Frontend Developer. This is my personal website.',
	openGraph: {
		images: [
			{
				url: '/portfolio.png',
				width: 1200,
				height: 630,
			},
		],
	},
};

export async function generateStaticParams() {
	const languages = await UiService.getLanguages();

	return (
		languages.data.map(({ attributes: { value } }) => ({
			params: {
				lang: value,
			},
		})) ?? []
	);
}

async function Articles({ lang }: { lang: Language }) {
	const { data: articles } = await ArticlesService.getArticles(
		processSearchParams({
			locale: mapLanguageParam(lang),
			populate: 'cover_image',
		}),
	);

	return (
		<>
			{articles.map((article) => (
				<CardWrapper key={lang} title={article.attributes.title} description={''}>
					<div>
						<ReactMarkdown>{article.attributes.content}</ReactMarkdown>
					</div>
				</CardWrapper>
			))}
		</>
	);
}

export default function Blog({
	params: { lang },
}: {
	params: { lang: Language };
}) {
	return (
		<div className="flex flex-col gap-4">
			<Articles lang={lang} />
		</div>
	);
}
