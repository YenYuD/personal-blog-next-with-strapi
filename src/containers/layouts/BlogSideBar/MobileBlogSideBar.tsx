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
import type { SubItemType } from '@/service/type';

export default function MobileBlogSideBar({ blogSidebar }: { blogSidebar: SubItemType[] }) {
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
						{blogSidebar.map(({ id, title, path }) => (
							<div key={id}>
								<Dot className="inline-block w-4 h-4 mr-2" />
								<LinkItem label={title} href={`/blog/${path}`} className="w-full" />
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
