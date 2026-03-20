import Image from 'next/image';

export default function AboutSection() {
	return (
		<section className="relative w-full bg-[#f5f0eb]">
			{/* Desktop Layout - Horizontal */}
			<div className="hidden lg:flex lg:flex-row h-[31.25rem]">
				{/* About Image - Left Side */}
				<div className="relative w-[31.25rem] bg-gray-200">
					<Image
						src="https://images.unsplash.com/photo-1581906970825-ed79c31cb540?w=1080&q=80"
						alt="Person working on laptop"
						fill
						className="object-cover"
						sizes="31.25rem"
						loading="lazy"
					/>
				</div>

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
				<div className="relative h-[15rem] bg-gray-200">
					<Image
						src="https://images.unsplash.com/photo-1581906970825-ed79c31cb540?w=800&q=80"
						alt="Person working on laptop"
						fill
						className="object-cover"
						sizes="100vw"
						loading="lazy"
					/>
				</div>

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
				<div className="relative h-[12.5rem] bg-gray-200">
					<Image
						src="https://images.unsplash.com/photo-1581906970825-ed79c31cb540?w=600&q=80"
						alt="Person working on laptop"
						fill
						className="object-cover"
						sizes="100vw"
						loading="lazy"
					/>
				</div>

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
