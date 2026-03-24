import { useCallback } from 'react';

export function useSmoothScroll() {
	return useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
		if (!href.startsWith('#')) return;

		e.preventDefault();
		const targetId = href.substring(1);
		const targetElement = document.getElementById(targetId);

		if (targetElement) {
			targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
			window.history.pushState(null, '', href);
		}
	}, []);
}
