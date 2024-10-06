export const fetcher = async (url: string, options?: RequestInit) => {
	const res = await fetch(url, {
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${process.env.API_TOKEN}`,
		},
		...(!options?.cache && {
			next: {
				revalidate: 1 * 60 * 20, // 20 minutes
			},
		}),
		...options,
	});
	return await res.json();
};
