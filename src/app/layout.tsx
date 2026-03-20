import { Saira, Staatliches } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { GoogleTagManager } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import Script from 'next/script';

const saira = Saira({
	weight: ['200', '300', '400', '500', '700'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-saira',
});

const staatliches = Staatliches({
	weight: '400',
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-staatliches',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link
					href="https://fonts.googleapis.com/css2?family=Jaro:opsz@6..72&display=swap"
					rel="stylesheet"
				/>
			</head>
			<GoogleTagManager gtmId="G-31W15B76BT" />
			<Script id="google-analytics">
				{`window.dataLayer = window.dataLayer || [];
  			function gtag(){dataLayer.push(arguments);}
  			gtag('js', new Date());
  			gtag('config', 'G-31W15B76BT');
				`}
			</Script>
			<body
				className={`${saira.variable} ${staatliches.variable} ${GeistSans.variable} font-saira relative min-h-[100svh]`}
			>
				{children}
				<SpeedInsights />
			</body>
		</html>
	);
}
