import type { ArticleType, Language } from '@/service/type';

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
		imgSrc: '',
		year: '2025',
		alt: 'AI Note Generator',
		title: 'AI Note Generator',
		description:
			'AI Note Generator is a web application that uses AI to generate notes from text. Markdown/PDF are supported.',
		techStack: [
		'React',
		'Vite',
		'Node.js',
		'Express.js',
		'Gemini API',
		'GitHub Action',
		],
		link: 'https://ai-note-generator-ten.vercel.app',
		repo: 'https://github.com/YenYuD/ai-note-generator',
	},
	{
		id: 1,
		imgSrc: '',
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
		imgSrc: '',
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
		imgSrc: '',
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
		imgSrc: '',
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

export const categories = {
	'en-US': [
		{ id: 1, name: 'frontend', path: 'frontend', articles: [] },
		{ id: 2, name: 'uncategorized', path: 'uncategorized', articles: [] },
	],
	'zh-TW': [
		{ id: 1, name: '前端', path: 'frontend', articles: [] },
		{ id: 2, name: '未分類', path: 'uncategorized', articles: [] },
	],
};

export const categoriesWithPostsCount = (posts: ArticleType[], lang: Language) => {
	return categories[lang].map((category) => ({
		...category,
		articles: posts.filter((post) => post.attributes.category === category.path).length,
	}));
};

// Landing page translations
export const landingPageContent = {
	'en-US': {
		hero: {
			subtitle: 'SOFTWARE DEVELOPER',
			title: ['Not just a coder','but a problem solver'],
			description: 'Hi, I\'m YenYu. Currently based in Taipei, Taiwan. I\'m a developer who enjoys building works that solve real-world problems.',
			cta: 'View my work',
		},
		about: {
			subtitle: 'ABOUT ME',
			title: ['A quiet passion', 'for smoother workflows.'],
			description: {
				desktop:
					"I’m a software developer with 2.5+ years of experience in React, Next.js, and TypeScript. I’m passionate about creating web applications with seamless user experiences, AI workflow integrations and always exploring new technologies.",
				tablet:
					"I’m a software developer with 2.5+ years of experience in React, Next.js, and TypeScript. I’m passionate about creating web applications with seamless user experiences, AI workflow integrations and always exploring new technologies.",
				mobile:
					"I’m a software developer with 2.5+ years of experience in React, Next.js, and TypeScript. I’m passionate about creating web applications with seamless user experiences, AI workflow integrations and always exploring new technologies.",
			},
			cta: 'My Blog →',
		},
		projects: {
			subtitle: 'SELECTED PROJECTS',
			items: [
				{
					number: '01',
					title: 'PERSONAL WEBSITE',
					description:
						'Personal website with personal blog. Utilized Pencil MCP, Next.js App Router, and shadcn UI library.',
					tags: ['Next.js', 'TypeScript', 'TailwindCSS', 'Pencil MCP', 'Github Action', 'Husky', 'Vercel'],
					year: '2026',
				},
				{
					number: '02',
					title: 'AI NOTE GENERATOR',
					description:
						'AI Note Generator is a web application that uses AI to generate notes from text. Markdown/PDF are supported.',
					tags: ['React', 'Vite', 'Node.js', 'Express.js', 'Gemini API', 'GitHub Action'],
					year: '2025',
				},
				{
					number: '03',
					title: 'Personal Blog',
					description:
						'Personal blog with react-markdown integration. Bilingual support.',
					tags: ['Next.js', 'TypeScript', 'TailwindCSS', 'Strapi', 'Vitest'],
					year: '2024',
				},
				{
					number: '04',
					title: 'KEYPO SUITE',
					description:
						'A client-facing portal that integrates three distinct products for comprehensive account management.',
					tags: ['Next.js', 'TypeScript', 'React-hook-form', 'MUI', 'React-Query'],
					year: '2024',
				},
				{
					number: '05',
					title: 'IF BLACK BEARS DISAPPEARED',
					description: 'A Static Website Dedicated to the Conservation of the Formosan Black Bear.',
					tags: ['Next.js', 'GSAP', 'Scroll Trigger', 'TailwindCSS'],
					year: '2023',
				},
				{
					number: '06',
					title: 'IF BOOKSTORES DISAPPEARED',
					description:
						'A Static Website Comprising Analytical Reports on Physical Bookstores and Printed Books.',
					tags: ['Next.js', 'GSAP', 'Scroll Trigger', 'AOS'],
					year: '2023',
				},
			],
		},
		contact: {
			subtitle: 'AVAILABLE FOR WORK',
			title: ["Let's Connect!"],
			description: {
				desktop: 'Open to freelance projects, full-time roles,\nand creative collaborations all around the world.',
				tablet: 'Open to freelance projects, full-time roles, and creative collaborations all around the world.',
				mobile: 'Open to freelance projects and creative collaborations all around the world.',
			},
			cta: 'Get in touch',
		},
	},
	'zh-TW': {
		hero: {
			subtitle: 'SOFTWARE DEVELOPER',
			title: ['Not just a coder','but a problem solver'],
			description: 'Hi, I\'m YenYu. Currently based in Taipei, Taiwan. I\'m a developer who enjoys building works that solve real-world problems.',
			cta: 'View my work',
		},
		about: {
			subtitle: 'ABOUT ME',
			title: ['A quiet passion', 'for smoother workflows.'],
			description: {
				desktop:
					"I’m a software developer with 2.5+ years of experience in React, Next.js, and TypeScript. I’m passionate about creating web applications with seamless user experiences, AI workflow integrations and always exploring new technologies.",
				tablet:
					"I’m a software developer with 2.5+ years of experience in React, Next.js, and TypeScript. I’m passionate about creating web applications with seamless user experiences, AI workflow integrations and always exploring new technologies.",
				mobile:
					"I’m a software developer with 2.5+ years of experience in React, Next.js, and TypeScript. I’m passionate about creating web applications with seamless user experiences, AI workflow integrations and always exploring new technologies.",
			},
			cta: 'My Blog →',
		},
		projects: {
			subtitle: 'SELECTED PROJECTS',
			items: [
				{
					number: '01',
					title: 'PERSONAL WEBSITE',
					description:
						'Personal website with personal blog. Utilized Pencil MCP, Next.js App Router, and shadcn UI library.',
					tags: ['Next.js', 'TypeScript', 'TailwindCSS', 'Pencil MCP', 'Github Action', 'Husky', 'Vercel'],
					year: '2026',
				},
				{
					number: '02',
					title: 'AI NOTE GENERATOR',
					description:
						'AI Note Generator is a web application that uses AI to generate notes from text. Markdown/PDF are supported.',
					tags: ['React', 'Vite', 'Node.js', 'Express.js', 'Gemini API', 'GitHub Action'],
					year: '2025',
				},
				{
					number: '03',
					title: 'Personal Blog',
					description:
						'Personal blog with react-markdown integration. Bilingual support.',
					tags: ['Next.js', 'TypeScript', 'TailwindCSS', 'Strapi', 'Vitest'],
					year: '2024',
				},
				{
					number: '04',
					title: 'KEYPO SUITE',
					description:
						'A client-facing portal that integrates three distinct products for comprehensive account management.',
					tags: ['Next.js', 'TypeScript', 'React-hook-form', 'MUI', 'React-Query'],
					year: '2024',
				},
				{
					number: '05',
					title: 'IF BLACK BEARS DISAPPEARED',
					description: 'A Static Website Dedicated to the Conservation of the Formosan Black Bear.',
					tags: ['Next.js', 'GSAP', 'Scroll Trigger', 'TailwindCSS'],
					year: '2023',
				},
				{
					number: '06',
					title: 'IF BOOKSTORES DISAPPEARED',
					description:
						'A Static Website Comprising Analytical Reports on Physical Bookstores and Printed Books.',
					tags: ['Next.js', 'GSAP', 'Scroll Trigger', 'AOS'],
					year: '2023',
				},
			],
		},
		contact: {
			subtitle: 'AVAILABLE FOR WORK',
			title: ["Let's Connect!"],
			description: {
				desktop: 'Open to freelance projects, full-time roles,\nand creative collaborations all around the world.',
				tablet: 'Open to freelance projects, full-time roles, and creative collaborations all around the world.',
				mobile: 'Open to freelance projects and creative collaborations all around the world.',
			},
			cta: 'Get in touch',
		},
	},
};
