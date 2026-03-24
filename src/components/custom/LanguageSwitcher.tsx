'use client';
import { useState } from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
	const lang = usePathname().split('/')[1] ?? 'en-US';
	const path = usePathname().split('/').slice(2).join('/');
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
				<button
					className={`relative text-[#7c7c7c] tracking-[-0.0225rem] lg:tracking-[0.01rem] leading-[1.39] group transition-colors hover:text-[#0f0f0f] focus:outline-none ${currentLang === 'zh-TW' ? 'font-saira text-base lg:text-[1rem]' : 'font-jaro text-lg lg:text-[1.375rem]'}`}
					type="button"
				>
					{displayedText}
					<span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#0f0f0f] transition-all duration-300 group-hover:w-full" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg min-w-[140px]"
				align="end"
			>
				<DropdownMenuRadioGroup value={currentLang} onValueChange={setCurrentLang}>
					{languages.map(({ attributes: { value, label } }) => (
						<DropdownMenuRadioItem
							className={`text-[#7c7c7c] hover:text-[#0f0f0f] hover:bg-gray-50 focus:text-[#0f0f0f] focus:bg-gray-50 cursor-pointer tracking-[-0.01rem] ${value === 'zh-TW' ? 'font-saira text-sm' : 'font-jaro text-base'}`}
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
