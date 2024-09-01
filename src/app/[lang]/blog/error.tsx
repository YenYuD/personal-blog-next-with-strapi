'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ErrorBoundary({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const router = useRouter();

	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div>
			<h2>Sorry. Something went wrong!</h2>
			<Button variant="outline" onClick={() => reset()} className="mt-4">
				Try again
			</Button>
			<p>or</p>
			<Button variant="outline" onClick={() => router.push('/')}>
				Back to the homepage
			</Button>
		</div>
	);
}
