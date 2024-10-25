import type { Metadata } from 'next';
import { siteTitle } from '@/constants/uiConfig';
import type { Language } from '@/service/type';
import { processDateTime } from '@/lib/processDateTime';
import { ArticlesService } from '@/service/server/articleService';
import { UiService } from '@/service/server/uiService';
import { processSearchParams } from '@/service/utils/processSearchParams';
import { mapLanguageParam } from '@/service/utils/langaugeMapping';
import { BlogSideBar } from '@/containers/layouts';
import { CldImage, Markdown } from '@/components/custom';
import { cloudinaryDomain, cloudName } from '@/components/custom/CldImage';

export async function generateMetadata({
	params: { slug },
}: { params: { slug: string } }): Promise<Metadata> {
	const id = slug.split('-').pop() ?? '';
	const {
		data: { attributes: article },
	} = await ArticlesService.getArticleById(id);

	return {
		title: `${siteTitle} | ${article.title || 'Blog'}`,
		description: article.description,
		openGraph: {
			images: [
				{
					url: `${cloudinaryDomain}/${cloudName}${article.cover_image_path}`,
				},
			],
		},
	};
}

export async function generateStaticParams() {
	const languages = (
		await UiService.getLanguages(
			processSearchParams({
				fields: ['value'],
			}),
		)
	).data.map((lang) => lang.attributes.value);

	const articlePromises = languages.map((lang) =>
		ArticlesService.getArticles(
			processSearchParams({
				locale: mapLanguageParam(lang as Language),
				fields: ['id', 'locale', 'slug'],
			}),
		),
	);

	const articlesResults = await Promise.all(articlePromises);

	const paths = articlesResults.flatMap((result, index) => {
		const lang = languages[index];
		return result.data.map((article) => ({
			lang,
			category: 'post',
			slug: `${article.attributes.slug}-${article.id}`,
		}));
	});

	return paths;
}

export default async function Post({
	params: { lang, slug },
}: { params: { lang: Language; slug: string } }) {
	const id = slug.split('-').pop() ?? '';

	const {
		data: { attributes: article },
	} = await ArticlesService.getArticleById(id);

	return (
		<div className="mx-auto w-full h-full max-w-6xl pt-[5rem] flex flex-col md:flex-row gap-6 lg:gap-12 p-4 pb-0">
			<BlogSideBar lang={lang} />
			<article className="flex-1 overflow-y-scroll no-scrollbar">
				<header>
					<h1 className="scroll-m-20 text-4xl py-2 font-extrabold tracking-tight lg:text-5xl">
						{article.title}
					</h1>
					<p className="opacity-[0.7]">Published at {processDateTime(article.publish_at)}</p>
				</header>
				<figure className="w-full md:w-[80%] mx-auto mt-4 relative aspect-video mb-2">
					<CldImage
						src={article.cover_image_path}
						alt="cover_image"
						fill
						className="object-cover z-0"
						priority
					/>
				</figure>
				<Markdown markdown={article.content} />
			</article>
		</div>
	);
}
