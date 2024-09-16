'use client';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { TextPlugin } from 'gsap/TextPlugin';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP, TextPlugin);

type Props = {
	textData: [string, string][];
};

export default function TextAnimation({ textData }: Props) {
	const frontendRef = useRef<HTMLParagraphElement | null>(null);
	const developerRef = useRef<HTMLParagraphElement | null>(null);

	useGSAP(() => {
		const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });

		textData.forEach(([firstRow, secondRow], index) => {
			tl.to(frontendRef.current, {
				duration: 1,
				text: firstRow,
				delay: index === 0 ? 1 : 1.5,
			})
				.to(developerRef.current, {
					duration: 1,
					text: secondRow,
				})
				.to({}, { duration: 1 });
		});
	}, []);

	return (
		<div className="w-full text-6xl min-h-[15rem] max-h-[15rem] max-sm:overflow-hidden">
			<p ref={frontendRef}>Frontend</p>
			<p ref={developerRef}>Developer.</p>
		</div>
	);
}
