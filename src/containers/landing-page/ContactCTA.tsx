import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { landingPageContent } from '@/constants/uiConfig';
import type { Language } from '@/service/type';

interface ContactCTAProps {
	lang: Language;
}

export default function ContactCTA({ lang }: ContactCTAProps) {
	const content = landingPageContent[lang].contact;
	return (
		<section id="contact" className="relative w-full bg-[#2c2825] lg:h-[35rem]">
			<div className="flex flex-col lg:flex-row lg:h-full">
				{/* Image - top on mobile/tablet, right on desktop */}
				<div className="relative order-first lg:order-last h-[13.75rem] md:h-[17.5rem] lg:h-full lg:w-[36.25rem] bg-gray-700">
					<Image
						src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1080&q=80"
						alt="Team collaboration"
						fill
						className="object-cover"
						sizes="(max-width: 1024px) 100vw, 36.25rem"
						loading="lazy"
					/>
				</div>

				{/* Text - bottom on mobile/tablet, left on desktop */}
				<div className="order-last lg:order-first flex flex-col justify-center gap-4 md:gap-5 lg:gap-7 px-5 md:px-6 lg:px-[3.75rem] py-8 md:py-10 lg:py-0 flex-1">
					<p className="text-[#7c7c7c] tracking-[3px] md:tracking-[4px] text-[10px] md:text-[11px] lg:text-xs font-bold font-geist">
						— {content.subtitle}
					</p>
					<h2 className="text-[50px] md:text-[62px] lg:text-[88px] leading-[0.88] tracking-[0.5px] md:tracking-[0.62px] lg:tracking-[0.88px] text-white font-staatliches">
						{content.title.map((line, index) => (
							<span key={line}>
								{line}
								{index < content.title.length - 1 && <br />}
							</span>
						))}
					</h2>
					<p className="text-[#7c7c7c] text-[13px] md:text-sm lg:text-[15px] leading-[1.6] tracking-[-0.13px] md:tracking-[-0.14px] lg:tracking-[-0.15px] lg:max-w-[420px] font-geist">
						<span className="lg:hidden">{content.description.mobile}</span>
						<span className="hidden lg:inline whitespace-pre-line">
							{content.description.desktop}
						</span>
					</p>
					<Button
						asChild
						className="rounded-full bg-white text-[#2c2825] px-6 md:px-8 lg:px-9 py-2.5 md:py-3 lg:py-3.5 text-sm font-medium hover:bg-gray-100 transition-colors w-fit font-geist"
					>
						<a
							href={process.env.NEXT_PUBLIC_LINKEDIN_LINK || 'https://linkedin.com'}
							target="_blank"
							rel="noopener noreferrer"
						>
							{content.cta}
						</a>
					</Button>
				</div>
			</div>
		</section>
	);
}
