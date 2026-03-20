import { siteTitle } from '@/constants/uiConfig';
import type { Metadata } from 'next';

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

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div className="relative">{children}</div>;
}
