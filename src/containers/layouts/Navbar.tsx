'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import CheckerboardPattern from '@/components/custom/CheckerboardPattern';
import LanguageSwitcher from '@/components/custom/LanguageSwitcher';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

export default function Navbar() {
	const navLinks = ['About', 'Projects', 'Blog', 'Contact'];
	const [isScrolled, setIsScrolled] = useState(false);
	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const pathname = usePathname();
	const lang = pathname.split('/')[1] || 'en-US';
	const isBlogPage = pathname?.includes('/blog');
	const smoothScroll = useSmoothScroll();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleSmoothScroll = (
		e: React.MouseEvent<HTMLAnchorElement>,
		href: string,
		closeSheet = false,
	) => {
		smoothScroll(e, href);
		if (closeSheet) setIsSheetOpen(false);
	};

	return (
		<>
			{/* Desktop & Tablet Navigation */}
			<nav
				className={`hidden md:flex items-center justify-between w-full px-6 lg:px-[1.875rem] py-3.5 lg:py-4 sticky top-0 z-50 transition-all duration-300 ${
					isScrolled
						? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200'
						: 'bg-white border-b border-transparent'
				}`}
			>
				<Link
					href={`/${lang}`}
					className="text-[#0f0f0f] text-[2.125rem] lg:text-[2.625rem] tracking-[-2px] lg:tracking-[0.01rem] leading-[0.84] font-jaro transition-transform hover:scale-105"
				>
					YenYu.
				</Link>
				<div className="flex items-center gap-5 lg:gap-8">
					{!isBlogPage &&
						navLinks.map((link) => {
							const href = link === 'Blog' ? `/${lang}/blog/all` : `#${link.toLowerCase()}`;
							return (
								<Link
									key={link}
									href={href}
									onClick={(e) => handleSmoothScroll(e, href)}
									className="relative text-[#7c7c7c] text-lg lg:text-[1.375rem] tracking-[-0.0225rem] lg:tracking-[0.01rem] leading-[1.39] font-jaro group"
								>
									{link}
									<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#0f0f0f] transition-all duration-300 group-hover:w-full" />
								</Link>
							);
						})}
					{isBlogPage && <LanguageSwitcher />}
				</div>
			</nav>

			{/* Mobile Navigation */}
			<nav className="flex md:hidden items-center justify-between w-full bg-white px-5 py-3.5 sticky top-0 z-50">
				<Link
					href={`/${lang}`}
					className="text-[#0f0f0f] text-[1.75rem] tracking-[-1.5px] leading-[0.84] font-jaro"
				>
					YenYu.
				</Link>
				<div className="flex items-center gap-3">
					{isBlogPage ? (
						<LanguageSwitcher />
					) : (
						<Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
							<SheetTrigger asChild>
								<button
									type="button"
									className="flex flex-col gap-[0.3125rem] p-1"
									aria-label="Menu"
								>
									<span className="w-6 h-0.5 bg-[#0f0f0f]" />
									<span className="w-[1.125rem] h-0.5 bg-[#0f0f0f]" />
									<span className="w-6 h-0.5 bg-[#0f0f0f]" />
								</button>
							</SheetTrigger>
							<SheetContent side="right" className="w-[300px] bg-white">
								<SheetHeader>
									<SheetTitle className="text-[#0f0f0f] text-2xl font-jaro text-left">
										Menu
									</SheetTitle>
								</SheetHeader>
								<div className="flex flex-col gap-6 mt-8">
									{navLinks.map((link) => {
										const href = link === 'Blog' ? `/${lang}/blog/all` : `#${link.toLowerCase()}`;
										return (
											<Link
												key={link}
												href={href}
												onClick={(e) => handleSmoothScroll(e, href, true)}
												className="text-[#7c7c7c] text-xl hover:text-[#0f0f0f] transition-colors font-jaro border-b border-gray-100 pb-3"
											>
												{link}
											</Link>
										);
									})}
								</div>
							</SheetContent>
						</Sheet>
					)}
				</div>
			</nav>

			{/* Checkerboard Pattern Border */}
			<CheckerboardPattern />
		</>
	);
}
