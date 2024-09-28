import { UiService } from '@/service/server/uiService';
import { processSearchParams } from '@/service/utils/processSearchParams';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import type { Language } from '@/service/type';
import { mapLanguageParam } from '@/service/utils/langaugeMapping';
import { LinkItem } from '@/components/custom';
import MobileBlogSideBar from './MobileBlogSideBar';
import NestedAccordion from './NestedAccordion';

const SIDE_BAR_NAME = 'blog-sidebar';

function NoDataFound() {
	return <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Oops! No data found.</h4>;
}

export default async function BlogSideBar({ lang }: { lang: Language }) {
	const { data: sidebar } = await UiService.getSideBar(
		processSearchParams({
			locale: mapLanguageParam(lang),
			fields: ['title'],
			populate: ['sub.sub.articles', 'sub.categories'],
		}),
	);

	const blogSidebar = sidebar.find((item) => item.attributes.title === SIDE_BAR_NAME)?.attributes
		.sub;

	if (!blogSidebar) {
		return <NoDataFound />;
	}

	return (
		<div>
			<div className="md:hidden">
				<MobileBlogSideBar blogSidebar={blogSidebar} />
			</div>
			<div
				className="hidden md:grid gap-4 text-sm text-muted-foreground max-h-[90vh] overflow-y-scroll"
				x-chunk="dashboard-04-chunk-0"
			>
				{blogSidebar.map(({ id, sub, title, path }) => (
					<Accordion key={id} type="single" collapsible className="w-full">
						<AccordionItem value={title}>
							<AccordionTrigger className="font-bold tracking-widest uppercase">
								<LinkItem
									className="first:text-muted-foreground"
									label={title}
									href={`/blog/${path}`}
								/>
							</AccordionTrigger>
							<AccordionContent>
								<NestedAccordion subItems={sub} lang={lang} />
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				))}
			</div>
		</div>
	);
}
