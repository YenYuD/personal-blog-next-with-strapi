import { GradientBackground } from '@/components/custom';
import { HomeBlock, AboutMe, RecentWorks } from '@/containers/landing-page';
import { Footer } from '@/containers/layouts';
import { cardInfo } from '@/constants/uiConfig';

export default function HomePage() {
	// Preload the first portfolio image for better LCP
	const firstCardImage = cardInfo[0]?.imgSrc?.src;

	return (
		<>
			{firstCardImage && (
				<link
					rel="preload"
					as="image"
					href={firstCardImage}
					// @ts-ignore - fetchpriority is valid but not in types yet
					fetchpriority="high"
				/>
			)}
			<div className="flex justify-start flex-col items-center bg-gradient-container pt-[64px]">
				<div className="relative flex flex-col z-10 justify-evenly w-full max-w-6xl p-4 pb-[2.5rem]">
					<GradientBackground />
					<HomeBlock />
					<AboutMe />
					<RecentWorks />
				</div>
				<Footer />
			</div>
		</>
	);
}
