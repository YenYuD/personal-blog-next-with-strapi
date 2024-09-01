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
		description: string;
		visibility: boolean;
		cover_image: CoverImage;
	};
};

type CoverImage = {
	data: {
		id: number;
		attributes: {
			name: string;
			width: number;
			height: number;
			hash: string;
			url: string;
		};
	} | null;
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
	path: string;
	categories: {
		data: CategoryType[];
	};
};

export type CategoryType = {
	id: number;
	attributes: {
		name: string;
		title: string;
		createdAt?: string;
		updatedAt?: string;
		publishedAt?: string;
		locale: string;
		visibility: boolean;
		path: string;
	};
};

export type SecondSubItemType = {
	id: number;
	title: string;
	articles: {
		data: ArticleType[];
	};
	path: string;
};

export type Language = keyof typeof languageMapping;
