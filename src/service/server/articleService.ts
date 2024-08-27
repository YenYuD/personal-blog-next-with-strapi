import { urlJoin } from '../utils/urlJoin';
import type { ArticleType, ServerResponse } from '../type';
import { fetcher } from './fetcher';

const PATHNAME_PREFIX = '/api/articles';

export const ArticlesService = {
	getArticles,
};

async function getArticles(searchParams?: string) {
	const url = urlJoin(PATHNAME_PREFIX, searchParams, { isServer: true });
	const res = await fetcher(url);
	return res as ServerResponse<ArticleType[]>;
}
