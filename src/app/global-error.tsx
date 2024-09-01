'use client';
import { Button } from '@/components/ui/button';

//NOTE: global-error is only enabled in production.
//      In development, our error overlay will show instead.

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		//NOTE: global-error must include html and body tags
		<html lang="en-US">
			<body>
				<h2>Something went wrong!</h2>
				<Button variant="outline" onClick={() => reset()} className="mt-4">
					Try again
				</Button>
			</body>
		</html>
	);
}
