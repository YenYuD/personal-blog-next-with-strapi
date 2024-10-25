import { GradientBackground } from '@/components/custom';
import { HomeBlock, AboutMe, RecentWorks } from '@/containers/landing-page';
import { Footer } from '@/containers/layouts';
import type { Language } from '@/service/type';
export default function HomePage({ params: { lang } }: { params: { lang: Language } }) {
	return (
		<>
			<div className="flex justify-start flex-col items-center bg-gradient-container pt-[64px]">
				<div className="relative flex flex-col z-10 justify-evenly w-full max-w-6xl p-4 pb-[2.5rem]">
					<GradientBackground />
					<HomeBlock />
					<AboutMe lang={lang} />
					<RecentWorks />
				</div>
				<Footer />
			</div>
		</>
	);
}
