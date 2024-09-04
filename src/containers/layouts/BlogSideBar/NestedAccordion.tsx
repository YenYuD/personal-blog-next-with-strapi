import { LinkItem } from '@/components/custom';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import type { SecondSubItemType } from '@/service/type';

export default function NestedAccordion({
	subItems,
	lang,
}: { subItems: SecondSubItemType[]; lang: string }) {
	return (
		<>
			{subItems.map(({ id, title, articles: { data } }) => (
				<Accordion key={id} type="single" collapsible className="w-full pl-2">
					<AccordionItem value={title} className="border-b-0">
						<AccordionTrigger>
							{title} ({data.length})
						</AccordionTrigger>
						<AccordionContent>
							{data.map(({ id, attributes: { title } }) => (
								<li key={id} className="decoration-clone">
									<LinkItem label={title} href={`/blog/${lang}/${id}`} />
								</li>
							))}
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			))}
		</>
	);
}
