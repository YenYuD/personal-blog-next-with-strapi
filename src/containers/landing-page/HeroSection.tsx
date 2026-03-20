import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
	return (
		<section className="relative w-full bg-white">
			{/* Desktop & Tablet Layout */}
			<div className="hidden md:flex md:flex-row h-[40.625rem] lg:h-[40.625rem]">
				{/* Hero Text - Left Side */}
				<div className="flex flex-col justify-end gap-6 lg:gap-8 px-6 lg:px-10 py-10 lg:py-16 bg-white w-full md:w-[45%] lg:w-[32.5rem]">
					<p className="text-[#7c7c7c] tracking-[0.25rem] text-[0.6875rem] lg:text-xs font-bold font-geist">
						— FRONTEND DEVELOPER
					</p>
					<h1 className="text-[3.25rem] lg:text-[4.375rem] leading-[0.9] lg:leading-[0.88] tracking-[0.0325rem] lg:tracking-[0.04375rem] text-[#0f0f0f] font-staatliches">
						Crafting
						<br />
						thoughtful
						<br />
						digital
						<br />
						experiences.
					</h1>
					<p className="text-[#7c7c7c] text-sm lg:text-[0.875rem] leading-[1.6] tracking-[-0.00875rem] lg:tracking-[-0.0175rem] max-w-[21.875rem] font-geist">
						Based in Taipei. Building interfaces
						<br />
						that feel as good as they look.
					</p>
					<Button className="rounded-full bg-[#0f0f0f] text-white px-7 lg:px-8 py-2.5 lg:py-3 text-sm hover:bg-[#2c2825] transition-colors w-fit font-geist">
						View my work
					</Button>
				</div>

				{/* Hero Image - Right Side */}
				<div className="relative flex-1 bg-gray-100">
					<Image
						src="https://images.unsplash.com/photo-1571128973497-2066dda438bc?w=1080&q=80"
						alt="Coffee and notebook on wooden table"
						fill
						className="object-cover"
						sizes="(max-width: 48rem) 100vw, (max-width: 90rem) 55vw, 57.5rem"
						priority
					/>
				</div>
			</div>

			{/* Mobile Layout */}
			<div className="flex md:hidden flex-col">
				{/* Hero Image - Top */}
				<div className="relative h-[13.75rem] bg-gray-100">
					<Image
						src="https://images.unsplash.com/photo-1571128973497-2066dda438bc?w=800&q=80"
						alt="Coffee and notebook on wooden table"
						fill
						className="object-cover"
						sizes="100vw"
						priority
					/>
				</div>

				{/* Hero Text - Bottom */}
				<div className="flex flex-col gap-4 px-5 py-6 bg-white">
					<p className="text-[#7c7c7c] tracking-[0.1875rem] text-[0.625rem] font-bold font-geist">
						— FRONTEND DEVELOPER
					</p>
					<h1 className="text-[2.75rem] leading-[0.9] tracking-[0.0275rem] text-[#0f0f0f] font-staatliches">
						Crafting
						<br />
						thoughtful
						<br />
						digital
						<br />
						experiences.
					</h1>
					<p className="text-[#7c7c7c] text-[0.8125rem] leading-[1.6] tracking-[-0.008125rem] font-geist">
						Based in Taipei. Building interfaces that feel as good as they look.
					</p>
					<Button className="rounded-full bg-[#0f0f0f] text-white px-6 py-2.5 text-sm hover:bg-[#2c2825] transition-colors w-fit font-geist">
						View my work
					</Button>
				</div>
			</div>
		</section>
	);
}
