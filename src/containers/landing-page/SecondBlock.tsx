import type { Language } from '@/service/type';
import Image from 'next/image';
import {
	Jest,
	MUI,
	NextJs,
	React,
	ReactQuery,
	TailwindCSS,
	TypeScript,
} from '@/components/custom/icons';
import { mapLanguageParam } from '@/service/utils/langaugeMapping';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { SingleTypeService } from '@/service/server/singleTypeService';
import { processSearchParams } from '@/service/utils/processSearchParams';
import { MarqueeBar } from '@/components/custom';

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
			<div className="relative z-[15] max-w-4xl mx-auto">
				<div className="sm:mt-[3rem] flex flex-col w-full">
					<p className="font-extralight">About Me /</p>
				</div>
				<div className="relative aspect-square max-w-[125px] mx-auto w-full rounded-full overflow-hidden">
					<Image src="/DSC9487.jpg" alt="self-protrait" fill className="object-cover" />
				</div>
				<div className="mt-6 font-saira lg:text-lg max-w-[85vw] text-center break-words mx-auto text-black leading-8 font-[300] max-h-[256px] overflow-scroll">
					<ReactMarkdown
						rehypePlugins={[rehypeRaw]}
						components={{
							p: ({ node, ...props }) => <p className="scrollable" {...props} />,
						}}
					>
						{content}
					</ReactMarkdown>
				</div>
				<div className="mt-12 relative opacity-50 hover:opacity-100">
					<MarqueeBar speed={30} pauseOnHover autoFill>
						<NextJs className="h-12 w-12 mx-4" />
						<React className="h-12 w-12 mx-4" />
						<TailwindCSS className=" w-32 h-12 mx-4" />
						<TypeScript className="h-12 w-12 mx-4" />
						<MUI className="h-12 w-12 mx-4" />
						<ReactQuery className="h-12 w-12 mx-4" />
						<Jest className="h-12 w-12 mx-4" />
					</MarqueeBar>
				</div>
			</div>
		</div>
	);
}
