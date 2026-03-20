export default function ProjectsSection() {
	const projects = [
		{
			id: 1,
			number: '01',
			title: 'PERSONAL BLOG',
			description: 'Full-stack Next.js portfolio',
			tags: ['Next.js', 'Strapi', 'TypeScript'],
		},
		{
			id: 2,
			number: '02',
			title: 'E-COMMERCE PLATFORM',
			description: 'Scalable shopping experience',
			tags: ['React', 'Node.js', 'PostgreSQL'],
		},
		{
			id: 3,
			number: '03',
			title: 'DESIGN SYSTEM',
			description: 'Component library for teams',
			tags: ['Storybook', 'TailwindCSS', 'Figma'],
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
						<div
							key={project.id}
							className="flex items-center justify-between py-7 group cursor-pointer"
						>
							<div className="flex items-center gap-8">
								<span className="text-[#0f0f0f] text-[32px] tracking-[-0.64px] leading-[1] font-jaro">
									{project.number}
								</span>
								<div>
									<h3 className="text-[#0f0f0f] text-[28px] tracking-[-0.56px] leading-[1] mb-1 font-jaro">
										{project.title}
									</h3>
									<p className="text-[#7c7c7c] text-sm font-geist">{project.description}</p>
								</div>
							</div>
							<div className="flex items-center gap-6">
								<div className="flex gap-2">
									{project.tags.map((tag) => (
										<span
											key={tag}
											className="px-3 py-1 bg-[#f5f0eb] text-[#2c2825] text-xs rounded-full font-geist"
										>
											{tag}
										</span>
									))}
								</div>
								<span className="text-[#0f0f0f] text-2xl group-hover:translate-x-2 transition-transform font-jaro">
									→
								</span>
							</div>
						</div>
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
						<div
							key={project.id}
							className="flex items-center justify-between py-[1.125rem] md:py-5 group cursor-pointer"
						>
							<div className="flex-1">
								<div className="flex items-baseline gap-2 mb-1">
									<span className="text-[#0f0f0f] text-lg md:text-xl tracking-[-0.36px] md:tracking-[-0.4px] font-jaro">
										{project.number}
									</span>
									<h3 className="text-[#0f0f0f] text-lg md:text-xl tracking-[-0.36px] md:tracking-[-0.4px] font-jaro">
										{project.title}
									</h3>
								</div>
								<p className="text-[#7c7c7c] text-xs md:text-sm font-geist">
									{project.description}
								</p>
							</div>
							<span className="text-[#0f0f0f] text-xl md:text-2xl ml-4 group-hover:translate-x-2 transition-transform font-jaro">
								→
							</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
