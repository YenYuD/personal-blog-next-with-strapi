import { CardWrapper, CldImage, LinkItem } from '@/components/custom';
import type { ArticleType } from '@/service/type';
import { formatDate } from '@/service/utils/formatDate';
import Image from 'next/image';

type Props = {
	articles: ArticleType[];
};

type ArticleCardProps = {
	article: ArticleType;
};

type DescriptionProps = {
	text: string;
};

type CoverImageProps = {
	imageData: string;
};

function ArticleCard({ article }: ArticleCardProps) {
	const {
		id,
		attributes: { title, publish_at, description, cover_image_path: imageData },
	} = article;

	return (
		<CardWrapper
			key={id}
			cover={imageData ? <CoverImage imageData={imageData} /> : null}
			title={<LinkItem className="text-2xl" label={title} href={`/blog/post/${id}`} />}
			description={formatDate(publish_at)}
		>
			<>
				{description && <Description text={description} />}
				<LinkItem label="read more" href={`/blog/post/${id}`} />
			</>
		</CardWrapper>
	);
}

function CoverImage({ imageData }: CoverImageProps) {
	if (!imageData) return null;

	return (
		<div className="w-full relative pt-[64%] mb-2">
			<CldImage src={imageData} alt={imageData} fill className="object-cover z-0" />
		</div>
	);
}

function Description({ text }: DescriptionProps) {
	return (
		<p className="my-1 line-clamp-3 text-ellipsis overflow-hidden max-h-30 text-muted-foreground">
			{text}
		</p>
	);
}

export default function Articles({ articles }: Props) {
	if (!articles || articles.length === 0)
		return (
			<div className="text-center">
				<h2>No articles found.</h2>
			</div>
		);

	return (
		<>
			{articles.map((article) => (
				<ArticleCard key={article.id} article={article} />
			))}
		</>
	);
}
