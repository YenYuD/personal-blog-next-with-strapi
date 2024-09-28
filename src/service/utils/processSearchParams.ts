import qs from 'qs';

export function processSearchParams(input: Record<string, unknown>) {
	return `${qs.stringify(input, {
		encodeValuesOnly: true,
	})}`;
}
