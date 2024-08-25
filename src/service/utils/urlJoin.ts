'server-only';

export function urlJoin(prefix: string, suffix = '') {
	const url = `${process.env.API_URL}${prefix}${suffix ? `?${suffix}` : ''}`;
	return url;
}
