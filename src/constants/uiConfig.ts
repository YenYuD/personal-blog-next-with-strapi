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
		href: '/blog',
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

export const langaugeMapping = {
	en: 'en',
	'zh-TW': 'zh-Hant-TW',
};
