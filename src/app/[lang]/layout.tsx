import { Saira, Staatliches, Noto_Serif_TC } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { GoogleTagManager } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';
import { languageMapping } from '@/constants/uiConfig';
import type { Language } from '@/service/type';
import '../globals.css';

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

export async function generateStaticParams() {
	return [{ lang: 'en-US' }, { lang: 'zh-TW' }];
}

interface LangLayoutProps {
	children: React.ReactNode;
	params: { lang: Language };
}

export default function LangLayout({ children, params }: LangLayoutProps) {
	const htmlLang = languageMapping[params.lang] ?? 'en';
	return (
		<html lang={htmlLang} suppressHydrationWarning>
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
