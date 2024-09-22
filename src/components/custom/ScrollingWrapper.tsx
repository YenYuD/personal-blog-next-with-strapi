'use client';
import React, { useState, useEffect, useRef, type ReactElement, Children } from 'react';

interface ChildProps {
	isVisible: boolean;
	lang?: string;
}

interface Props {
	children: ReactElement<ChildProps> | ReactElement<ChildProps>[];
	threshold?: number;
	scrollableClass?: string;
}

export default function ScrollingWrapper({
	children,
	threshold = 50,
	scrollableClass = 'scrollable',
}: Props) {
	const [contentID, setContentID] = useState(0);
	const lastTouchYRef = useRef(0);
	const accumulatedDeltaRef = useRef(0);
	const childrenCount = Children.count(children);

	const isScrollableContent = (target: EventTarget | null): boolean => {
		if (target instanceof Element) {
			return target.closest(`.${scrollableClass}`) !== null;
		}
		return false;
	};

	const handleScroll = (delta: number, event: Event) => {
		if (isScrollableContent(event.target)) {
			return; // if the target is scrollable content, do nothing
		}

		// accumulate delta until it reaches the threshold
		accumulatedDeltaRef.current += delta;

		// if accumulatedDelta is greater than the threshold, change the content
		if (Math.abs(accumulatedDeltaRef.current) >= threshold) {
			// determine the direction of the scroll, 1 for down, -1 for up
			const direction = accumulatedDeltaRef.current > 0 ? 1 : -1;
			setContentID((prev) => {
				// make sure the contentID is within the range of children
				const next = prev + direction;
				return Math.max(0, Math.min(next, childrenCount - 1));
			});
			accumulatedDeltaRef.current = 0;
		}
	};

	const handleOnWheel = (event: WheelEvent) => {
		handleScroll(event.deltaY, event);
	};

	const handleOnTouchStart = (event: TouchEvent) => {
		if (isScrollableContent(event.target)) return;
		lastTouchYRef.current = event.touches[0].clientY;
	};

	const handleOnTouchMove = (event: TouchEvent) => {
		if (isScrollableContent(event.target)) return;
		const touchDeltaY = lastTouchYRef.current - event.touches[0].clientY;
		handleScroll(touchDeltaY, event);
		lastTouchYRef.current = event.touches[0].clientY;
	};

	useEffect(() => {
		//passive: false to prevent the default behavior of the event,
		//with this, we can fully control the scroll behavior
		window.addEventListener('wheel', handleOnWheel, { passive: false });
		window.addEventListener('touchstart', handleOnTouchStart);
		window.addEventListener('touchmove', handleOnTouchMove);

		return () => {
			window.removeEventListener('wheel', handleOnWheel);
			window.removeEventListener('touchstart', handleOnTouchStart);
			window.removeEventListener('touchmove', handleOnTouchMove);
		};
	}, []);

	return <div>{Children.toArray(children)[contentID]}</div>;
}
