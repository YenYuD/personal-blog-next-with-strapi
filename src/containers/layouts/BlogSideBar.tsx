import { langaugeMapping } from '@/constants/uiConfig';
import { UiService } from '@/service/server/uiService';
import { processSearchParams } from '@/service/utils/processSearchParams';
import Link from 'next/link';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

const SIDE_BAR_NAME = 'blog-sidebar';

function LinkItem({ label, href }: { label: string; href: string }) {
	return (
		<Link className="first:font-semibold first:text-primary hover:underline leading-6" href={href}>
			{label}
		</Link>
	);
}

export default async function BlogSideBar({ lang }: { lang: string }) {
	const { data: sidebar } = await UiService.getSideBar(
		processSearchParams({
			locale: langaugeMapping[lang as keyof typeof langaugeMapping],
			fields: ['title'],
			populate: 'sub.sub.articles',
		}),
	);

	const blogSidebar = sidebar.find((item) => item.attributes.title === SIDE_BAR_NAME)?.attributes
		.sub;

	const mappedLang = langaugeMapping[lang as keyof typeof langaugeMapping];

	if (!blogSidebar)
		return (
			<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Oops! No data found.</h4>
		);

	return (
		<nav
			className="grid gap-4 text-sm text-muted-foreground max-h-[90vh] overflow-y-scroll"
			x-chunk="dashboard-04-chunk-0"
		>
			{blogSidebar?.map(({ id, sub, title }) => (
				<Accordion key={id} type="single" collapsible className="w-full">
					<AccordionItem value={title}>
						<AccordionTrigger className=" font-bold tracking-widest uppercase">
							{title}
						</AccordionTrigger>
						<AccordionContent>
							{sub.map(({ id, title, articles: { data } }) => (
								<Accordion key={id} type="single" collapsible className="w-full pl-2">
									<AccordionItem value={title} className="border-b-0">
										<AccordionTrigger>
											{title} ({data.length})
										</AccordionTrigger>
										<AccordionContent>
											{data.map(({ id, attributes: { title } }) => (
												<li key={id}>
													<LinkItem label={title} href={`/blog/${mappedLang}/${id}`} />
												</li>
											))}
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							))}
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			))}
		</nav>
	);
}
