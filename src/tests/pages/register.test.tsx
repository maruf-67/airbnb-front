import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import RegisterPage from '@/app/(public)/register/page';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

// Mock dependencies
vi.mock('@/lib/api', () => ({
    api: {
        post: vi.fn(),
    },
}));

vi.mock('@heroicons/react/24/outline', () => ({
    EyeIcon: () => <div data-testid="eye-icon" />,
    EyeSlashIcon: () => <div data-testid="eye-slash-icon" />,
}));

describe('RegisterPage', () => {
    const mockPush = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        (useRouter as any).mockReturnValue({ push: mockPush });
    });

    it('renders register form correctly', () => {
        render(<RegisterPage />);
        expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
    });

    it('handles success registration', async () => {
        (api.post as any).mockResolvedValue({
            data: {
                data: {
                    user: { id: '1', name: 'New User' },
                    accessToken: 'token123'
                }
            }
        });

        render(<RegisterPage />);

        fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'New User' } });
        fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'new@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

        fireEvent.click(screen.getByRole('button', { name: /create account/i }));

        await waitFor(() => {
            expect(api.post).toHaveBeenCalledWith('/auth/register', {
                name: 'New User',
                email: 'new@example.com',
                password: 'password123'
            });
            expect(mockPush).toHaveBeenCalledWith('/');
        });
    });

    it('displays error on failed registration', async () => {
        (api.post as any).mockRejectedValue({
            response: {
                data: {
                    message: 'Email already in use'
                }
            }
        });

        render(<RegisterPage />);

        fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'User' } });
        fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'existing@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

        fireEvent.click(screen.getByRole('button', { name: /create account/i }));

        await waitFor(() => {
            expect(screen.getByText('Email already in use')).toBeInTheDocument();
        });
    });
});
