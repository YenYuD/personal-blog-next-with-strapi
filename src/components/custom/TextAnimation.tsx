'use client';
import { TypeAnimation } from 'react-type-animation';

export default function TextAnimation() {
	return (
		<div className="w-full h-[100px] small:min-h-[15rem] small:max-h-[15rem] max-sm:overflow-hidden ">
			<TypeAnimation
				sequence={['Frontend\nDeveloper.', 1000, '']}
				wrapper="p"
				style={{ whiteSpace: 'pre-line', display: 'block' }}
				className="text-4xl small:text-6xl sm:text-center lg:text-8xl"
				speed={1}
				repeat={Number.POSITIVE_INFINITY}
			/>
		</div>
	);
}
