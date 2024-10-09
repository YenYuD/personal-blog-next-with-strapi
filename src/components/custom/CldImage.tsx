'use client';
import { CldImage as CloudaryImg } from 'next-cloudinary';
import type { ImageProps } from 'next/image';

type Props = {
	src: string;
	alt: string;
} & ImageProps;

export default function CldImage({ src, alt, ...others }: Props) {
	const cloudinaryDomain = process.env.NEXT_PUBLIC_CLOUDINARY_DOMAIN ?? '';
	const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? '';

	if (!cloudinaryDomain || !cloudName) {
		return (
			<div className="bg-muted absolute w-full h-full top-0 flex justify-center items-center">
				<p className="text-center font-saira font-bold text-lg opacity-40">No Image found.</p>
			</div>
		);
	}

	const imageUrl = `${cloudinaryDomain}/${cloudName}${src}`;

	return (
		<CloudaryImg
			src={imageUrl}
			alt={alt}
			sizes={
				'(max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1280px) 1280px, (max-width: 1536px) 1536px, 1920px'
			}
			{...others}
		/>
	);
}
