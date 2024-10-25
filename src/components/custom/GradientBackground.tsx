'use client';
import { useEffect, useState } from 'react';

const SCROLL_BUFFER = 0.7;

export default function GradientBackground() {
	const [scrollStage, setScrollStage] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			const viewportHeight = window.innerHeight;

			if (scrollPosition > viewportHeight * SCROLL_BUFFER * 2) {
				setScrollStage(2);
			} else if (scrollPosition > viewportHeight * SCROLL_BUFFER) {
				setScrollStage(1);
			} else {
				setScrollStage(0);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

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
			<section className="bg-gradients max-h-[100svh] transition">
				<div className="bg-gradient-1" style={getGradientStyle()} />
				<div className="bg-gradient-2" style={getGradientStyle(true)} />
			</section>
		</>
	);
}
