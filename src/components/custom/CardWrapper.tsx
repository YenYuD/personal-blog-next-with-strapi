import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

type Props = {
	title: string;
	description: string;
	children: React.ReactNode;
	footer?: React.ReactNode;
};

export default function CardWrapper({ children, title, description, footer }: Props) {
	return (
		<Card x-chunk="dashboard-04-chunk-1">
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>{children}</CardContent>
			{footer && <CardFooter className="border-t py-4">{footer}</CardFooter>}
		</Card>
	);
}
