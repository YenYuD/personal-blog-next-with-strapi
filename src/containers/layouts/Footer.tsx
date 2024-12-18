export default function Footer() {
	const thisYear = new Date().getFullYear();
	return (
		<footer className="text-sm lg:text-md left-[1rem] z-[15] tracking-wide cursor-default">
			© {thisYear} Created by
			<span className="hover:text-cyan-500 ml-1">
				<a target="_blank" href={process.env.GIT_HUB_LINK} rel="noreferrer">
					Emily Diao.
				</a>
			</span>
		</footer>
	);
}
