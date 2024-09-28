import PortfolioImg from '@/assets/portfolio.png';

export const navbarConfig = [
	{
		label: 'Home',
		href: '/',
	},
	// {
	// 	label: 'Blog',
	// 	href: '/blog/all',
	// }, // Commented out because the blog has not been completed yet
];

export type LinkConfig = typeof navbarConfig;

export const languageMapping = {
	'en-US': 'en',
	'zh-TW': 'zh-Hant-TW',
};

export const textAnimationConfig: [string, string][] = [
	['フロントエンド', 'エンジニア。'],
	['Ingénieur', 'Front-end.'],
	['프론트엔드', '엔지니어.'],
	['Frontend', 'Developer.'],
];

export const siteTitle = 'Emily.Dev';

export const backGroundColorSettings = [
	{
		bgColor1: '43 80% 69%',
		bgColor2: '254 55% 90%',
	},
	{
		bgColor1: '32 89% 72%',
		bgColor2: '184 59% 72%',
	},
	{
		bgColor1: '38 59% 65%',
		bgColor2: '168 44% 68%',
	},
];

export const cardInfo = [
	{
		id: 1,
		imgSrc: PortfolioImg,
		year: '2024',
		alt: 'Portfolio Image',
		title: 'Frontend Portfolio',
		description:
			'Frontend portfolio with personal blog. Integrate with Strapi CMS, ReactMarkdown and shadcn UI library.',
		techStack: [
			'Next.js',
			'TypeScript',
			'TailwindCSS',
			'Strapi',
			'Vitest',
			'Github Action',
			'Husky',
			'Heroku',
		],
		link: process.env.NEXT_PUBLIC_WEBSITE_LINK,
	},
];
