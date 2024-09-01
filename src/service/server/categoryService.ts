import { urlJoin } from '../utils/urlJoin';
import type { CategoryType, ServerResponse } from '../type';
import { fetcher } from './fetcher';

const PATHNAME_PREFIX = '/api/categories';

export const CategoryService = {
	getCategories,
};

async function getCategories(searchParams?: string) {
	const url = urlJoin(PATHNAME_PREFIX, {
		searchParams,
		isServer: true,
	});
	const res = await fetcher(url);
	return res as ServerResponse<CategoryType[]>;
}
