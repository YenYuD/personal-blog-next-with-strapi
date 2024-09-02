import type { Metadata } from 'next';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { siteTitle } from '@/constants/uiConfig';
import { SingleTypeService } from '@/service/server/singleTypeService';
import { processSearchParams } from '@/service/utils/processSearchParams';
import { mapLanguageParam } from '@/service/utils/langaugeMapping';
import type { Language } from '@/service/type';

export const metadata: Metadata = {
	title: `${siteTitle} | About Page`,
	description: '...',
};

export default async function AboutPage({
	params: { lang },
}: {
	params: { lang: Language };
}) {
	const {
		data: {
			attributes: { content },
		},
	} = await SingleTypeService.getAbout(
		processSearchParams({
			locale: mapLanguageParam(lang),
			fields: ['content'],
		}),
	);

	return (
		<div className="mx-auto max-w-3xl px-6">
			<div className="flex flex-col mt-6 gap-4">
				<h3 className="scroll-m-20 text-lg font-medium tracking-tight font-saira text-left">
					About - Emily Diao
				</h3>
				<div className="relative aspect-square max-w-[125px] mx-auto w-full rounded-full overflow-hidden">
					<Image src="/DSC9487.jpg" alt="self-protrait" fill className="object-cover" />
				</div>
			</div>
			<div className="mt-6 font-saira lg:text-lg">
				<ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
			</div>
		</div>
	);
}
