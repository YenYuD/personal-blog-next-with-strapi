import { instance } from './instance';
import { urlJoin } from '../utils/urlJoin';
import type { ArticleType, ServerResponse } from '../type';

const PATHNAME_PREFIX = '/api/articles';
const axios = instance;

export const ArticlesService = {
	getArticles,
};

async function getArticles() {
	const url = urlJoin(PATHNAME_PREFIX, '?populate=cover_image');
	const res = await axios.get<ServerResponse<ArticleType>>(url);
	return res.data;
}
