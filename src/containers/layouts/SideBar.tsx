import type { LinkConfig } from '@/constants/uiConfig';
import Link from 'next/link';

type Props = {
	config: LinkConfig;
};

function LinkItem({ label, href }: { label: string; href: string }) {
	return (
		<Link className="first:font-semibold first:text-primary" href={href}>
			{label}
		</Link>
	);
}

export default function SideBar({ config }: Props) {
	return (
		<nav className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0">
			{config.map((item) => (
				<LinkItem key={item.href} label={item.label} href={item.href} />
			))}
		</nav>
	);
}
