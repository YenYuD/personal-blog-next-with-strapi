import CardWrapper from '@/components/custom/CardWrapper';
import { ArticlesService } from '@/service/server/articleService';
import ReactMarkdown from 'react-markdown';
import type { Metadata } from 'next';
import { langaugeMapping } from '@/constants/uiConfig';
import { processSearchParams } from '@/service/utils/processSearchParams';

export const metadata: Metadata = {
	title: 'Emily.dev | Blog',
	description: '...',
};

export async function generateStaticParams() {
	const languages = ['en', 'zh-TW'];

	return languages.map((lang) => ({
		lang,
	}));
}

async function Articles({ lang }: { lang: string }) {
	const { data: articles } = await ArticlesService.getArticles(
		processSearchParams({
			locale: langaugeMapping[lang as keyof typeof langaugeMapping],
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
	params: { lang: string };
}) {
	return (
		<div className="flex flex-col gap-4">
			<Articles lang={lang} />
		</div>
	);
}
