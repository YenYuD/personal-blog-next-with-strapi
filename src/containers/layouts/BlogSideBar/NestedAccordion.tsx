import { LinkItem } from '@/components/custom';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import type { SecondSubItemType } from '@/service/type';
import { ChevronRight } from 'lucide-react';

export default function NestedAccordion({
	subItems,
	lang,
}: { subItems: SecondSubItemType[]; lang: string }) {
	return (
		<>
			{subItems.map(({ id, title, articles: { data } }) => (
				<Accordion key={id} type="single" collapsible className="w-full pl-2">
					<AccordionItem value={title} className="border-b-0 text-gray-400 text-lg">
						<AccordionTrigger>
							{title} ({data.length})
						</AccordionTrigger>
						<AccordionContent>
							{data.map(({ id, attributes: { title } }) => (
								<li key={id} className="text-md list-none text-gray-400">
									<ChevronRight className="inline-block w-4 h-4 mr-2" />
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
