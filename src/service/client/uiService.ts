import { instance } from './instance';
import type { LanguageType, Response } from '../type';
import { processSearchParams } from '../utils/processSearchParams';
import { urlJoin } from '../utils/urlJoin';

const axios = instance;

export const ClientUiService = {
	getLanguages,
};

async function getLanguages(searchParams?: Record<string, unknown>) {
	const params = searchParams ? processSearchParams(searchParams) : '';
	const pathName = '/api/get-languages';
	const url = urlJoin(pathName, {
		searchParams: params,
	});

	const {
		data: { res: result },
	} = await axios.get<Response<LanguageType[]>>(url);

	return result.data;
}
