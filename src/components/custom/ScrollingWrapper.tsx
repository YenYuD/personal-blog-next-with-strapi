'use client';

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Observer } from 'gsap/Observer';
import { useRef, useState } from 'react';

gsap.registerPlugin(Observer);

type Props = {
	children: React.ReactElement[];
	throttleTime?: number;
	scrollableClass?: string;
};

export default function ScrollingWrapper({
	children,
	throttleTime = 800,
	scrollableClass = 'scrollable',
}: Props) {
	const [contentID, setContentID] = useState(0);
	const lastScrollTime = useRef(Date.now());

	useGSAP(() => {
		const observer = Observer.create({
			lockAxis: true,
			type: 'wheel,touch,pointer',
			onUp: () => {
				const currentTime = Date.now();
				if (currentTime - lastScrollTime.current < throttleTime) {
					return;
				}
				setContentID((prev) => Math.min(children.length - 1, prev + 1));
				lastScrollTime.current = currentTime;
			},
			onDown: () => {
				const currentTime = Date.now();
				if (currentTime - lastScrollTime.current < throttleTime) {
					return;
				}
				setContentID((prev) => Math.max(0, prev - 1));
				lastScrollTime.current = currentTime;
			},
			debounce: false,
			tolerance: 10,
			wheelSpeed: -1,
			preventDefault: true,
			onPress: (e) => {
				const target = e.event.target as HTMLElement;
				if (target?.classList.contains(scrollableClass)) {
					e.disable();
				}
				e.enable();
			},
		});

		return () => observer.kill();
	}, []);

	return <div>{children[contentID]}</div>;
}
