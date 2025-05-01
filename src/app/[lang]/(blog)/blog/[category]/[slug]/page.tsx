import type { Metadata } from 'next';
import { siteTitle } from '@/constants/uiConfig';
import type { Language } from '@/service/type';
import { processDateTime } from '@/lib/processDateTime';
import { BlogSideBar } from '@/containers/layouts';
import { CldImage, Markdown } from '@/components/custom';
import { cloudinaryDomain, cloudName } from '@/components/custom/CldImage';
import { getAllPosts, getPostBySlug } from '@/utils/readMarkdown'

export async function generateMetadata({
	params: { slug, lang, category },
}: { params: { slug: string; lang: Language; category: string } }): Promise<Metadata> {
	const post = await getPostBySlug(slug, lang, category)
	const { attributes: { title = '', description = '', cover_image_path = '' } } = post

	return {
		title: `${siteTitle} | ${title}`,
		description,
		openGraph: {
			images: [
				{
					url: `${cloudinaryDomain}/${cloudName}${cover_image_path}`,
				},
			],
		},
	}
}

export async function generateStaticParams() {
	const langs = ['en-US', 'zh-TW']; // Add all supported languages
	const posts = await Promise.all(
		langs.map(async (lang) => {
			const posts = await getAllPosts(lang);
			return posts.map((post) => ({
				lang,
				category: post.attributes.category,
				slug: post.id,
			}));
		})
	);
	console.log(posts.flat());
	return posts.flat();
}

export default async function Post({ params: { slug, lang, category } }: { params: { slug: string; lang: Language; category: string } }) {
	const post = await getPostBySlug(slug, lang, category)
	const { attributes: { title = '', publish_at = '', cover_image_path = '', content = '' } } = post

	return (
		<div className="mx-auto w-full h-full max-w-6xl pt-[4rem] lg:pt-[5rem] flex flex-col md:flex-row gap-3 lg:gap-12 p-4 pb-0">
			<BlogSideBar lang={lang} />
			<article className="flex-1 overflow-y-scroll no-scrollbar pb-[10%]">
				<header>
					<h1 className="scroll-m-20 text-4xl py-2 font-extrabold tracking-tight lg:text-5xl lg:leading-[1.2]">
						{title}
					</h1>
					<p className="opacity-[0.7]">Published at {processDateTime(publish_at)}</p>
				</header>
				<figure className="w-full md:w-[80%] mx-auto mt-4 relative aspect-video mb-2">
					<CldImage
						src={cover_image_path}
						alt="cover_image"
						fill
						className="object-cover z-0"
						priority
					/>
				</figure>
				<Markdown markdown={content} />
			</article>
		</div>
	)
}
