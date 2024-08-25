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
