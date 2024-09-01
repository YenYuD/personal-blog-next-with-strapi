import { languageMapping } from '@/constants/uiConfig';
import type { Language } from '../type';

export function mapLanguageParam(lang: Language): string {
	return languageMapping[lang] ?? 'en';
}
