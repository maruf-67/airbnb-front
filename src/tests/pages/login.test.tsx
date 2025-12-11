import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import LoginPage from '@/app/(public)/login/page';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

// Mock dependencies
vi.mock('@/lib/api', () => ({
    api: {
        post: vi.fn(),
    },
}));

// Mock icons
vi.mock('@heroicons/react/24/outline', () => ({
    EyeIcon: () => <div data-testid="eye-icon" />,
    EyeSlashIcon: () => <div data-testid="eye-slash-icon" />,
}));

describe('LoginPage', () => {
    const mockPush = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        (useRouter as any).mockReturnValue({ push: mockPush });
    });

    it('renders login form correctly', () => {
        render(<LoginPage />);
        expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });

    it('handles success login', async () => {
        (api.post as any).mockResolvedValue({
            data: {
                data: {
                    user: { id: '1', name: 'Test User' },
                    accessToken: 'token123'
                }
            }
        });

        render(<LoginPage />);

        fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

        await waitFor(() => {
            expect(api.post).toHaveBeenCalledWith('/auth/login', {
                email: 'test@example.com',
                password: 'password123'
            });
            expect(mockPush).toHaveBeenCalledWith('/');
        });
    });

    it('displays error on failed login', async () => {
        (api.post as any).mockRejectedValue({
            response: {
                data: {
                    message: 'Invalid credentials'
                }
            }
        });

        render(<LoginPage />);

        fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'wrong@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpass' } });

        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

        await waitFor(() => {
            expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
        });
    });
});
