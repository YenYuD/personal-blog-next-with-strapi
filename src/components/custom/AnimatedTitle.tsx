type Props = {
	title: string;
};

export default function AnimatedTitle({ title }: Props) {
	return (
		<div className="flex flex-col w-full">
			<p className="font-light lg:text-2xl text-background">{title}</p>
		</div>
	);
}
