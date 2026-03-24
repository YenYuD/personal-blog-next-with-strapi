'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { landingPageContent } from '@/constants/uiConfig';
import type { Language } from '@/service/type';

interface AboutSectionProps {
	lang: Language;
}

export default function AboutSection({ lang }: AboutSectionProps) {
	const content = landingPageContent[lang].about;
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start end', 'end start'],
	});

	const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
	const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

	const fadeInLeftImage = {
		initial: { opacity: 0, x: -60 },
		animate: { opacity: 1, x: 0 },
		transition: { duration: 1, ease: [0.25, 0.4, 0.25, 1] as const },
	};

	return (
		<section
			id="about"
			ref={containerRef}
			className="relative w-full bg-[#f5f0eb] flex flex-col md:flex-col lg:flex-row h-auto md:h-auto lg:h-[31.25rem]"
		>
			{/* About Image - Left on desktop, Top on mobile/tablet */}
			<motion.div
				{...fadeInLeftImage}
				initial={fadeInLeftImage.initial}
				animate={fadeInLeftImage.animate}
				transition={fadeInLeftImage.transition}
				className="order-1 md:order-1 lg:order-1 relative h-[12.5rem] md:h-[15rem] lg:h-full w-full lg:w-[45rem] bg-gray-200 overflow-hidden"
			>
				<motion.div style={{ y: imageY, scale: imageScale }} className="w-full h-full">
					<Image
						src="https://res.cloudinary.com/dyrubjejf/image/upload/v1774212835/1767274596000_R0014328_uxk4cp.jpg"
						alt="Coffee and notebook on wooden table"
						fill
						className="object-cover"
						sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 31.25rem"
						quality={85}
						loading="lazy"
					/>
				</motion.div>
			</motion.div>

			{/* About Text - Right on desktop, Bottom on mobile/tablet */}
			<div className="order-2 md:order-2 lg:order-2 flex flex-col justify-center gap-3.5 md:gap-[1.125rem] lg:gap-6 px-5 md:px-6 lg:px-[3.75rem] py-7 md:py-10 lg:py-0 flex-1">
				<p className="text-[#7c7c7c] tracking-[0.1875rem] md:tracking-[0.25rem] text-[0.625rem] md:text-[0.6875rem] lg:text-xs font-bold font-geist">
					— {content.subtitle}
				</p>
				<h2 className="text-[2.25rem] md:text-[2.75rem] lg:text-[3.5rem] leading-[0.92] tracking-[0.0225rem] md:tracking-[0.0275rem] lg:tracking-[0.035rem] text-[#0f0f0f] font-staatliches">
					{content.title.map((line, index) => (
						<span key={line}>
							{line}
							{index < content.title.length - 1 && <br />}
						</span>
					))}
				</h2>
				<p className="text-[#7c7c7c] text-[0.8125rem] md:text-sm lg:text-[0.9375rem] leading-[1.7] tracking-[-0.008125rem] md:tracking-[-0.00875rem] lg:tracking-[-0.009375rem] font-geist">
					<span className="hidden lg:inline">{content.description.desktop}</span>
					<span className="hidden md:inline lg:hidden">{content.description.tablet}</span>
					<span className="inline md:hidden">{content.description.mobile}</span>
				</p>
				<Link
					href={`/${lang}/blog/all`}
					className="text-[#0f0f0f] text-lg md:text-xl lg:text-[1.375rem] tracking-[-0.0225rem] md:tracking-[-0.025rem] lg:tracking-[-0.0275rem] leading-[1.39] hover:underline font-jaro"
				>
					{content.cta}
				</Link>
			</div>
		</section>
	);
}
