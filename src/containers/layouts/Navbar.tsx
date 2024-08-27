import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { type LinkConfig, navbarConfig } from '@/constants/uiConfig';
import { LinkItem, LanguageSwitcher } from '@/components/custom';
import Provider from '@/Provider';

type Props = {
	config: LinkConfig;
};

export default function Navbar({ config }: Props) {
	return (
		<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
			<div className="max-w-6xl mx-auto flex flex-1">
				<nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
					{navbarConfig.map((item) => (
						<LinkItem key={item.href} label={item.label} href={item.href} />
					))}
					<Provider>
						<LanguageSwitcher />
					</Provider>
				</nav>
			</div>
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline" size="icon" className="shrink-0 md:hidden">
						<Menu className="h-5 w-5" />
					</Button>
				</SheetTrigger>
				<SheetContent side="left">
					<nav className="grid gap-6 text-lg font-medium">
						<Link href="#" className="flex items-center gap-2 text-lg font-semibold">
							<Image src="/favicon.ico" alt="logo" width={32} height={32} />
							<span>Emily.dev.com</span>
						</Link>
						{config.map((item) => (
							<LinkItem key={item.href} label={item.label} href={item.href} />
						))}
						<Provider>
							<LanguageSwitcher />
						</Provider>
					</nav>
				</SheetContent>
			</Sheet>
		</header>
	);
}
