import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import HomePage from '../page';

describe('HomePage', () => {
	it('renders a heading', () => {
		render(<HomePage />);

		const heading = screen.getByText('Save');

		expect(heading).toBeInTheDocument();
	});
});
