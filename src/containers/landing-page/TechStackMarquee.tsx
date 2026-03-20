'use client';

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
		{ id: 9, text: 'Figma', isDivider: false },
		{ id: 10, text: '·', isDivider: true },
		{ id: 11, text: 'Node.js', isDivider: false },
		{ id: 12, text: '·', isDivider: true },
		{ id: 13, text: 'Storybook', isDivider: false },
	];

	return (
		<section className="relative w-full bg-[#f5f0eb] overflow-hidden">
			{/* Desktop */}
			<div className="hidden lg:flex items-center justify-between gap-10 px-8 py-4">
				{techStack.map((item) => (
					<span
						key={item.id}
						className={`font-staatliches text-2xl tracking-[1.2px] leading-[1.3] whitespace-nowrap ${
							item.isDivider ? 'text-[#7c7c7c]' : 'text-[#2c2825]'
						}`}
					>
						{item.text}
					</span>
				))}
			</div>

			{/* Tablet */}
			<div className="hidden md:flex lg:hidden items-center justify-between gap-6 px-6 py-3.5">
				{techStack.slice(0, 9).map((item) => (
					<span
						key={item.id}
						className={`font-staatliches text-xl tracking-[1px] leading-[1.3] whitespace-nowrap ${
							item.isDivider ? 'text-[#7c7c7c]' : 'text-[#2c2825]'
						}`}
					>
						{item.text}
					</span>
				))}
			</div>

			{/* Mobile - Hidden on mobile per design */}
			<div className="flex md:hidden items-center gap-4 px-5 py-3 overflow-x-auto no-scrollbar">
				{techStack.slice(0, 9).map((item) => (
					<span
						key={item.id}
						className={`font-staatliches text-lg tracking-[0.9px] leading-[1.3] whitespace-nowrap ${
							item.isDivider ? 'text-[#7c7c7c]' : 'text-[#2c2825]'
						}`}
					>
						{item.text}
					</span>
				))}
			</div>
		</section>
	);
}
