import Link from 'next/link';
import CheckerboardPattern from '@/components/custom/CheckerboardPattern';

export default function Footer() {
	const footerLinks = [
		{ id: 1, title: 'Navigation', links: ['Home', 'About', 'Projects', 'Blog'] },
		{ id: 2, title: 'Connect', links: ['GitHub', 'LinkedIn', 'Twitter', 'Email'] },
	];

	return (
		<footer className="relative w-full bg-white">
			{/* Checkerboard Pattern Border */}
			<CheckerboardPattern />

			{/* Desktop Footer Content */}
			<div className="hidden lg:block">
				<div className="flex justify-between px-8 py-10">
					{footerLinks.map((section) => (
						<div key={section.id} className="pr-20">
							<h4 className="text-[#0f0f0f] text-sm font-bold mb-2 tracking-wide font-geist">
								{section.title}
							</h4>
							<ul className="flex flex-col gap-2">
								{section.links.map((link) => (
									<li key={link}>
										<Link
											href={`#${link.toLowerCase()}`}
											className="text-[#7c7c7c] text-sm hover:text-[#0f0f0f] transition-colors font-"
										>
											{link}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="px-8 pb-6">
					<h1 className="text-[#0f0f0f] text-[12.5rem] tracking-[0.125rem] leading-[0.84] mb-3 font-jaro">
						YenYu.
					</h1>
					<p className="text-[#7c7c7c] text-[0.8125rem] tracking-[-0.008125rem] leading-[1.4] font-geist">
						YenYu © 2025 · Taipei, Taiwan · All rights reserved.
					</p>
				</div>
			</div>

			{/* Tablet Footer Content */}
			<div className="hidden md:block lg:hidden">
				<div className="flex justify-between px-6 py-8">
					{footerLinks.map((section) => (
						<div key={section.id} className="pr-16">
							<h4 className="text-[#0f0f0f] text-xs font-bold mb-1.5 tracking-wide font-geist">
								{section.title}
							</h4>
							<ul className="flex flex-col gap-1.5">
								{section.links.map((link) => (
									<li key={link}>
										<Link
											href={`#${link.toLowerCase()}`}
											className="text-[#7c7c7c] text-xs hover:text-[#0f0f0f] transition-colors font-geist"
										>
											{link}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="px-6 pb-5">
					<h1 className="text-[#0f0f0f] text-[8.125rem] tracking-[0.09375rem] leading-[0.84] mb-2 font-jaro">
						YenYu.
					</h1>
					<p className="text-[#7c7c7c] text-xs tracking-[-0.0075rem] leading-[1.4] font-geist">
						YenYu © 2025 · Taipei, Taiwan
					</p>
				</div>
			</div>

			{/* Mobile Footer Content */}
			<div className="block md:hidden">
				<div className="flex justify-between px-5 py-6">
					{footerLinks.map((section) => (
						<div key={section.id} className="pr-10">
							<h4 className="text-[#0f0f0f] text-[0.6875rem] font-bold mb-1.5 tracking-wide font-geist">
								{section.title}
							</h4>
							<ul className="flex flex-col gap-1.5">
								{section.links.map((link) => (
									<li key={link}>
										<Link
											href={`#${link.toLowerCase()}`}
											className="text-[#7c7c7c] text-[0.6875rem] hover:text-[#0f0f0f] transition-colors font-geist"
										>
											{link}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="px-5 pb-4">
					<h1 className="text-[#0f0f0f] text-[5.625rem] tracking-[0.0625rem] leading-[0.84] mb-1.5 font-jaro">
						YenYu.
					</h1>
					<p className="text-[#7c7c7c] text-[0.6875rem] tracking-[-0.006875rem] leading-[1.4] font-geist">
						YenYu © 2025 · Taipei, Taiwan
					</p>
				</div>
			</div>
		</footer>
	);
}
