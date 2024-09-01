import { BlogSideBar } from '@/containers/layouts';
import type { Language } from '@/service/type';
import '../../globals.css';

export default function BlogLayout({
	children,
	params: { lang },
}: Readonly<{
	children: React.ReactNode;
	params: {
		lang: Language;
	};
}>) {
	return (
		<div>
			<main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
				<div className="mx-auto grid w-full max-w-6xl items-start gap-12 md:grid-cols-[180px_1fr] lg:grid-cols-[285px_1fr]">
					<BlogSideBar lang={lang} />
					{children}
				</div>
			</main>
		</div>
	);
}
