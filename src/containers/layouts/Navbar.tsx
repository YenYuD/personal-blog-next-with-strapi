import Link from 'next/link';
import CheckerboardPattern from '@/components/custom/CheckerboardPattern';

export default function Navbar() {
	const navLinks = ['About', 'Projects', 'Blog', 'Contact'];

	return (
		<>
			{/* Desktop & Tablet Navigation */}
			<nav className="hidden md:flex items-center justify-between w-full bg-white px-6 lg:px-[1.875rem] py-3.5 lg:py-4 sticky top-0 z-50 border-b border-transparent">
				<Link
					href="/"
					className="text-[#0f0f0f] text-[2.125rem] lg:text-[2.625rem] tracking-[-2px] lg:tracking-[-2.5px] leading-[0.84] font-jaro"
				>
					YenYu.
				</Link>
				<div className="flex items-center gap-5 lg:gap-8">
					{navLinks.map((link) => (
						<Link
							key={link}
							href={`#${link.toLowerCase()}`}
							className="text-[#7c7c7c] text-lg lg:text-[1.375rem] tracking-[-0.0225rem] lg:tracking-[0.01rem] leading-[1.39] hover:text-[#0f0f0f] transition-colors font-jaro"
						>
							{link}
						</Link>
					))}
				</div>
			</nav>

			{/* Mobile Navigation */}
			<nav className="flex md:hidden items-center justify-between w-full bg-white px-5 py-3.5 sticky top-0 z-50">
				<Link
					href="/"
					className="text-[#0f0f0f] text-[1.75rem] tracking-[-1.5px] leading-[0.84] font-jaro"
				>
					YenYu.
				</Link>
				<button type="button" className="flex flex-col gap-[0.3125rem] p-1" aria-label="Menu">
					<span className="w-6 h-0.5 bg-[#0f0f0f]" />
					<span className="w-[1.125rem] h-0.5 bg-[#0f0f0f]" />
					<span className="w-6 h-0.5 bg-[#0f0f0f]" />
				</button>
			</nav>

			{/* Checkerboard Pattern Border */}
			<CheckerboardPattern />
		</>
	);
}
