import Link from 'next/link';

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
			<h1 className="text-5xl font-bold text-pink-400 mb-4 animate-pulse">Oops! Page Not Found</h1>
			<p className="text-lg text-gray-700 mb-8">
				It seems you've found a page that doesn't exist. Maybe it's hiding or has just disappeared!
			</p>
			<Link href="/">
				<span className="mr-2">←</span> Return Home
			</Link>
		</div>
	);
}
