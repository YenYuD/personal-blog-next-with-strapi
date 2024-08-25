import { instance } from './instance';
import { urlJoin } from '../utils/urlJoin';
import type { LanguageType, Response } from '../type';

const axios = instance;

export const UiService = {
	getLanguages,
};

async function getLanguages(suffix = '') {
	const url = urlJoin('/api/languages', suffix);
	const res = await axios.get<Response<LanguageType[]>>(url);
	return res.data;
}
