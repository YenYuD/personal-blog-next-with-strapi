export function urlJoin(prefix: string, suffix?: string, { isServer = false } = {}) {
	const baseUrl = isServer ? process.env.API_URL : '';
	return `${baseUrl}${prefix}${suffix ? `?${suffix}` : ''}`;
}
