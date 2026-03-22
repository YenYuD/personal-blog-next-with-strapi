'use client';

import { useState } from 'react';
import Image from 'next/image';
import PortfolioImg from '@/assets/portfolio.png';
import KeypoSuiteImg from '@/assets/Keypo_suite.jpeg';
import FormosaBlackBearImg from '@/assets/formosa_blackbear.jpeg';
import BookStoreImg from '@/assets/bookstore.jpeg';

export default function ProjectsSection() {
	const [hoveredId, setHoveredId] = useState<number | null>(null);

	const projects = [
		{
			id: 1,
			number: '01',
			title: 'FRONTEND PORTFOLIO',
			description:
				'Frontend portfolio with personal blog. Integrate with Strapi CMS, ReactMarkdown and shadcn UI library.',
			tags: ['Next.js', 'TypeScript', 'TailwindCSS', 'Strapi', 'Vitest'],
			year: '2024',
			imgSrc: PortfolioImg,
			link: process.env.NEXT_PUBLIC_WEBSITE_LINK,
			repo: 'https://github.com/YenYuD/personal-blog-next-with-strapi',
		},
		{
			id: 2,
			number: '02',
			title: 'KEYPO SUITE',
			description:
				'A client-facing portal that integrates three distinct products for comprehensive account management.',
			tags: ['Next.js', 'TypeScript', 'React-hook-form', 'MUI', 'React-Query'],
			year: '2024',
			imgSrc: KeypoSuiteImg,
			link: 'https://suite-info.keypo.ai/en',
			repo: '',
		},
		{
			id: 3,
			number: '03',
			title: 'IF BLACK BEARS DISAPPEARED',
			description: 'A Static Website Dedicated to the Conservation of the Formosan Black Bear.',
			tags: ['Next.js', 'GSAP', 'Scroll Trigger', 'TailwindCSS'],
			year: '2023',
			imgSrc: FormosaBlackBearImg,
			link: 'https://dailyview.tw/blackbear',
			repo: '',
		},
		{
			id: 4,
			number: '04',
			title: 'IF BOOKSTORES DISAPPEARED',
			description:
				'A Static Website Comprising Analytical Reports on Physical Bookstores and Printed Books.',
			tags: ['Next.js', 'GSAP', 'Scroll Trigger', 'AOS'],
			year: '2023',
			imgSrc: BookStoreImg,
			link: 'https://dailyview.tw/lostbooks',
			repo: '',
		},
	];

	return (
		<section className="relative w-full bg-white">
			{/* Desktop Layout */}
			<div className="hidden lg:block px-[1.875rem] py-[3.75rem]">
				<p className="text-[#7c7c7c] tracking-[4px] text-xs font-bold mb-5 font-geist">
					— SELECTED PROJECTS
				</p>

				<div className="divide-y divide-[#e0e0e0]">
					{projects.map((project) => (
						<a
							key={project.id}
							href={project.link}
							target="_blank"
							rel="noreferrer"
							className={`flex items-center justify-between py-7 cursor-pointer px-4 -mx-4 rounded-lg transition-colors duration-200 ${
								hoveredId === project.id ? 'bg-[#f9f9f9]' : 'bg-white'
							}`}
							onMouseEnter={() => setHoveredId(project.id)}
							onMouseLeave={() => setHoveredId(null)}
						>
							<div className="flex items-center gap-8">
								<div className="relative w-[120px] h-[80px] rounded-lg overflow-hidden flex-shrink-0">
									<Image
										src={project.imgSrc}
										alt={project.title}
										fill
										className="object-cover"
										sizes="120px"
									/>
								</div>
								<div>
									<div className="flex items-center gap-3 mb-1">
										<span className="text-[#0f0f0f] text-[20px] tracking-[-0.4px] leading-[1] font-jaro">
											{project.number}
										</span>
										<h3 className="text-[#0f0f0f] text-[28px] tracking-[-0.56px] leading-[1] font-jaro">
											{project.title}
										</h3>
										<span className="text-[#7c7c7c] text-xs font-geist">({project.year})</span>
									</div>
									<p className="text-[#7c7c7c] text-sm font-geist max-w-[600px]">
										{project.description}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-6">
								<div className="flex gap-2 flex-wrap max-w-[300px]">
									{project.tags.slice(0, 4).map((tag) => (
										<span
											key={tag}
											className="px-3 py-1 bg-[#f5f0eb] text-[#2c2825] text-xs rounded-full font-geist"
										>
											{tag}
										</span>
									))}
								</div>
								<span className="text-[#0f0f0f] text-2xl font-jaro">→</span>
							</div>
						</a>
					))}
				</div>
			</div>

			{/* Tablet & Mobile Layout */}
			<div className="lg:hidden px-5 md:px-6 py-8 md:py-10">
				<p className="text-[#7c7c7c] tracking-[3px] md:tracking-[4px] text-[10px] md:text-[11px] font-bold mb-4 font-geist">
					— SELECTED PROJECTS
				</p>

				<div className="divide-y divide-[#e0e0e0]">
					{projects.map((project) => (
						<a
							key={project.id}
							href={project.link}
							target="_blank"
							rel="noreferrer"
							className={`flex gap-3 py-[1.125rem] md:py-5 cursor-pointer px-3 -mx-3 rounded-lg transition-colors duration-200 ${
								hoveredId === project.id ? 'bg-[#f9f9f9]' : 'bg-white'
							}`}
							onMouseEnter={() => setHoveredId(project.id)}
							onMouseLeave={() => setHoveredId(null)}
						>
							<div className="relative w-[80px] md:w-[100px] h-[60px] md:h-[70px] rounded-lg overflow-hidden flex-shrink-0">
								<Image
									src={project.imgSrc}
									alt={project.title}
									fill
									className="object-cover"
									sizes="(max-width: 768px) 80px, 100px"
								/>
							</div>
							<div className="flex-1">
								<div className="flex items-baseline gap-2 mb-1">
									<span className="text-[#0f0f0f] text-sm md:text-base tracking-[-0.28px] md:tracking-[-0.32px] font-jaro">
										{project.number}
									</span>
									<h3 className="text-[#0f0f0f] text-sm md:text-lg tracking-[-0.28px] md:tracking-[-0.36px] font-jaro">
										{project.title}
									</h3>
								</div>
								<p className="text-[#7c7c7c] text-xs md:text-sm font-geist mb-2">
									{project.description}
								</p>
								<div className="flex gap-1.5 flex-wrap">
									{project.tags.slice(0, 3).map((tag) => (
										<span
											key={tag}
											className="px-2 py-0.5 bg-[#f5f0eb] text-[#2c2825] text-[10px] md:text-xs rounded-full font-geist"
										>
											{tag}
										</span>
									))}
								</div>
							</div>
							<span className="text-[#0f0f0f] text-lg md:text-xl font-jaro self-center">→</span>
						</a>
					))}
				</div>
			</div>
		</section>
	);
}
