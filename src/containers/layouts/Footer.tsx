import Link from 'next/link';
import CheckerboardPattern from '@/components/custom/CheckerboardPattern';

export default function Footer() {
	const footerLinks = [
		{ id: 1, title: 'Navigation', links: ['Home', 'About', 'Projects', 'Blog'] },
		{ id: 2, title: 'Connect', links: ['GitHub', 'LinkedIn', 'Twitter', 'Email'] },
	];

	const THIS_YEAR = new Date().getFullYear();

	return (
		<footer className="relative w-full bg-white">
			{/* Checkerboard Pattern Border */}
			<CheckerboardPattern />

			{/* Footer Links Section */}
			<div className="flex justify-between px-5 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
				{footerLinks.map((section) => (
					<div key={section.id} className="pr-10 md:pr-16 lg:pr-20">
						<h4 className="text-[#0f0f0f] text-[0.6875rem] md:text-xs lg:text-sm font-bold mb-1.5 md:mb-1.5 lg:mb-2 tracking-wide font-geist">
							{section.title}
						</h4>
						<ul className="flex flex-col gap-1.5 md:gap-1.5 lg:gap-2">
							{section.links.map((link) => (
								<li key={link}>
									<Link
										href={`#${link.toLowerCase()}`}
										className="text-[#7c7c7c] text-[0.6875rem] md:text-xs lg:text-sm hover:text-[#0f0f0f] transition-colors font-geist md:font-geist lg:font-jaro"
									>
										{link}
									</Link>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>

			{/* Footer Branding Section */}
			<div className="px-5 md:px-6 lg:px-8 pb-4 md:pb-5 lg:pb-6">
				<h1 className="text-[#0f0f0f] text-[5.625rem] md:text-[8.125rem] lg:text-[12.5rem] tracking-[0.0625rem] md:tracking-[0.09375rem] lg:tracking-[0.125rem] leading-[0.84] mb-1.5 md:mb-2 lg:mb-3 font-jaro">
					YenYu.
				</h1>
				<p className="text-[#7c7c7c] text-[0.6875rem] md:text-xs lg:text-[0.8125rem] tracking-[-0.006875rem] md:tracking-[-0.0075rem] lg:tracking-[-0.008125rem] leading-[1.4] font-geist">
					YenYu © {THIS_YEAR} · Taipei, Taiwan{' '}
					<span className="hidden lg:inline">· All rights reserved</span>
				</p>
			</div>
		</footer>
	);
}
