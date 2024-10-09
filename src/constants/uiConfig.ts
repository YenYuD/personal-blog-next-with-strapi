import PortfolioImg from '@/assets/portfolio.png';
import KeypoSuiteImg from '@/assets/Keypo_suite.jpeg';
import FormosaBlackBearImg from '@/assets/formosa_blackbear.jpeg';
import BookStoreImg from '@/assets/bookstore.jpeg';

export const navbarConfig = [
	{
		label: 'Home',
		href: '/',
	},
	{
		label: 'Blog',
		href: '/blog/all',
	},
];

export type LinkConfig = typeof navbarConfig;

export const languageMapping = {
	'en-US': 'en',
	'zh-TW': 'zh-Hant-TW',
};

export const textAnimationConfig: [string, string][] = [
	['フロントエンド', 'エンジニア。'],
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
		repo: 'https://github.com/YenYuD/personal-blog-next-with-strapi',
	},
	{
		id: 2,
		imgSrc: KeypoSuiteImg,
		year: '2024',
		alt: 'Portal Image',
		title: 'KEYPO SUITE',
		description:
			'A client-facing portal that integrates three distinct products for comprehensive account management.',
		techStack: ['Next.js', 'TypeScript', 'React-hook-form', 'MUI', 'React-Query', 'Docker', 'Jest'],
		link: 'https://suite-info.keypo.ai/en',
		repo: '',
	},
	{
		id: 3,
		imgSrc: FormosaBlackBearImg,
		year: '2023',
		alt: 'FormosaBlackBearImg',
		title: 'If Black Bears Disappeared',
		description: 'A Static Website Dedicated to the Conservation of the Formosan Black Bear.',
		techStack: ['Next.js', 'GSAP', 'Scroll Trigger', 'TailwindCSS', 'AOS', 'Responsive Web Design'],
		link: 'https://dailyview.tw/blackbear',
		repo: '',
	},
	{
		id: 4,
		imgSrc: BookStoreImg,
		year: '2023',
		alt: 'FormosaBlackBearImg',
		title: 'If Bookstores Disappeared',
		description:
			'A Static Website Comprising Analytical Reports on Physical Bookstores and Printed Books.',
		techStack: ['Next.js', 'GSAP', 'Scroll Trigger', 'TailwindCSS', 'AOS', 'Responsive Web Design'],
		link: 'https://dailyview.tw/lostbooks',
		repo: '',
	},
];
