'use client';

import { useState } from 'react';
import Image from 'next/image';
import { landingPageContent } from '@/constants/uiConfig';
import type { Language } from '@/service/type';
import Link from 'next/link';

interface ProjectsSectionProps {
	lang: Language;
}

interface ProjectItem {
	id: number;
	number: string;
	title: string;
	description: string;
	tags: string[];
	year: string;
	imgSrc: string;
	link: string;
	repo: string;
}

function ProjectList({
	projects,
	hoveredId,
	setHoveredId,
	hoverBg,
	defaultBg,
}: {
	projects: ProjectItem[];
	hoveredId: number | null;
	setHoveredId: (id: number | null) => void;
	hoverBg: string;
	defaultBg: string;
}) {
	return (
		<div className="divide-y divide-[#e0e0e0]/60">
			{projects.map((project) => (
				<a
					key={project.id}
					href={project.link}
					target="_blank"
					rel="noreferrer"
					className={`flex items-start lg:items-center justify-between py-[1.125rem] md:py-5 lg:py-7 cursor-pointer px-3 md:px-4 rounded-lg transition-colors duration-200 ${
						hoveredId === project.id ? hoverBg : defaultBg
					}`}
					onMouseEnter={() => setHoveredId(project.id)}
					onMouseLeave={() => setHoveredId(null)}
				>
					{/* Left: image + info */}
					<div className="flex items-start lg:items-center gap-3 lg:gap-8 flex-1 min-w-0">
						<div className="relative w-[80px] md:w-[100px] lg:w-[120px] h-[60px] md:h-[70px] lg:h-[80px] rounded-lg overflow-hidden flex-shrink-0">
							<Image
								src={project.imgSrc}
								alt={project.title}
								fill
								className="object-cover"
								sizes="(max-width: 768px) 80px, (max-width: 1024px) 100px, 120px"
								quality={85}
								loading="lazy"
							/>
						</div>
						<div className="flex-1 min-w-0">
							<div className="flex items-baseline gap-2 lg:gap-3 mb-1">
								<span className="text-[#0f0f0f] text-sm md:text-base lg:text-[20px] tracking-[-0.28px] md:tracking-[-0.32px] lg:tracking-[-0.4px] leading-[1] font-jaro">
									{project.number}
								</span>
								<h3 className="text-[#0f0f0f] text-sm md:text-lg lg:text-[28px] tracking-[-0.28px] md:tracking-[-0.36px] lg:tracking-[-0.56px] leading-[1] font-jaro">
									{project.title}
								</h3>
								<span className="hidden lg:inline text-[#7c7c7c] text-xs font-geist">
									({project.year})
								</span>
							</div>
							<p className="text-[#7c7c7c] text-xs md:text-sm font-geist lg:max-w-[600px] mb-1.5 lg:mb-0">
								{project.description}
							</p>
							{project.repo && (
								<Link
									href={project.repo}
									className="text-[#0f0f0f] text-sm md:text-base tracking-[-0.0225rem] md:tracking-[-0.025rem] lg:tracking-[-0.0275rem] leading-[1.39] hover:underline font-jaro"
								>
									repo →
								</Link>
							)}
							{/* Tags - mobile/tablet only */}
							<div className="flex lg:hidden gap-1.5 flex-wrap">
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
					</div>

					{/* Right: tags (desktop) + arrow */}
					<div className="flex items-center gap-6 flex-shrink-0 ml-2 lg:ml-0 self-center">
						{/* Tags - desktop only */}
						<div className="hidden lg:flex gap-2 flex-wrap max-w-[300px]">
							{project.tags.slice(0, 6).map((tag) => (
								<span
									key={tag}
									className="px-3 py-1 bg-[#f5f0eb] text-[#2c2825] text-xs rounded-full font-geist"
								>
									{tag}
								</span>
							))}
						</div>
						<span className="text-[#0f0f0f] text-lg md:text-xl lg:text-2xl font-jaro">→</span>
					</div>
				</a>
			))}
		</div>
	);
}

export default function ProjectsSection({ lang }: ProjectsSectionProps) {
	const [hoveredId, setHoveredId] = useState<number | null>(null);
	const content = landingPageContent[lang].projects;

	const sideProjects = content.sideProjects.map((item, index) => ({
		id: index + 1,
		...item,
	}));

	const companyProjects = content.companyProjects.map((item, index) => ({
		id: sideProjects.length + index + 1,
		...item,
	}));

	return (
		<section id="projects" className="relative w-full bg-white">
			<div className="px-5 md:px-6 lg:px-[1.875rem] py-8 md:py-10 lg:py-[3.75rem]">
				<p className="text-[#7c7c7c] tracking-[3px] md:tracking-[4px] text-[10px] md:text-[11px] lg:text-xs font-bold mb-4 lg:mb-5 font-geist">
					— {content.subtitle}
				</p>
				{/* Company Projects */}
				<div className="bg-[#fafafa] rounded-2xl p-4 md:p-5 lg:p-6 mb-6 lg:mb-8 border border-[#ebebeb]">
					<h2 className="text-[#0f0f0f] text-sm md:text-base lg:text-lg font-bold mb-3 lg:mb-4 tracking-[1px] font-jaro">
						{content.companyProjectsLabel}
					</h2>
					<ProjectList
						projects={companyProjects}
						hoveredId={hoveredId}
						setHoveredId={setHoveredId}
						hoverBg="bg-[#f3f3f3]"
						defaultBg="bg-[#fafafa]"
					/>
				</div>
				{/* Side Projects */}
				<div className="bg-[#f5f0eb]/40 rounded-2xl p-4 md:p-5 lg:p-6 border border-[#e8e0d8]">
					<h2 className="text-[#0f0f0f] text-sm md:text-base lg:text-lg font-bold mb-3 lg:mb-4 font-jaro tracking-[1px]">
						{content.sideProjectsLabel}
					</h2>
					<ProjectList
						projects={sideProjects}
						hoveredId={hoveredId}
						setHoveredId={setHoveredId}
						hoverBg="bg-[#ede5dc]/60"
						defaultBg="bg-transparent"
					/>
				</div>
			</div>
		</section>
	);
}
