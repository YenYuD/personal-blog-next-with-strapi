'use client';
import React, { useState, useEffect, useRef, type ReactElement, Children } from 'react';

interface ChildProps {
	isVisible: boolean;
	lang?: string;
}

interface Props {
	children: ReactElement<ChildProps> | ReactElement<ChildProps>[];
}

export default function ScrollingWrapper({ children }: Props) {
	const [contentID, setContentID] = useState(0);
	const lastTouchYRef = useRef(0);
	const childrenCount = Children.count(children);

	const handleOnWheel = (event: WheelEvent) => {
		const wheelDelta = event.deltaY;
		const scrollDown = wheelDelta > 0;
		const scrollUp = wheelDelta < 0;
		if (scrollDown) {
			setContentID((prev) => Math.min(prev + 1, childrenCount - 1));
		}

		if (scrollUp) {
			setContentID((prev) => Math.max(prev - 1, 0));
		}
	};

	const handleOnTouchStart = (event: TouchEvent) => {
		lastTouchYRef.current = event.touches[0].clientY;
	};

	const handleOnTouchMove = (event: TouchEvent) => {
		const touchDeltaY = event.touches[0].clientY;
		const scrollDown = touchDeltaY - lastTouchYRef.current < 0;
		const scrollUp = touchDeltaY - lastTouchYRef.current > 0;

		if (scrollDown) {
			setContentID((prev) => Math.min(prev + 1, childrenCount - 1));
		}

		if (scrollUp) {
			setContentID((prev) => Math.max(prev - 1, 0));
		}

		lastTouchYRef.current = touchDeltaY;
	};

	useEffect(() => {
		window.addEventListener('wheel', handleOnWheel);
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
