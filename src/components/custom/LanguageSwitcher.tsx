'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { ClientUiService } from '@/service/client/uiService';

export default function LanguageSwitcher() {
	const lang = usePathname().split('/')[1] ?? 'en-US';
	const path = usePathname().split('/').slice(2).join('/');
	const [currentLang, setCurrentLang] = useState<string>(lang ?? 'en-US');
	const router = useRouter();

	const handleChange = (value: string) => {
		setCurrentLang(value);
		router.push(`/${value}/${path}`);
	};

	const { data } = useQuery({
		queryKey: ['get-languages'],
		queryFn: () =>
			ClientUiService.getLanguages({
				sort: 'order',
				fields: ['label', 'value', 'order'],
			}),
		placeholderData: [
			{
				id: 1,
				attributes: {
					label: 'English',
					value: 'en-US',
					order: 1,
				},
			},
			{
				id: 2,
				attributes: {
					label: '繁體中文',
					value: 'zh-TW',
					order: 2,
				},
			},
		],
	});

	const displayedText =
		data?.find(({ attributes: { value } }) => value === currentLang)?.attributes.label ??
		'Loading...';

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className="min-w-[90px] max-w-32 font-medium focus-visible:ring-0 bg-transparent border-foreground focus-visible:ring-offset-0 hover:bg-transparent hover:text-foreground"
					variant="outline"
				>
					{displayedText}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-auto md:bg-transparent bg-background">
				<DropdownMenuRadioGroup value={currentLang} onValueChange={setCurrentLang}>
					{data?.map(({ attributes: { value, label } }) => (
						<DropdownMenuRadioItem
							className="text-foreground"
							key={value}
							value={value}
							onClick={() => handleChange(value)}
						>
							{label}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
