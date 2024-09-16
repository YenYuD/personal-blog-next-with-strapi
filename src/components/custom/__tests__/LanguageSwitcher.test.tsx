import { render, screen, within, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import LanguageSwitcher from '../LanguageSwitcher';
import { usePathname, useRouter } from 'next/navigation';
import userEvent from '@testing-library/user-event';
import { useQuery } from '@tanstack/react-query';

vi.mock('next/navigation', () => ({
	usePathname: vi.fn(),
	useRouter: vi.fn(),
}));

vi.mock('@tanstack/react-query', () => ({
	useQuery: vi.fn(),
}));

describe('LanguageSwitcher', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		document.body.innerHTML = '';
		vi.mocked(usePathname).mockReturnValue('/en/path');
		vi.mocked(useRouter).mockReturnValue({ push: vi.fn() } as any);
		vi.mocked(useQuery).mockReturnValue({
			data: [
				{
					id: 1,
					attributes: {
						label: 'English',
						value: 'en',
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
		} as any);
	});

	it('renders with the correct initial language', () => {
		render(<LanguageSwitcher />);

		const button = screen.getByRole('button');
		expect(button).toHaveTextContent('English');
	});

	it('changes the language when a different option is selected', async () => {
		const pushMock = vi.fn();
		vi.mocked(useRouter).mockReturnValue({ push: pushMock } as any);
		render(<LanguageSwitcher />);

		const button = screen.getByRole('button', { name: /english/i });

		await userEvent.click(button);

		const menu = await screen.findByRole('menu');
		const zhOption = within(menu)
			.getByText('繁體中文')
			.closest('[role="menuitemradio"]') as HTMLElement;

		await userEvent.click(zhOption);

		await waitFor(() => {
			expect(pushMock).toHaveBeenCalledWith('/zh-TW/path');
			expect(button).toHaveTextContent(/繁體中文/);
		});
	});
});