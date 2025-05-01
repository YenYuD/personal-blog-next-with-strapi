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
import { cn } from '@/lib/utils';

export default function LanguageSwitcher() {
	const lang = usePathname().split('/')[1] ?? 'en-US';
	const path = usePathname().split('/').slice(2).join('/');
	const isBlogPage = path.includes('blog');
	const [currentLang, setCurrentLang] = useState<string>(lang ?? 'en-US');
	const router = useRouter();

	const handleChange = (value: string) => {
		setCurrentLang(value);
		router.push(`/${value}/${path}`);
	};

	const languages = [
		{
			attributes: {
				label: 'English',
				value: 'en-US',
			},
		},
		{
			attributes: {
				label: '繁體中文',
				value: 'zh-TW',
			},
		},
	];

	const displayedText =
		languages.find(({ attributes: { value } }) => value === currentLang)?.attributes.label ??
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
			<DropdownMenuContent
				className={cn('w-auto ', {
					'bg-background': isBlogPage,
					'md:bg-transparent bg-background': !isBlogPage,
				})}
			>
				<DropdownMenuRadioGroup value={currentLang} onValueChange={setCurrentLang}>
					{languages.map(({ attributes: { value, label } }) => (
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
