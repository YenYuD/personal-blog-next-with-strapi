import { urlJoin } from '../utils/urlJoin';
import type { LanguageType, ServerResponse, SidebarsType } from '../type';
import { fetcher } from './fetcher';

export const UiService = {
	getLanguages,
	getSideBar,
};

async function getLanguages(searchParams?: string) {
	const url = urlJoin('/api/languages', searchParams, { isServer: true });
	const res = await fetcher(url, {
		cache: 'force-cache',
	});
	return res as ServerResponse<LanguageType[]>;
}

async function getSideBar(searchParams?: string) {
	const url = urlJoin('/api/sidebars', searchParams, { isServer: true });
	const res = await fetcher(url, {
		next: {
			revalidate: 60, // 1 minute
		},
	});
	return res as ServerResponse<SidebarsType[]>;
}
