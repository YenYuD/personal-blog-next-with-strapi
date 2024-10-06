import { Saira } from 'next/font/google';
import { GoogleTagManager } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '../../../globals.css';
import { Footer, Navbar } from '@/containers/layouts';
import { navbarConfig } from '@/constants/uiConfig';
import Script from 'next/script';
import { headers } from 'next/headers';

const saira = Saira({
	weight: ['200', '300', '400', '500', '700'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-saira',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const lang = headers().get('referer')?.split('/')[3] ?? 'en-US';

	return (
		<html lang={lang} className="h-full">
			<head>
				<link rel="icon" href="/favicon.ico" />
			</head>
			<GoogleTagManager gtmId="G-31W15B76BT" />
			<Script>
				{`window.dataLayer = window.dataLayer || [];
  			function gtag(){dataLayer.push(arguments);}
  			gtag('js', new Date());
  			gtag('config', 'G-31W15B76BT');
				`}
			</Script>
			<body className={`${saira.variable} font-saira relative bg-background h-full`}>
				<div className="relative h-full">
					<Navbar config={navbarConfig} />
					<main className="h-full">{children}</main>
					<SpeedInsights />
					<Footer />
				</div>
			</body>
		</html>
	);
}
