import { LoadingSkeleton } from '@/components/custom';

export default function Loading() {
	return (
		<div className="mx-auto grid w-full h-full max-w-6xl pt-[5rem] items-start gap-6 lg:gap-12 md:grid-cols-[180px_1fr] lg:grid-cols-[285px_1fr] p-4">
			<LoadingSkeleton />
		</div>
	);
}
