import { Saira } from 'next/font/google';
import { GoogleTagManager } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { Footer, Navbar } from '@/containers/layouts';
import { navbarConfig, siteTitle } from '@/constants/uiConfig';
import type { Metadata } from 'next';

const saira = Saira({
	weight: ['200', '300', '400', '500', '700'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-saira',
});

export const metadata: Metadata = {
	title: `${siteTitle} | Home Page`,
	description: 'Hi, I am Emily, a Frontend Developer. This is my personal website.',
	openGraph: {
		images: [
			{
				url: '/portfolio.png',
				width: 1200,
				height: 630,
			},
		],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en-US">
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<GoogleTagManager gtmId="GTM-M9BBDP5V" />
			</head>
			<body className={`${saira.variable} font-saira relative min-h-[100svh]`}>
				<noscript>
					<iframe
						src="https://www.googletagmanager.com/ns.html?id=GTM-M9BBDP5V"
						height="0"
						width="0"
						style={{ display: 'none', visibility: 'hidden' }}
						title="Google Tag Manager"
					/>
				</noscript>
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
