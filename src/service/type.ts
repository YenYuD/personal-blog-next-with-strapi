import type { languageMapping } from '@/constants/uiConfig';

export type ArticleType = {
	id: number;
	attributes: {
		title: string;
		publish_at: string;
		content: string;
		createdAt: string;
		updatedAt: string;
		publishedAt: string;
		locale: string;
	};
};

export type Response<T> = {
	res: {
		data: T;
	};
};

export type ServerResponse<T> = {
	data: T;
};

export type LanguageType = {
	id: number;
	attributes: {
		label: string;
		value: string;
		order: number;
		createdAt?: string;
		updatedAt?: string;
		publishedAt?: string;
	};
};

export type SidebarsType = {
	id: number;
	attributes: {
		title: string;
		order: number;
		createdAt: string;
		updatedAt: string;
		publishedAt: string;
		locale: string;
		sub: SubItemType[];
	};
};

export type SubItemType = {
	id: number;
	_component: string;
	title: string;
	sub: SecondSubItemType[];
};

export type SecondSubItemType = {
	id: number;
	title: string;
	articles: {
		data: ArticleType[];
	};
};

export type Language = keyof typeof languageMapping;
