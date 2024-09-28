'use client';

import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { gsap } from 'gsap';

type Props = {
	title: string;
};

export default function AnimatedTitle({ title }: Props) {
	const titleRef = useRef<HTMLParagraphElement>(null);

	useGSAP(() => {
		gsap.fromTo(
			titleRef.current,
			{
				x: -50,
				opacity: 0,
			},
			{
				x: 0,
				opacity: 1,
				delay: 0,
				duration: 0.5,
				ease: 'power1.in',
			},
		);
	});

	return (
		<div className="flex flex-col w-full" ref={titleRef}>
			<p className="font-normal lg:font-thin">{title}</p>
		</div>
	);
}
