import { TextAnimation } from '@/components/custom';
import { textAnimationConfig } from '@/constants/uiConfig';
import { Terminal } from 'lucide-react';

export default function FirstBlock() {
	const thisYear = new Date().getFullYear();
	return (
		<div className="min-h-[100svh]">
			<section className="bg-gradients">
				<div className="bg-gradient-1" />
				<div className="bg-gradient-2" />
			</section>
			<div className="relative z-[15]">
				<div className="mt-[3rem] flex flex-col w-full">
					<p className="font-extralight">{thisYear} / Profolio</p>
					<TextAnimation key={Math.random()} textData={textAnimationConfig} />
				</div>
				<p className="italic text-background text-lg font-normal mt-[3rem]">
					<span className="flex gap-2">
						<Terminal className="animate-sparkle" />
						Hi, my name is Emily.{' '}
					</span>
					<span>I am a frontend developer.</span>
				</p>
			</div>
		</div>
	);
}
