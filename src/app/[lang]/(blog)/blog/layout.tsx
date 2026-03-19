import { Footer, Navbar } from '@/containers/layouts';
import { navbarConfig } from '@/constants/uiConfig';

export default function BlogLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="relative h-full bg-background">
			<Navbar config={navbarConfig} />
			<main className="h-full">{children}</main>
		</div>
	);
}
