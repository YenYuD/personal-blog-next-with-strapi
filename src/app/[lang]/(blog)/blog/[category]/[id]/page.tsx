import type { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import markdown from 'react-syntax-highlighter/dist/esm/languages/prism/markdown';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { siteTitle } from '@/constants/uiConfig';
import type { Language } from '@/service/type';
import { ArticlesService } from '@/service/server/articleService';
import { UiService } from '@/service/server/uiService';
import { processSearchParams } from '@/service/utils/processSearchParams';
import { mapLanguageParam } from '@/service/utils/langaugeMapping';
import { BlogSideBar } from '@/containers/layouts';

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('javascript', javascript);

export async function generateMetadata({
	params: { id },
}: { params: { id: string } }): Promise<Metadata> {
	const {
		data: { attributes: article },
	} = await ArticlesService.getArticleById(id);

	return {
		title: `${siteTitle} | ${article.title || 'Blog'}`,
	};
}

export async function generateStaticParams() {
	const languages = (
		await UiService.getLanguages(
			processSearchParams({
				fields: ['value'],
			}),
		)
	).data.map((lang) => lang.attributes.value);

	const articlePromises = languages.map((lang) =>
		ArticlesService.getArticles(
			processSearchParams({
				locale: mapLanguageParam(lang as Language),
				fields: ['id', 'locale'],
			}),
		),
	);

	const articlesResults = await Promise.all(articlePromises);

	const paths = articlesResults.flatMap((result, index) => {
		const lang = languages[index];
		return result.data.map((article) => ({
			lang,
			category: 'post',
			id: article.id.toString(),
		}));
	});

	return paths;
}

const Markdown = ({ markdown }: { markdown: string }) => {
	const MarkdownComponents = {
		// TODO: couldn't fix the type problem rn... will fix it later
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		code({ node, inline, className = '', children, ...props }: any) {
			const hasLang = /language-(\w+)/.exec(className || '');
			return hasLang ? (
				<SyntaxHighlighter
					style={oneDark}
					language={hasLang[1]}
					PreTag="div"
					showLineNumbers={true}
					useInlineStyles={true}
				>
					{children}
				</SyntaxHighlighter>
			) : (
				<code
					className={`${className} relative rounded bg-cyan-700 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold`}
					{...props}
				>
					{children}
				</code>
			);
		},
	};

	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm]}
			components={{
				...MarkdownComponents,
				h1: ({ children }) => (
					<h1 className="scroll-m-20 text-4xl py-2 font-extrabold tracking-tight lg:text-5xl">
						{children}
					</h1>
				),
				h2: ({ children }) => (
					<h2 className="scroll-m-20 border-b py-2 text-3xl font-semibold tracking-tight first:mt-4">
						{children}
					</h2>
				),
				h3: ({ children }) => (
					<h3 className="scroll-m-20 text-2xl py-2 font-semibold tracking-tight">{children}</h3>
				),
				h4: ({ children }) => (
					<h4 className="scroll-m-20 text-xl py-2 font-semibold tracking-tight">{children}</h4>
				),
				p: ({ children }) => <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>,
				blockquote: ({ children }) => (
					<blockquote className="mt-6 border-l-4 bg-cyan-700 pl-4 italic">{children}</blockquote>
				),
				tr: ({ children }) => <tr className="m-0 border-t p-0">{children}</tr>,
				th: ({ children }) => (
					<th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
						{children}
					</th>
				),
				td: ({ children }) => (
					<td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
						{children}
					</td>
				),
				ul: ({ children }) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>,
				a: ({ children, href }) => (
					<a className=" text-cyan-500 hover:underline leading-7" href={href}>
						{children}
					</a>
				),
				strong: ({ children }) => (
					<strong className="font-semibold text-cyan-400">{children}</strong>
				),
			}}
		>
			{markdown}
		</ReactMarkdown>
	);
};

export default async function Post({
	params: { lang, id },
}: { params: { lang: Language; id: string } }) {
	const {
		data: { attributes: article },
	} = await ArticlesService.getArticleById(id);

	return (
		<div className="mx-auto w-full h-full max-w-6xl pt-[5rem] flex flex-col md:flex-row gap-6 lg:gap-12 p-4 pb-[2.5rem]">
			<BlogSideBar lang={lang} />
			<div className="flex-1 overflow-y-scroll no-scrollbar">
				<Markdown markdown={article.content} />
			</div>
		</div>
	);
}
