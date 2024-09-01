import { Merriweather, Saira } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/containers/layouts';
import { navbarConfig } from '@/constants/uiConfig';

const merriWheartherSans = Merriweather({
	weight: ['400', '700'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-merriweather',
});

const saira = Saira({
	weight: ['400', '700'],
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
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
			</head>
			<body className={`${merriWheartherSans.variable} ${saira.variable} font-merri`}>
				<Navbar config={navbarConfig} />
				{children}
			</body>
		</html>
	);
}
