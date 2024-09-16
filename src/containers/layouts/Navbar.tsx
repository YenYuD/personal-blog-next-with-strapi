import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { type LinkConfig, navbarConfig, siteTitle } from '@/constants/uiConfig';
import { LinkItem, LanguageSwitcher } from '@/components/custom';
import Provider from '@/Provider';
import { GitHub, LinkedIn } from '@/components/custom/icons';

type Props = {
	config: LinkConfig;
};

const iconConfig = [
	{
		link: process.env.GIT_HUB_LINK,
		icon: <GitHub className="h-5 w-5 opacity-90" />,
	},
	{
		link: process.env.LINKEDIN_LINK,
		icon: <LinkedIn className="h-6 w-6 opacity-90" />,
	},
];

export const NAB_BAR_HEIGHT = 64;

export default function Navbar({ config }: Props) {
	return (
		<header className="fixed top-0 flex min-h-16 items-center gap-4 bg-transparent w-full px-4 md:px-6 max-h-16 z-[15]">
			<div className="mx-auto grid w-full max-w-6xl items-center lg:gap-12 md:grid-cols-[180px_1fr] lg:grid-cols-[150px_1fr]">
				<Link href="/" className="flex items-center gap-2 text-lg ">
					<Image src="/favicon.ico" alt="logo" width={36} height={36} />
					<span className='text-[1.25rem]'>{siteTitle}</span>
				</Link>
				<div className="max-w-6xl mx-auto flex flex-1 ml-[10px] items-center w-full justify-between">
					<nav className="hidden flex-col gap-6 text-lg md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
						{navbarConfig.map((item) => (
							<LinkItem key={item.href} label={item.label} href={item.href} />
						))}
						<Provider>
							<LanguageSwitcher />
						</Provider>
					</nav>
					<div className="hidden md:flex">
						{iconConfig.map((item) => (
							<Button key={item.link} variant="ghost" size="icon">
								<a target="_blank" href={item.link} key={item.link} rel="noreferrer">
									{item.icon}
								</a>
							</Button>
						))}
					</div>
				</div>
			</div>
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline" size="icon" className="shrink-0 md:hidden hover:text-foreground bg-transparent hover:bg-transparent border-none">
						<Menu className="h-7 w-7 bg-transparent" />
					</Button>
				</SheetTrigger>
				<SheetContent side="left">
					<nav className="grid gap-6 text-lg font-bold">
						<Link href="#" className="flex items-center gap-2 text-lg font-semibold">
							<Image src="/favicon.ico" alt="logo" width={32} height={32} />
							<span>{siteTitle}</span>
						</Link>
						{config.map((item) => (
							<LinkItem key={item.label} label={item.label} href={item.href} isSheet />
						))}
						<Provider>
							<LanguageSwitcher />
						</Provider>
						<div className="flex">
							{iconConfig.map((item) => (
								<Button key={item.link} variant="ghost" size="icon">
									<a target="_blank" href={item.link} key={item.link} rel="noreferrer">
										{item.icon}
									</a>
								</Button>
							))}
						</div>
					</nav>
				</SheetContent>
			</Sheet>
		</header>
	);
}
