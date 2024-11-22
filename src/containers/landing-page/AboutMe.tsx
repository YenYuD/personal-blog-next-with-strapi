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
import { AnimatedTitle, MarqueeBar } from '@/components/custom';

export default async function SecondBlock() {
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
						<p>
							Hello! I’m a front-end developer from Taiwan with 2 years of experience in React,
							Next.js, and TypeScript. I’m passionate about creating seamless user interfaces and
							always exploring new technologies. This is my first personal website, where I’ll
							document my notes, travel adventures, and connect with others. English isn’t my first
							language, but I’m striving to make my articles bilingual.
						</p>
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
