import { Footer, Navbar } from '@/containers/layouts';

export default function BlogLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="relative h-full bg-background">
			<Navbar />
			<main className="h-full">{children}</main>
		</div>
	);
}
