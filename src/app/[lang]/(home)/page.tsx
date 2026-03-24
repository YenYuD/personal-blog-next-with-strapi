import HeroSection from '@/containers/landing-page/HeroSection';
import AboutSection from '@/containers/landing-page/AboutSection';
import TechStackMarquee from '@/containers/landing-page/TechStackMarquee';
import ProjectsSection from '@/containers/landing-page/ProjectsSection';
import ContactCTA from '@/containers/landing-page/ContactCTA';
import Navbar from '@/containers/layouts/Navbar';
import Footer from '@/containers/layouts/Footer';
import { CldImage } from '@/components/custom';
import type { Language } from '@/service/type';

interface HomePageProps {
	params: {
		lang: Language;
	};
}

export async function generateStaticParams() {
	return [{ lang: 'en-US' }, { lang: 'zh-TW' }];
}

export default function HomePage({ params }: HomePageProps) {
	const { lang } = params;
	return (
		<>
			{/* <link
				rel="preload"
				as="image"
				href="https://images.unsplash.com/photo-1571128973497-2066dda438bc?w=1080&q=80"
				fetchPriority="high"
			/> */}
			<div className="min-h-screen bg-white max-w-[1920px] mx-auto">
				<Navbar />
				<main>
					<HeroSection lang={lang} />
					<AboutSection lang={lang} />
					<TechStackMarquee />
					<ProjectsSection lang={lang} />
					<ContactCTA lang={lang} />
				</main>
				<Footer />
			</div>
		</>
	);
}
