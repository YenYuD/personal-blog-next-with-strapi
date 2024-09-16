export const navbarConfig = [
	{
		label: 'Home',
		href: '/',
	},
	{
		label: 'About',
		href: '/about',
	},
	{
		label: 'Blog',
		href: '/blog/all',
	},
];

export const homePageSidebarConfig = [
	{
		label: 'About',
		href: '#about',
	},
	{
		label: 'Tech Stack',
		href: '#tech-stack',
	},
	{
		label: 'Projects',
		href: '#projects',
	},
	{
		label: 'Contact',
		href: '#contact',
	},
];

export type LinkConfig = typeof homePageSidebarConfig;

export const languageMapping = {
	en: 'en',
	'zh-TW': 'zh-Hant-TW',
};

export const textAnimationConfig: [string, string][] = [
	['フロントエンド', 'エンジニア。'],
	['Ingénieur', 'Front-end.'],
	['프론트엔드', '엔지니어.'],
	['Frontend', 'Developer.'],
];

export const siteTitle = 'Emily.Dev';
