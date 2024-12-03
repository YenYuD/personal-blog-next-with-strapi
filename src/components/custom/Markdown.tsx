import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import markdown from 'react-syntax-highlighter/dist/esm/languages/prism/markdown';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import ini from 'react-syntax-highlighter/dist/cjs/languages/prism/ini';

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('ini', ini);

export default function Markdown({ markdown }: { markdown: string }) {
	const MarkdownComponents = {
		// TODO: couldn't fix the type problem rn... will fix it later
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		code({ node, inline, className = '', children, ...props }: any) {
			const hasLang = /language-(\w+)/.exec(className || '');
			const trimmedChildren = String(children).replace(/\n$/, '');
			return hasLang ? (
				<SyntaxHighlighter
					style={oneDark}
					language={hasLang[1]}
					PreTag="div"
					showLineNumbers={true}
					useInlineStyles={true}
				>
					{trimmedChildren}
				</SyntaxHighlighter>
			) : (
				<code
					className={`${className} relative rounded bg-cyan-700 px-[0.3rem] mx-[0.2rem] py-[0.2rem] font-mono text-sm font-semibold`}
					{...props}
				>
					{trimmedChildren}
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
					<h1 className="scroll-m-20 text-4xl py-4 font-extrabold tracking-tight lg:text-5xl">
						{children}
					</h1>
				),
				h2: ({ children }) => (
					<h2 className="scroll-m-20 border-b py-4 text-3xl font-semibold tracking-tight first:mt-4">
						{children}
					</h2>
				),
				h3: ({ children }) => (
					<h3 className="scroll-m-20 text-2xl py-4 pt-6 font-semibold tracking-tight">
						{children}
					</h3>
				),
				h4: ({ children }) => (
					<h4 className="scroll-m-20 text-xl py-2 pt-4 font-semibold tracking-tight">{children}</h4>
				),
				p: ({ children }) => <p className="leading-7 my-4">{children}</p>,
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
				ol: ({ children }) => <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>,
				a: ({ children, href }) => (
					<a className=" text-cyan-500 hover:underline leading-7" href={href}>
						{children}
					</a>
				),
				hr: () => <hr className="my-8 border-t opacity-45" />,
				strong: ({ children }) => (
					<strong className="font-semibold text-cyan-400">{children}</strong>
				),
				img: ({ src, alt }) => <img src={src} alt={alt} className="my-4" />,
				li: ({ children }) => <li className="leading-7 my-4">{children}</li>,
			}}
		>
			{markdown}
		</ReactMarkdown>
	);
}
