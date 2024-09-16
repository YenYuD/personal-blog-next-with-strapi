import { ScrollingWrapper } from '@/components/custom';
import { FirstBlock, SecondBlock } from '@/containers/landing-page';
import type { Language } from '@/service/type';
export default function HomePage({ params: { lang } }: { params: { lang: Language } }) {
	return (
		<>
			<div className="flex justify-start flex-col items-center pt-[64px] bg-gradient-container h-full">
				<div className="relative flex flex-col z-10 justify-evenly w-full h-full max-w-6xl px-4">
					<ScrollingWrapper>
						<FirstBlock />
						<SecondBlock lang={lang} />
					</ScrollingWrapper>
				</div>
			</div>
		</>
	);
}
