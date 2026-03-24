import type { Metadata } from 'next';
import type { ReactNode } from 'react';

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

// The root layout delegates <html> and <body> to app/[lang]/layout.tsx
// so that the lang attribute can be set dynamically per locale.
export default function RootLayout({ children }: { children: ReactNode }) {
	return children as React.ReactElement;
}
