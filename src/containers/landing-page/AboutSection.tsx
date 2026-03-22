'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function AboutSection() {
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
		<section ref={containerRef} className="relative w-full bg-[#f5f0eb]">
			{/* Desktop Layout - Horizontal */}
			<div className="hidden lg:flex lg:flex-row h-[31.25rem]">
				{/* About Image - Left Side */}
				<motion.div
					{...fadeInLeftImage}
					className="relative w-[31.25rem] bg-gray-200 overflow-hidden"
				>
					<motion.div style={{ y: imageY, scale: imageScale }} className="w-full h-full">
						<Image
							src="https://res.cloudinary.com/dyrubjejf/image/upload/v1773982267/1767273971000_R0014315_gpg3dc.jpg"
							alt="Person working on laptop"
							fill
							className="object-cover"
							sizes="31.25rem"
							loading="lazy"
						/>
					</motion.div>
				</motion.div>

				{/* About Text - Right Side */}
				<div className="flex flex-col justify-center gap-6 px-[3.75rem] flex-1">
					<p className="text-[#7c7c7c] tracking-[0.25rem] text-xs font-bold font-geist">
						— ABOUT ME
					</p>
					<h2 className="text-[3.5rem] leading-[0.92] tracking-[0.035rem] text-[#0f0f0f] font-staatliches">
						A quiet passion
						<br />
						for beautiful code.
					</h2>
					<p className="text-[#7c7c7c] text-[0.9375rem] leading-[1.7] tracking-[-0.009375rem] font-geist">
						I'm a frontend developer who believes that great software should feel effortless. I
						specialize in React, Next.js, and TypeScript — turning complex designs into clean,
						accessible, and performant web experiences. When I'm not coding, you'll find me in a
						coffee shop sketching UI ideas.
					</p>
					<a
						href="/about"
						className="text-[#0f0f0f] text-[1.375rem] tracking-[-0.0275rem] leading-[1.39] hover:underline font-jaro"
					>
						More about me →
					</a>
				</div>
			</div>

			{/* Tablet Layout - Vertical Stacked */}
			<div className="hidden md:flex lg:hidden flex-col">
				{/* About Image - Top */}
				<motion.div
					initial={{ opacity: 0, y: -30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] as const }}
					className="relative h-[15rem] bg-gray-200 overflow-hidden"
				>
					<motion.div style={{ y: imageY, scale: imageScale }} className="w-full h-full">
						<Image
							src="https://images.unsplash.com/photo-1581906970825-ed79c31cb540?w=800&q=80"
							alt="Person working on laptop"
							fill
							className="object-cover"
							sizes="100vw"
							loading="lazy"
						/>
					</motion.div>
				</motion.div>

				{/* About Text - Bottom */}
				<div className="flex flex-col gap-[1.125rem] px-6 py-10">
					<p className="text-[#7c7c7c] tracking-[0.25rem] text-[0.6875rem] font-bold font-geist">
						— ABOUT ME
					</p>
					<h2 className="text-[2.75rem] leading-[0.92] tracking-[0.0275rem] text-[#0f0f0f] font-staatliches">
						A quiet passion
						<br />
						for beautiful code.
					</h2>
					<p className="text-[#7c7c7c] text-sm leading-[1.7] tracking-[-0.00875rem] font-geist">
						I'm a frontend developer who believes great software should feel effortless.
						Specializing in React, Next.js, and TypeScript — turning complex designs into clean,
						accessible web experiences.
					</p>
					<a
						href="/about"
						className="text-[#0f0f0f] text-xl tracking-[-0.025rem] leading-[1.39] hover:underline font-jaro"
					>
						More about me →
					</a>
				</div>
			</div>

			{/* Mobile Layout - Vertical Stacked */}
			<div className="flex md:hidden flex-col">
				{/* About Image - Top */}
				<motion.div
					initial={{ opacity: 0, y: -30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] as const }}
					className="relative h-[12.5rem] bg-gray-200 overflow-hidden"
				>
					<motion.div style={{ y: imageY, scale: imageScale }} className="w-full h-full">
						<Image
							src="https://images.unsplash.com/photo-1581906970825-ed79c31cb540?w=600&q=80"
							alt="Person working on laptop"
							fill
							className="object-cover"
							sizes="100vw"
							loading="lazy"
						/>
					</motion.div>
				</motion.div>

				{/* About Text - Bottom */}
				<div className="flex flex-col gap-3.5 px-5 py-7">
					<p className="text-[#7c7c7c] tracking-[0.1875rem] text-[0.625rem] font-bold font-geist">
						— ABOUT ME
					</p>
					<h2 className="text-[2.25rem] leading-[0.92] tracking-[0.0225rem] text-[#0f0f0f] font-staatliches">
						A quiet passion
						<br />
						for beautiful code.
					</h2>
					<p className="text-[#7c7c7c] text-[0.8125rem] leading-[1.7] tracking-[-0.008125rem] font-geist">
						Frontend dev specializing in React, Next.js, and TypeScript — turning complex designs
						into clean web experiences.
					</p>
					<a
						href="/about"
						className="text-[#0f0f0f] text-lg tracking-[-0.0225rem] leading-[1.39] hover:underline font-jaro"
					>
						More about me →
					</a>
				</div>
			</div>
		</section>
	);
}
