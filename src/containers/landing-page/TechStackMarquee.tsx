'use client';

import Marquee from 'react-fast-marquee';

export default function TechStackMarquee() {
	const techStack = [
		{ id: 1, text: 'React', isDivider: false },
		{ id: 2, text: '·', isDivider: true },
		{ id: 3, text: 'Next.js', isDivider: false },
		{ id: 4, text: '·', isDivider: true },
		{ id: 5, text: 'TypeScript', isDivider: false },
		{ id: 6, text: '·', isDivider: true },
		{ id: 7, text: 'Tailwind', isDivider: false },
		{ id: 8, text: '·', isDivider: true },
		{ id: 9, text: 'Node.js', isDivider: false },
		{ id: 10, text: '·', isDivider: true },
		{ id: 11, text: 'Express.js', isDivider: false },
		{ id: 12, text: '·', isDivider: true },
		{ id: 13, text: 'PostgreSQL', isDivider: false },
		{ id: 14, text: '·', isDivider: true },
		{ id: 15, text: 'Claude Code', isDivider: false },
		{ id: 16, text: '·', isDivider: true },
		{ id: 17, text: 'GitHub Action', isDivider: false },
		{ id: 18, text: '·', isDivider: true },
	];

	return (
		<section className="relative w-full bg-[#f5f0eb] overflow-hidden hidden md:block">
			{/* Desktop - Infinite scroll marquee */}
			<div className="hidden lg:block py-4">
				<Marquee speed={50} pauseOnHover gradient={false} className="overflow-hidden">
					{techStack.map((item) => (
						<span
							key={item.id}
							className={`font-staatliches text-2xl tracking-[1.2px] leading-[1.3] whitespace-nowrap mx-5 ${item.isDivider ? 'text-[#7c7c7c]' : 'text-[#2c2825]'
								}`}
						>
							{item.text}
						</span>
					))}
				</Marquee>
			</div>

			{/* Tablet - Infinite scroll marquee (first 9 items) */}
			<div className="md:block lg:hidden py-3.5">
				<Marquee speed={40} pauseOnHover gradient={false} className="overflow-hidden">
					{techStack.slice(0, 9).map((item) => (
						<span
							key={item.id}
							className={`font-staatliches text-xl tracking-[1px] leading-[1.3] whitespace-nowrap mx-3 ${item.isDivider ? 'text-[#7c7c7c]' : 'text-[#2c2825]'
								}`}
						>
							{item.text}
						</span>
					))}
				</Marquee>
			</div>

			{/* Mobile - Completely hidden per design spec */}
		</section>
	);
}
