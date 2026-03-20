import HeroSection from '@/containers/landing-page/HeroSection';
import AboutSection from '@/containers/landing-page/AboutSection';
import TechStackMarquee from '@/containers/landing-page/TechStackMarquee';
import ProjectsSection from '@/containers/landing-page/ProjectsSection';
import ContactCTA from '@/containers/landing-page/ContactCTA';
import Navbar from '@/containers/layouts/Navbar';
import Footer from '@/containers/layouts/Footer';

export default function HomePage() {
	return (
		<>
			<link
				rel="preload"
				as="image"
				href="https://images.unsplash.com/photo-1571128973497-2066dda438bc?w=1080&q=80"
				fetchPriority="high"
			/>
			<div className="min-h-screen bg-white">
				<Navbar />
				<main>
					<HeroSection />
					<AboutSection />
					<TechStackMarquee />
					<ProjectsSection />
					<ContactCTA />
				</main>
				<Footer />
			</div>
		</>
	);
}
