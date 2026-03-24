'use client';
import { CldImage as CloudaryImg } from 'next-cloudinary';
import type { ImageProps } from 'next/image';

type Props = {
	src: string;
	alt: string;
} & ImageProps;

export const cloudinaryDomain = process.env.NEXT_PUBLIC_CLOUDINARY_DOMAIN ?? '';
export const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? '';

export default function CldImage({ src, alt, ...others }: Props) {
	if (!cloudinaryDomain || !cloudName) {
		return (
			<div className="bg-muted absolute w-full h-full top-0 flex justify-center items-center">
				<p className="text-center font-saira font-bold text-lg opacity-40">No Image found.</p>
			</div>
		);
	}

	const imageUrl = `${cloudinaryDomain}/${cloudName}${src}`;

	// Don't use loading="lazy" if priority is set
	const { priority, ...restProps } = others;
	const loadingProp = priority ? {} : { loading: 'lazy' as const };

	return (
		<CloudaryImg
			src={imageUrl}
			alt={alt}
			quality="auto:good"
			format="auto"
			sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
			priority={priority}
			{...loadingProp}
			{...restProps}
		/>
	);
}
