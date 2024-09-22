import type { Language } from '@/service/type';
import Image from 'next/image';
import { mapLanguageParam } from '@/service/utils/langaugeMapping';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { SingleTypeService } from '@/service/server/singleTypeService';
import { processSearchParams } from '@/service/utils/processSearchParams';

type Props = {
	lang: Language;
	isvisible?: boolean;
};

export default async function SecondBlock({ lang }: Props) {
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
		<div className="min-h-[100svh]">
			<section className="bg-gradients">
				<div className="bg-gradient-3" />
				<div className="bg-gradient-4" />
			</section>
			<div className="relative z-[15]">
				<div className="mt-[3rem] flex flex-col w-full">
					<p className="font-extralight">About Me /</p>
				</div>
				<div className="relative aspect-square max-w-[125px] mx-auto w-full rounded-full overflow-hidden">
					<Image src="/DSC9487.jpg" alt="self-protrait" fill className="object-cover" />
				</div>
				<div className="mt-6 font-saira lg:text-lg max-w-[85vw] break-words mx-auto text-black leading-8 font-[300]">
					<ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
				</div>
			</div>
		</div>
	);
}