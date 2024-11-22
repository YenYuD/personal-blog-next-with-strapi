import { Saira } from 'next/font/google';
import { GoogleTagManager } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '../../globals.css';
import { Navbar } from '@/containers/layouts';
import { navbarConfig, siteTitle } from '@/constants/uiConfig';
import type { Metadata } from 'next';
import Script from 'next/script';
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

export async function generateStaticParams() {
	return [{ lang: 'en-US' }, { lang: 'zh-TW' }];
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const lang = headers().get('referer')?.split('/')[3] ?? 'en-US';

	return (
		<html lang={lang}>
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
			</head>
			<GoogleTagManager gtmId="G-31W15B76BT" />
			<Script>
				{`window.dataLayer = window.dataLayer || [];
  			function gtag(){dataLayer.push(arguments);}
  			gtag('js', new Date());
  			gtag('config', 'G-31W15B76BT');
				`}
			</Script>
			<body className={`${saira.variable} font-saira relative min-h-[100svh]`}>
				<div className="relative">
					<Navbar config={navbarConfig} />
					{children}
					<SpeedInsights />
				</div>
			</body>
		</html>
	);
}
