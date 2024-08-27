import { render, screen, within, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LanguageSwitcher from '../LanguageSwitcher';
import { usePathname, useRouter } from 'next/navigation';
import userEvent from '@testing-library/user-event';
import { useQuery } from '@tanstack/react-query';

jest.mock('next/navigation', () => ({
	usePathname: jest.fn(),
	useRouter: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
	useQuery: jest.fn(),
}));

describe('LanguageSwitcher', () => {
	beforeEach(() => {
		(usePathname as jest.Mock).mockReturnValue('/en/path');
		(useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
		(useQuery as jest.Mock).mockReturnValue({
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
		});
	});

	it('renders with the correct initial language', () => {
		render(<LanguageSwitcher />);

		const button = screen.getByRole('button');
		expect(button).toHaveTextContent('English');
	});

	it('changes the language when a different option is selected', async () => {
		const pushMock = jest.fn();
		(useRouter as jest.Mock).mockReturnValue({ push: pushMock });
		render(<LanguageSwitcher />);

		const button = screen.getByRole('button', { name: /english/i });

		await act(async () => {
			userEvent.click(button);
		});

		const menu = await screen.findByRole('menu');
		const zhOption = within(menu)
			.getByText('繁體中文')
			.closest('[role="menuitemradio"]') as HTMLElement;

		await act(async () => {
			userEvent.click(zhOption);
		});

		await waitFor(() => {
			expect(pushMock).toHaveBeenCalledWith('/zh-TW/path');
			expect(button).toHaveTextContent(/繁體中文/);
		});
	});
});
