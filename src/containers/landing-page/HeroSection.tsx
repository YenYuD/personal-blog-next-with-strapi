'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { landingPageContent } from '@/constants/uiConfig';
import type { Language } from '@/service/type';

interface HeroSectionProps {
	lang: Language;
}

export default function HeroSection({ lang }: HeroSectionProps) {
	const content = landingPageContent[lang].hero;
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end start'],
	});

	const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
	const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

	const scrollToProjects = () => {
		const projectsSection = document.getElementById('projects');
		if (projectsSection) {
			projectsSection.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		}
	};

	const fadeInUp = {
		initial: { opacity: 0, y: 30 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as const },
	};

	const fadeInLeft = {
		initial: { opacity: 0, x: -30 },
		animate: { opacity: 1, x: 0 },
		transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as const },
	};

	const fadeInRight = {
		initial: { opacity: 0, x: 60 },
		animate: { opacity: 1, x: 0 },
		transition: { duration: 1, ease: [0.25, 0.4, 0.25, 1] as const },
	};

	const scaleIn = {
		initial: { opacity: 0, scale: 0.95 },
		animate: { opacity: 1, scale: 1 },
		transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as const },
	};

	return (
		<section
			id="home"
			ref={containerRef}
			className="relative w-full bg-white flex flex-col md:flex-col lg:flex-row h-auto md:h-[32.5rem] lg:h-[40.625rem]"
		>
			{/* Hero Text - Left on desktop, Bottom on mobile/tablet */}
			<div className="order-2 md:order-2 lg:order-1 flex flex-col justify-end gap-4 md:gap-5 lg:gap-8 px-5 md:px-6 lg:px-10 py-6 md:py-[1.875rem] lg:py-[3.75rem] lg:pb-10 bg-white w-full lg:w-[45rem]">
				<motion.p
					{...fadeInLeft}
					transition={{ ...fadeInLeft.transition, delay: 0.1 }}
					className="text-[#7c7c7c] tracking-[0.1875rem] md:tracking-[0.25rem] text-[0.625rem] md:text-[0.6875rem] lg:text-xs font-bold font-geist"
				>
					— {content.subtitle}
				</motion.p>
				<motion.h1
					{...fadeInUp}
					transition={{ ...fadeInUp.transition, delay: 0.2 }}
					className="text-[2.75rem] md:text-[3.25rem] lg:text-[4.375rem] leading-[0.9] md:leading-[0.9] lg:leading-[0.88] tracking-[0.0275rem] md:tracking-[0.0325rem] lg:tracking-[0.04375rem] text-[#0f0f0f] font-staatliches"
				>
					{content.title.map((line, index) => (
						<span key={line}>
							{line}
							{index < content.title.length - 1 && <br />}
						</span>
					))}
				</motion.h1>
				<motion.p
					{...fadeInLeft}
					transition={{ ...fadeInLeft.transition, delay: 0.4 }}
					className="text-[#7c7c7c] text-[0.8125rem] md:text-sm lg:text-[0.875rem] leading-[1.6] tracking-[-0.008125rem] md:tracking-[-0.00875rem] lg:tracking-[-0.0175rem] lg:max-w-[21.875rem] font-geist"
				>
					{content.description}
				</motion.p>
				<motion.div
					{...scaleIn}
					transition={{ ...scaleIn.transition, delay: 0.6 }}
					whileHover={{
						scale: 1.05,
						boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
						transition: { duration: 0.2 },
					}}
					whileTap={{ scale: 0.98 }}
					className="w-fit"
				>
					<Button
						onClick={scrollToProjects}
						className="rounded-full bg-[#0f0f0f] text-white px-6 md:px-7 lg:px-8 py-2.5 md:py-2.5 lg:py-3 text-sm hover:bg-[#2c2825] transition-colors font-geist"
					>
						{content.cta}
					</Button>
				</motion.div>
			</div>

			{/* Hero Image - Right on desktop, Top on mobile/tablet */}
			<motion.div
				{...fadeInRight}
				className="order-1 md:order-1 lg:order-2 relative h-[13.75rem] md:h-[17.5rem] lg:h-full lg:flex-1 bg-gray-100 overflow-hidden"
			>
				<motion.div style={{ y: imageY, scale: imageScale }} className="w-full h-full">
					<Image
						src="https://res.cloudinary.com/dyrubjejf/image/upload/v1773982267/1767273971000_R0014315_gpg3dc.jpg"
						alt="Person working on laptop"
						fill
						className="object-cover"
						sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 55vw"
						quality={85}
						priority
					/>
				</motion.div>
			</motion.div>
		</section>
	);
}
