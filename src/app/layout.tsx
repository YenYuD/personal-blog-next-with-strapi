import { Saira } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { Footer, Navbar } from '@/containers/layouts';
import { navbarConfig, siteTitle } from '@/constants/uiConfig';
import type { Metadata } from 'next';
import { headers } from 'next/headers';

const saira = Saira({
	weight: ['200', '300', '400', '500', '700'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-saira',
});

export const metadata: Metadata = {
	title: `${siteTitle} | Home Page`,
	description: '...',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const lang = headers().get('referer')?.split('/')[3] ?? 'en-US';

	return (
		<html lang={lang} className="h-full">
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
			</head>
			<body className={`${saira.variable} font-saira relative h-full min-h-[100svh]`}>
				<div className="h-full relative">
					<Navbar config={navbarConfig} />
					{children}
					<Footer />
					<SpeedInsights />
				</div>
			</body>
		</html>
	);
}
