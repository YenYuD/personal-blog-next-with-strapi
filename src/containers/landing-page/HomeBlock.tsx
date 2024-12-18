import { TextAnimation } from '@/components/custom';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, Terminal } from 'lucide-react';

export default function HomeBlock() {
	const thisYear = new Date().getFullYear();
	return (
		<div className="h-full min-h-[100svh]">
			<div className="relative 2xl:translate-y-1/2 z-[15] flex flex-col justify-center gap-8">
				<div className="lg:max-2xl:mt-[5rem] flex flex-col w-full sm:items-center">
					<p className="font-extralight my-2">{thisYear} / Portfolio</p>
					<TextAnimation />
				</div>
				<p className="italic text-background text-lg font-normal mt-[1rem] sm:mt-[3rem] sm:text-center">
					<span className="flex gap-2 sm:justify-center">
						<Terminal className="animate-sparkle" />
						Hi, my name is Emily.
					</span>
					<span>I am a frontend developer.</span>
				</p>
				<Badge
					variant="outline"
					className="sm:mt-[3rem] sm:mx-auto max-sm:mr-auto font-thin text-sm tracking-wider drop-shadow-lg"
				>
					Scroll down
					<ArrowDown className="h-4 w-4 ml-2 opacity-70" />
				</Badge>
			</div>
		</div>
	);
}
