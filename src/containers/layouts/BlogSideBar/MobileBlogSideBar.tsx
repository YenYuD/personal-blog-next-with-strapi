'use client';
import { LinkItem } from '@/components/custom';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import type { SubItemType } from '@/service/type';
import { useState } from 'react';

export default function MobileBlogSideBar({ blogSidebar }: { blogSidebar: SubItemType[] }) {
	const [isOpen, setIsOpen] = useState(false);
	const handleToggle = () => setIsOpen(!isOpen);

	return (
		<>
			<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
				<DropdownMenuTrigger asChild className="mt-4">
					<Button
						variant="link"
						className="min-w-[90px] text-lg font-medium hover:no-underline focus-visible:ring-0 no-underline focus-visible:ring-offset-0 p-0"
					>
						Categories
						<ChevronDown className="h-5 w-5" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-[60vw] max-w-[115px] ml-[15px]">
					{blogSidebar.map(({ id, title, path }) => (
						<DropdownMenuItem key={id} onClick={handleToggle}>
							<LinkItem label={title} href={`/blog/${path}`} className="w-full" />
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
