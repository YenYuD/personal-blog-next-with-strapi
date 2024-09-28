export function urlJoin(
	prefix: string,
	options: { searchParams?: string; isServer?: boolean } = {},
) {
	const { searchParams = '', isServer = false } = options;
	const baseUrl = isServer ? process.env.API_URL : '';
	return `${baseUrl}${prefix}${searchParams ? `?${searchParams}` : ''}`;
}
