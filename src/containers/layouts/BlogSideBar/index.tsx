import { Accordion, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { Language } from '@/service/type';
import { LinkItem } from '@/components/custom';
import MobileBlogSideBar from './MobileBlogSideBar';
import { categories, categoriesWithPostsCount } from '@/constants/uiConfig';
import { getAllPosts } from '@/utils/readMarkdown';

export default async function BlogSideBar({ lang }: { lang: Language }) {
	const allPosts = await getAllPosts(lang);
	const category = categoriesWithPostsCount(allPosts, lang);

	return (
		<div className="md:basis-1/4 max-w-[285px]">
			<div className="md:hidden">
				<MobileBlogSideBar categories={category} />
			</div>
			<div
				className="hidden md:flex md:flex-col gap-4 text-sm text-gray-500 h-full overflow-y-scroll no-scrollbar"
				x-chunk="dashboard-04-chunk-0"
			>
				<LinkItem
					className="first:text-gray-300 text-lg"
					label={'All Articles'}
					href={'/blog/all'}
				/>
				{category.map(({ id, name, path, articles }) => (
					<Accordion key={id} type="single" collapsible className="w-full">
						<AccordionItem value={name}>
							<LinkItem className="first:text-gray-300" href={`/blog/${path}`}>
								<AccordionTrigger className="tracking-widest text-lg uppercase">
									{`${name}(${articles})`}
								</AccordionTrigger>
							</LinkItem>
						</AccordionItem>
					</Accordion>
				))}
			</div>
		</div>
	);
}
