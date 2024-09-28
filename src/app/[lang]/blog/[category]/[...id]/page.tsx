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

const Markdown = ({ markdown }: { markdown: string }) => {
	const MarkdownComponents = {
		// TODO: couldn't fix the type problem rn... will fix it later
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		code({ node, inline, className, children, ...props }: any) {
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
					className={`${className} relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold`}
					{...props}
				/>
			);
		},
	};

	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm]}
			components={{
				// all elements classNames were copied from shadcn docs
				...MarkdownComponents,
				h1: ({ children }) => (
					<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
						{children}
					</h1>
				),
				h2: ({ children }) => (
					<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-4">
						{children}
					</h2>
				),
				h3: ({ children }) => (
					<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{children}</h3>
				),
				h4: ({ children }) => (
					<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{children}</h4>
				),
				p: ({ children }) => <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>,
				blockquote: ({ children }) => (
					<blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
				),
				tr: ({ children }) => <tr className="m-0 border-t p-0 even:bg-muted">{children}</tr>,
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
					<a className=" text-blue-500 hover:underline leading-7" href={href}>
						{children}
					</a>
				),
			}}
		>
			{markdown}
		</ReactMarkdown>
	);
};

export default async function Post({ params: { id } }: { params: { lang: Language; id: string } }) {
	const {
		data: { attributes: article },
	} = await ArticlesService.getArticleById(id);

	return (
		<div>
			<Markdown markdown={article.content} />
		</div>
	);
}
