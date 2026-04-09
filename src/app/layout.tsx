import type { Metadata } from 'next';
import { Saira, Staatliches, Noto_Serif_TC } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { GoogleTagManager } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_WEBSITE_LINK || 'https://emilydiao.blog'),
	title: {
		default: 'YenYu | Web Developer',
		template: '%s | YenYu',
	},
	description:
		'Frontend developer portfolio and blog featuring web development projects and technical articles.',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		siteName: 'YenYu',
		images: [
			{
				url: 'https://res.cloudinary.com/dyrubjejf/image/upload/v1774312061/personal-website_v7pteo.png',
				width: 1200,
				height: 630,
				alt: 'YenYu - Web Developer',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		images: [
			'https://res.cloudinary.com/dyrubjejf/image/upload/v1774312061/personal-website_v7pteo.png',
		],
	},
};

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

const notoSerifTC = Noto_Serif_TC({
	weight: ['600'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-noto-serif-tc',
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
				className={`${saira.variable} ${staatliches.variable} ${GeistSans.variable} ${notoSerifTC.variable} font-saira relative min-h-[100svh]`}
			>
				{children}
				<SpeedInsights />
				<Analytics />
			</body>
		</html>
	);
}
