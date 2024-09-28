import { urlJoin } from '../utils/urlJoin';
import type { AboutType, ServerResponse } from '../type';
import { fetcher } from './fetcher';

const ABOUT_PATHNAME_PREFIX = '/api/about';

export const SingleTypeService = {
	getAbout,
};

async function getAbout(searchParams?: string) {
	const url = urlJoin(ABOUT_PATHNAME_PREFIX, {
		searchParams,
		isServer: true,
	});
	const res = await fetcher(url);
	return res as ServerResponse<AboutType>;
}
