import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import LandingPage from '@/app/(public)/page';
import { api } from '@/lib/api';

// Mock dependencies
vi.mock('@/lib/api', () => ({
    api: {
        get: vi.fn(),
    },
}));

vi.mock('@/components/ListingCard', () => ({
    default: ({ post }: any) => <div data-testid="listing-card">{post.title}</div>
}));

describe('LandingPage', () => {
    it('renders listings correctly', async () => {
        (api.get as any).mockResolvedValue({
            data: {
                data: [
                    { _id: '1', title: 'Cozy Cabin', location: 'Forest', price: 100, images: [] },
                    { _id: '2', title: 'Beach House', location: 'Beach', price: 200, images: [] },
                ]
            }
        });

        render(<LandingPage />);

        await waitFor(() => {
            expect(screen.getByText('Cozy Cabin')).toBeInTheDocument();
            expect(screen.getByText('Beach House')).toBeInTheDocument();
        });
    });

    it('renders empty state when no listings', async () => {
        (api.get as any).mockResolvedValue({
            data: {
                data: []
            }
        });

        render(<LandingPage />);

        await waitFor(() => {
            expect(screen.getByText(/No places found/i)).toBeInTheDocument();
        });
    });
});
