import React from 'react';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, } from 'vitest'
import { beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react';
import { HomeBlock } from '@/containers/landing-page';
import { vi } from 'vitest';

vi.mock("@/components/custom", () => ({
  TextAnimation: vi.fn(() => <div data-testid="text-animation">Mocked Text Animation</div>)
}));

vi.mock("lucide-react", () => ({
  ArrowDown: () => <span data-testid="move-down-icon" />,
  MoveDown: () => <span data-testid="move-down-icon" />,
  Terminal: () => <span data-testid="terminal-icon" />
}));

describe('HomeBlock', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = '';
  });

  it('renders without crashing', () => {
    render(<HomeBlock />);
    expect(screen.getByText(/Profolio/)).toBeInTheDocument();
  });

  it('displays the current year', () => {
    const currentYear = new Date().getFullYear();
    render(<HomeBlock />);
    const yearElement = screen.getByText(`${currentYear} / Profolio`);
    expect(yearElement).toBeInTheDocument();
  });

  it('renders the TextAnimation component', () => {
    render(<HomeBlock />);
    expect(screen.getByTestId('text-animation')).toBeInTheDocument();
  });

  it('displays the introduction text', () => {
    render(<HomeBlock />);
    expect(screen.getByText(/Hi, my name is Emily./)).toBeInTheDocument();
    expect(screen.getByText(/I am a frontend developer./)).toBeInTheDocument();
  });

  it('renders the Terminal icon', () => {
    render(<HomeBlock />);
    expect(screen.getByTestId('terminal-icon')).toBeInTheDocument();
  });

  it('applies the correct CSS classes', () => {
    render(<HomeBlock />);
    expect(screen.getByText(/Profolio/).parentElement).toHaveClass('lg:max-2xl:mt-[5rem] flex flex-col w-full sm:items-center');
    expect(screen.getByText(/I am a frontend developer./).parentElement).toHaveClass('italic text-background text-lg font-normal mt-[1rem] sm:mt-[3rem] sm:text-center');
  });

  it('renders background gradient elements', () => {
    const { container } = render(<HomeBlock />);
    expect(container.querySelector('.bg-gradient-1')).toBeInTheDocument();
    expect(container.querySelector('.bg-gradient-2')).toBeInTheDocument();
  });
});