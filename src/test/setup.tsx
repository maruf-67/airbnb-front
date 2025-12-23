import '@testing-library/jest-dom';
import { vi } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

// Extend expect matchers
expect.extend(matchers as any);

// Mock Next.js navigation
const useRouterMock = vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
}));

vi.mock('next/navigation', () => ({
    useRouter: useRouterMock,
    usePathname: () => '/',
    useSearchParams: () => new URLSearchParams(),
}));

// Mock Next/Link
vi.mock('next/link', () => ({
    default: ({ children, href }: { children: React.ReactNode; href: string }) => {
        return (
            <a href={href} onClick={(e) => e.preventDefault()}>
                {children}
            </a>
        );
    },
}));

// Mock cookies-next
vi.mock('cookies-next', () => ({
    getCookie: vi.fn(),
    setCookie: vi.fn(),
    deleteCookie: vi.fn(),
}));

// Mock Axios
vi.mock('axios', () => {
    return {
        default: {
            create: () => ({
                interceptors: {
                    request: { use: vi.fn() },
                    response: { use: vi.fn() },
                },
                get: vi.fn(),
                post: vi.fn(),
                put: vi.fn(),
                delete: vi.fn(),
                patch: vi.fn(),
            }),
        },
    };
});
