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
import SelfPortrait from '@/assets/DSC9487.jpg';
import { mapLanguageParam } from '@/service/utils/langaugeMapping';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { SingleTypeService } from '@/service/server/singleTypeService';
import { processSearchParams } from '@/service/utils/processSearchParams';
import { AnimatedTitle, MarqueeBar } from '@/components/custom';

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
			<div className="relative 2xl:translate-y-1/2 z-[15] max-w-6xl mx-auto">
				<AnimatedTitle title="About Me /" />
				<div className="relative aspect-square mt-[1rem] md:mt-[3rem] max-w-[125px] mx-auto w-full rounded-full overflow-hidden">
					<Image
						src={SelfPortrait}
						alt="self-protrait"
						fill
						className="object-cover"
						sizes="100vw"
					/>
				</div>
				<div className="mt-6 font-saira lg:text-lg max-w-[85vw] text-center lg:max-w-6xl break-words mx-auto text-black leading-8 font-[300] max-h-[256px] overflow-scroll">
					<ReactMarkdown
						rehypePlugins={[rehypeRaw]}
						components={{
							p: ({ node, ...props }) => <p className="scrollable" {...props} />,
						}}
					>
						{content}
					</ReactMarkdown>
				</div>
				<div className="mt-12 md:mt-16 relative opacity-50 hover:opacity-100">
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
