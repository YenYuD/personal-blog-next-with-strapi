'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SheetClose } from '../ui/sheet';
import { Fragment } from 'react';
import { cn } from '@/lib/utils';

type Props = {
	children?: React.ReactNode;
	label?: string;
	href: string;
	isSheet?: boolean;
	className?: string;
};

export default function LinkItem({ children, href, label, isSheet, className }: Props) {
	const [Wrapper, WrapperProps] = isSheet ? [SheetClose, { asChild: true }] : [Fragment, {}];

	const locale = usePathname().split('/')[1] ?? 'en-US';
	const url = `/${locale}${href}`;
	const classNames = cn(' text-primary-foreground hover:underline', className);

	return (
		<Wrapper {...WrapperProps}>
			<Link className={classNames} href={url}>
				{children ?? label}
			</Link>
		</Wrapper>
	);
}
