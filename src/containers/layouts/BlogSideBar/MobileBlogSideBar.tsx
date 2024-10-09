import { LinkItem } from '@/components/custom';
import { Button } from '@/components/ui/button';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { ChevronDown, Dot } from 'lucide-react';
import type { CategoryType } from '@/service/type';

export default function MobileBlogSideBar({ categories }: { categories: CategoryType[] }) {
	return (
		<>
			<Drawer>
				<DrawerTrigger className="min-w-[90px] text-lg flex items-center gap-2 font-medium hover:no-underline focus-visible:ring-0 no-underline focus-visible:ring-offset-0">
					Categories
					<ChevronDown className="h-5 w-5" />
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>Categories</DrawerTitle>
					</DrawerHeader>
					<DrawerFooter>
						{categories.map(({ id, attributes: { name, path, articles } }) => (
							<div key={id}>
								<Dot className="inline-block w-4 h-4 mr-2" />
								<LinkItem
									label={`${name}(${articles?.data?.length ?? 0})`}
									href={`/blog/${path}`}
									className="w-full"
								/>
							</div>
						))}
						<DrawerClose>
							<Button variant="outline">Cancel</Button>
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}
