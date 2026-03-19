'use client';
import { useEffect, useState, useCallback } from 'react';

const SCROLL_BUFFER = 0.7;
const THROTTLE_DELAY = 100; // ms

// Throttle function to limit scroll event frequency
function throttle<T extends (...args: any[]) => void>(
	func: T,
	delay: number
): (...args: Parameters<T>) => void {
	let timeoutId: NodeJS.Timeout | null = null;
	let lastRan = 0;

	return function (this: any, ...args: Parameters<T>) {
		const now = Date.now();

		if (!lastRan || now - lastRan >= delay) {
			func.apply(this, args);
			lastRan = now;
		} else {
			if (timeoutId) clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				func.apply(this, args);
				lastRan = Date.now();
			}, delay);
		}
	};
}

export default function GradientBackground() {
	const [scrollStage, setScrollStage] = useState(0);

	const handleScroll = useCallback(() => {
		const scrollPosition = window.scrollY;
		const viewportHeight = window.innerHeight;

		if (scrollPosition > viewportHeight * SCROLL_BUFFER * 2) {
			setScrollStage(2);
		} else if (scrollPosition > viewportHeight * SCROLL_BUFFER) {
			setScrollStage(1);
		} else {
			setScrollStage(0);
		}
	}, []);

	useEffect(() => {
		const throttledScroll = throttle(handleScroll, THROTTLE_DELAY);

		window.addEventListener('scroll', throttledScroll, { passive: true });
		return () => window.removeEventListener('scroll', throttledScroll);
	}, [handleScroll]);

	const getGradientStyle = (isSecond = false) => {
		const gradientPairs = [
			['var(--gradient1)', 'var(--gradient2)'],
			['var(--gradient3)', 'var(--gradient4)'],
			['var(--gradient5)', 'var(--gradient6)'],
		];

		const [gradient1, gradient2] = gradientPairs[scrollStage] || gradientPairs[0];
		const currentGradient = isSecond ? gradient2 : gradient1;

		return {
			backgroundColor: `hsl(${currentGradient})`,
			transition: 'background-color 0.2s ease-in-out',
		};
	};

	return (
		<>
			<section className="bg-gradients max-h-[100svh] transition" aria-hidden="true">
				<div className="bg-gradient-1" style={getGradientStyle()} />
				<div className="bg-gradient-2" style={getGradientStyle(true)} />
			</section>
		</>
	);
}
