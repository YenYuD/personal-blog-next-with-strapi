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
		<div className="min-h-[100svh] lg:max-h-[1100px] flex flex-col justify-center">
			<div className="relative z-[15] h-full max-w-6xl flex lg:max-2xl:mt-[3rem] 2xl:justify-center 2xl:mt-[-4rem] flex-col gap-4 lg:gap-16">
				<div className="flex flex-col max-h-[85%]">
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
					<div className="mt-6 flex-1 font-saira lg:text-lg max-w-[85vw] text-center scrollable lg:max-w-6xl break-words mx-auto text-black leading-8 font-[300] max-md:overflow-y-scroll no-scrollbar">
						<ReactMarkdown
							rehypePlugins={[rehypeRaw]}
							components={{
								p: ({ node, ...props }) => <p className="scrollable" {...props} />,
							}}
						>
							{content}
						</ReactMarkdown>
					</div>
				</div>
				<div className="relative opacity-50 hover:opacity-100">
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
