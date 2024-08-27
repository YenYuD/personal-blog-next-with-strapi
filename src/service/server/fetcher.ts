export const fetcher = async (url: string, options?: RequestInit) => {
	const res = await fetch(url, {
		...options,
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${process.env.API_TOKEN}`,
		},
	});
	return await res.json();
};
