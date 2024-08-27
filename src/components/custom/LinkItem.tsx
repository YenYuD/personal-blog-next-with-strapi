'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LinkItem({ label, href }: { label: string; href: string }) {
	const locale = usePathname().split('/')[1] ?? 'en';
	const url = `/${locale}${href}`;
	return (
		<Link className="text-muted-foreground transition-colors hover:text-foreground" href={url}>
			{label}
		</Link>
	);
}
