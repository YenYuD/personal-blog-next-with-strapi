import { urlJoin } from '../utils/urlJoin';
import type { LanguageType, ServerResponse } from '../type';
import { fetcher } from './fetcher';

export const UiService = {
	getLanguages,
};

async function getLanguages(searchParams?: string) {
	const url = urlJoin('/api/languages', searchParams, { isServer: true });
	const res = await fetcher(url);
	return res as ServerResponse<LanguageType[]>;
}
