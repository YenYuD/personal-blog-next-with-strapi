import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

type Props = {
	cover?: React.ReactNode;
	title: React.ReactNode;
	description: React.ReactNode;
	children: React.ReactNode;
	footer?: React.ReactNode;
};

export default function CardWrapper({ children, title, description, footer, cover }: Props) {
	return (
		<Card x-chunk="dashboard-04-chunk-1">
			<CardHeader>
				{cover ?? null}
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>{children}</CardContent>
			{footer && <CardFooter className="border-t py-4">{footer}</CardFooter>}
		</Card>
	);
}
