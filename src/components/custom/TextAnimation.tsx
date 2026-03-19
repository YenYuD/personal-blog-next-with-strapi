'use client';
import { TypeAnimation } from 'react-type-animation';
import { useEffect, useState } from 'react';

export default function TextAnimation() {
	const [repeatCount, setRepeatCount] = useState(Number.POSITIVE_INFINITY);

	useEffect(() => {
		// Check if user prefers reduced motion
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		setRepeatCount(prefersReducedMotion ? 1 : Number.POSITIVE_INFINITY);
	}, []);

	return (
		<div className="w-full h-[100px] small:min-h-[15rem] small:max-h-[15rem] max-sm:overflow-hidden ">
			<TypeAnimation
				sequence={['Frontend\nDeveloper.', 2000, '']}
				wrapper="p"
				style={{ whiteSpace: 'pre-line', display: 'block' }}
				className="text-4xl small:text-6xl sm:text-center lg:text-8xl"
				speed={1}
				repeat={repeatCount}
			/>
		</div>
	);
}
