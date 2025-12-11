'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { setCookie } from 'cookies-next';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import AirbnbLogo from '@/components/AirbnbLogo';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await api.post('/auth/login', formData);
            const { user, accessToken } = response.data.data;

            setCookie('token', accessToken, { maxAge: 60 * 60 * 24 * 3 }); // 3 days
            setCookie('user', JSON.stringify(user), { maxAge: 60 * 60 * 24 * 3 });

            if (user.role && user.role.type === 'admin') {
                router.push('/admin');
            } else {
                router.push('/');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-8 bg-background dark:bg-neutral-950">
            <div className="w-full max-w-sm space-y-8 bg-white dark:bg-neutral-900/50 dark:backdrop-blur-xl p-8 rounded-2xl border border-gray-100 dark:border-white/10 shadow-xl shadow-gray-200/50 dark:shadow-black/50">
                <div className="flex flex-col items-center">
                    <AirbnbLogo className="h-10 w-auto text-rose-500" />
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-foreground">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Please sign in to your account
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="rounded-lg bg-red-50 dark:bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400 border border-red-100 dark:border-red-500/20">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-foreground">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="block w-full rounded-xl border-0 py-3 text-foreground bg-gray-50 dark:bg-neutral-950 shadow-sm ring-1 ring-inset ring-gray-200 dark:ring-neutral-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-500 sm:text-sm sm:leading-6 transition-all"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-foreground">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-rose-600 hover:text-rose-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2 relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="block w-full rounded-xl border-0 py-3 text-foreground bg-gray-50 dark:bg-neutral-950 shadow-sm ring-1 ring-inset ring-gray-200 dark:ring-neutral-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-500 sm:text-sm sm:leading-6 pr-10 transition-all"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" aria-hidden="true" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" aria-hidden="true" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full justify-center rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-lg shadow-rose-500/30 hover:shadow-rose-500/40 hover:from-rose-500 hover:to-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
                    Not a member?{' '}
                    <Link href="/register" className="font-semibold leading-6 text-rose-600 hover:text-rose-500">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
}
