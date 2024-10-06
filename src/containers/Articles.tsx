import { CldImage, LinkItem } from '@/components/custom';
import type { ArticleType } from '@/service/type';
import { Separator } from '@/components/ui/separator';
import { formatDate } from '@/service/utils/formatDate';
import { Badge } from '@/components/ui/badge';

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
		<p className="my-1 line-clamp-3 text-ellipsis overflow-hidden max-h-30 text-gray-300">{text}</p>
	);
}

function ArticleCard({ article }: ArticleCardProps) {
	const {
		id,
		attributes: { title, publish_at, description, cover_image_path: imageData },
	} = article;

	return (
		<div className="rounded-lg shadow-md p-4">
			<div className="flex justify-between gap-4">
				<div className="flex-1 w-full flex flex-col justify-between">
					<div className="flex flex-col gap-2">
						<h2 className="text-lg lg:text-2xl font-semibold">
							<LinkItem label={title} href={`/blog/post/${id}`} />
						</h2>
						<p className="text-sm text-gray-400">{formatDate(publish_at)}</p>
						{description && <Description text={description} />}
					</div>
					<div className="mt-3">
						<Badge variant="outline" className="font-normal hover:bg-gray-800">
							<LinkItem
								label="read more"
								className="hover:no-underline"
								href={`/blog/post/${id}`}
							/>
						</Badge>
					</div>
				</div>
				<div className="w-full max-w-[30%]">
					<CoverImage imageData={imageData} />
				</div>
			</div>
		</div>
	);
}

export default function Articles({ articles }: Props) {
	if (!articles || articles.length === 0)
		return (
			<div className="text-center mt-4">
				<h2>No articles found.</h2>
			</div>
		);

	return (
		<>
			{articles.map((article) => (
				<div key={article.id}>
					<ArticleCard key={article.id} article={article} />
					<Separator />
				</div>
			))}
		</>
	);
}
