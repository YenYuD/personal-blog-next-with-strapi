import CardWrapper from '@/components/custom/CardWrapper';
import { ArticlesService } from '@/service/server/articleService';
import ReactMarkdown from 'react-markdown';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Emily.dev | Blog',
	description: '...',
};

export default async function Blog() {
	const { data: articles } = await ArticlesService.getArticles();

	return (
		<div className="flex flex-col gap-4">
			{articles.map((article) => (
				<CardWrapper key={article.id} title={article.attributes.title} description={''}>
					<div>
						<ReactMarkdown>{article.attributes.content}</ReactMarkdown>
					</div>
				</CardWrapper>
			))}
		</div>
	);
}
