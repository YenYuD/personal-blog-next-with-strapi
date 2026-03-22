'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { CldImage } from '@/components/custom';

export default function HeroSection() {
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end start'],
	});

	const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
	const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

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
		<section ref={containerRef} className="relative w-full bg-white">
			{/* Desktop Layout - Horizontal */}
			<div className="hidden lg:flex flex-row h-[40.625rem]">
				{/* Hero Text - Left Side */}
				<div className="flex flex-col justify-end gap-8 px-10 py-[3.75rem] pb-10 bg-white w-[32.5rem]">
					<motion.p
						{...fadeInLeft}
						transition={{ ...fadeInLeft.transition, delay: 0.1 }}
						className="text-[#7c7c7c] tracking-[0.25rem] text-xs font-bold font-geist"
					>
						— FRONTEND DEVELOPER
					</motion.p>
					<motion.h1
						{...fadeInUp}
						transition={{ ...fadeInUp.transition, delay: 0.2 }}
						className="text-[4.375rem] leading-[0.88] tracking-[0.04375rem] text-[#0f0f0f] font-staatliches"
					>
						Crafting
						<br />
						thoughtful
						<br />
						digital
						<br />
						experiences.
					</motion.h1>
					<motion.p
						{...fadeInLeft}
						transition={{ ...fadeInLeft.transition, delay: 0.4 }}
						className="text-[#7c7c7c] text-[0.875rem] leading-[1.6] tracking-[-0.0175rem] max-w-[21.875rem] font-geist"
					>
						Based in Taipei. Building interfaces
						<br />
						that feel as good as they look.
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
						<Button className="rounded-full bg-[#0f0f0f] text-white px-8 py-3 text-sm hover:bg-[#2c2825] transition-colors font-geist">
							View my work
						</Button>
					</motion.div>
				</div>

				{/* Hero Image - Right Side */}
				<motion.div {...fadeInRight} className="relative flex-1 bg-gray-100 overflow-hidden">
					<motion.div style={{ y: imageY, scale: imageScale }} className="w-full h-full">
						<Image
							src="https://res.cloudinary.com/dyrubjejf/image/upload/v1773981938/1764943402000_R0014150_i4pkp3.jpg"
							alt="Coffee and notebook on wooden table"
							fill
							className="object-cover"
							sizes="(max-width: 90rem) 55vw, 57.5rem"
							priority
						/>
					</motion.div>
				</motion.div>
			</div>

			{/* Tablet Layout - Vertical Stacked */}
			<div className="hidden md:flex lg:hidden flex-col h-[32.5rem]">
				{/* Hero Image - Top */}
				<motion.div
					{...fadeInUp}
					transition={{ ...fadeInUp.transition, delay: 0 }}
					className="relative h-[17.5rem] bg-gray-100 overflow-hidden"
				>
					<motion.div style={{ y: imageY, scale: imageScale }} className="w-full h-full">
						<Image
							src="https://res.cloudinary.com/dyrubjejf/image/upload/v1773981938/1764944113000_R0014180_kreanb.jpg"
							alt="Coffee and notebook on wooden table"
							fill
							className="object-cover"
							sizes="100vw"
							priority
						/>
					</motion.div>
				</motion.div>

				{/* Hero Text - Bottom */}
				<div className="flex flex-col gap-5 px-6 py-[1.875rem] bg-white">
					<motion.p
						{...fadeInLeft}
						transition={{ ...fadeInLeft.transition, delay: 0.1 }}
						className="text-[#7c7c7c] tracking-[0.25rem] text-[0.6875rem] font-bold font-geist"
					>
						— FRONTEND DEVELOPER
					</motion.p>
					<motion.h1
						{...fadeInUp}
						transition={{ ...fadeInUp.transition, delay: 0.2 }}
						className="text-[3.25rem] leading-[0.9] tracking-[0.0325rem] text-[#0f0f0f] font-staatliches"
					>
						Crafting
						<br />
						thoughtful
						<br />
						digital
						<br />
						experiences.
					</motion.h1>
					<motion.p
						{...fadeInLeft}
						transition={{ ...fadeInLeft.transition, delay: 0.4 }}
						className="text-[#7c7c7c] text-sm leading-[1.6] tracking-[-0.00875rem] font-geist"
					>
						Based in Taipei. Building interfaces that feel as good as they look.
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
						<Button className="rounded-full bg-[#0f0f0f] text-white px-7 py-2.5 text-sm hover:bg-[#2c2825] transition-colors font-geist">
							View my work
						</Button>
					</motion.div>
				</div>
			</div>

			{/* Mobile Layout - Vertical Stacked */}
			<div className="flex md:hidden flex-col">
				{/* Hero Image - Top */}
				<motion.div
					{...fadeInUp}
					transition={{ ...fadeInUp.transition, delay: 0 }}
					className="relative h-[13.75rem] bg-gray-100 overflow-hidden"
				>
					<motion.div style={{ y: imageY, scale: imageScale }} className="w-full h-full">
						<Image
							src="https://images.unsplash.com/photo-1571128973497-2066dda438bc?w=800&q=80"
							alt="Coffee and notebook on wooden table"
							fill
							className="object-cover"
							sizes="100vw"
							priority
						/>
					</motion.div>
				</motion.div>

				{/* Hero Text - Bottom */}
				<div className="flex flex-col gap-4 px-5 py-6 bg-white">
					<motion.p
						{...fadeInLeft}
						transition={{ ...fadeInLeft.transition, delay: 0.1 }}
						className="text-[#7c7c7c] tracking-[0.1875rem] text-[0.625rem] font-bold font-geist"
					>
						— FRONTEND DEVELOPER
					</motion.p>
					<motion.h1
						{...fadeInUp}
						transition={{ ...fadeInUp.transition, delay: 0.2 }}
						className="text-[2.75rem] leading-[0.9] tracking-[0.0275rem] text-[#0f0f0f] font-staatliches"
					>
						Crafting
						<br />
						thoughtful
						<br />
						digital
						<br />
						experiences.
					</motion.h1>
					<motion.p
						{...fadeInLeft}
						transition={{ ...fadeInLeft.transition, delay: 0.4 }}
						className="text-[#7c7c7c] text-[0.8125rem] leading-[1.6] tracking-[-0.008125rem] font-geist"
					>
						Based in Taipei. Building interfaces that feel as good as they look.
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
						<Button className="rounded-full bg-[#0f0f0f] text-white px-6 py-2.5 text-sm hover:bg-[#2c2825] transition-colors font-geist">
							View my work
						</Button>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
