import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function ContactCTA() {
	return (
		<section className="relative w-full bg-[#2c2825]">
			{/* Desktop Layout - Horizontal */}
			<div className="hidden lg:flex lg:flex-row h-[35rem]">
				{/* CTA Text - Left Side */}
				<div className="flex flex-col justify-center gap-7 px-[3.75rem] flex-1">
					<p className="text-[#7c7c7c] tracking-[4px] text-xs font-bold font-geist">
						— AVAILABLE FOR WORK
					</p>
					<h2 className="text-[88px] leading-[0.88] tracking-[0.88px] text-white font-staatliches">
						Let's build
						<br />
						something
						<br />
						beautiful.
					</h2>
					<p className="text-[#7c7c7c] text-[15px] leading-[1.6] tracking-[-0.15px] max-w-[420px] font-geist">
						Open to freelance projects, full-time roles,
						<br />
						and creative collaborations in Taipei.
					</p>
					<Button className="rounded-full bg-white text-[#2c2825] px-9 py-3.5 text-sm font-medium hover:bg-gray-100 transition-colors w-fit font-geist">
						Get in touch
					</Button>
				</div>

				{/* CTA Image - Right Side */}
				<div className="relative w-[36.25rem] bg-gray-700">
					<Image
						src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1080&q=80"
						alt="Team collaboration"
						fill
						className="object-cover"
						sizes="36.25rem"
						loading="lazy"
					/>
				</div>
			</div>

			{/* Tablet Layout - Vertical Stacked */}
			<div className="hidden md:flex lg:hidden flex-col">
				{/* CTA Image - Top */}
				<div className="relative h-[17.5rem] bg-gray-700">
					<Image
						src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
						alt="Team collaboration"
						fill
						className="object-cover"
						sizes="100vw"
						loading="lazy"
					/>
				</div>

				{/* CTA Text - Bottom */}
				<div className="flex flex-col gap-5 px-6 py-10">
					<p className="text-[#7c7c7c] tracking-[4px] text-[11px] font-bold font-geist">
						— AVAILABLE FOR WORK
					</p>
					<h2 className="text-[62px] leading-[0.88] tracking-[0.62px] text-white font-staatliches">
						Let's build
						<br />
						something
						<br />
						beautiful.
					</h2>
					<p className="text-[#7c7c7c] text-sm leading-[1.6] tracking-[-0.14px] font-geist">
						Open to freelance projects, full-time roles, and creative collaborations.
					</p>
					<Button className="rounded-full bg-white text-[#2c2825] px-8 py-3 text-sm font-medium hover:bg-gray-100 transition-colors w-fit font-geist">
						Get in touch
					</Button>
				</div>
			</div>

			{/* Mobile Layout - Vertical Stacked */}
			<div className="flex md:hidden flex-col">
				{/* CTA Image - Top */}
				<div className="relative h-[13.75rem] bg-gray-700">
					<Image
						src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80"
						alt="Team collaboration"
						fill
						className="object-cover"
						sizes="100vw"
						loading="lazy"
					/>
				</div>

				{/* CTA Text - Bottom */}
				<div className="flex flex-col gap-4 px-5 py-8">
					<p className="text-[#7c7c7c] tracking-[3px] text-[10px] font-bold font-geist">
						— AVAILABLE FOR WORK
					</p>
					<h2 className="text-[50px] leading-[0.88] tracking-[0.5px] text-white font-staatliches">
						Let's build
						<br />
						something
						<br />
						beautiful.
					</h2>
					<p className="text-[#7c7c7c] text-[13px] leading-[1.6] tracking-[-0.13px] font-geist">
						Open to freelance projects and creative collaborations.
					</p>
					<Button className="rounded-full bg-white text-[#2c2825] px-6 py-2.5 text-sm font-medium hover:bg-gray-100 transition-colors w-fit font-geist">
						Get in touch
					</Button>
				</div>
			</div>
		</section>
	);
}
