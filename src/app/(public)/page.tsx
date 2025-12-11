'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import ListingCard from '@/components/ListingCard';
import AirbnbLogo from '@/components/AirbnbLogo';
import { MagnifyingGlassIcon, UserCircleIcon, Bars3Icon, GlobeAltIcon } from '@heroicons/react/24/outline';

export default function Home() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get('/posts');
                setPosts(response.data.data);
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 bg-background border-b border-gray-200 dark:border-neutral-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-[80px]">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <AirbnbLogo />
                        </div>

                        {/* Search Bar (Mock) */}
                        <div className="hidden md:flex items-center border border-gray-300 dark:border-neutral-700 rounded-full py-2.5 px-4 shadow-sm hover:shadow-md transition cursor-pointer">
                            <div className="text-sm font-semibold px-4 border-r border-gray-300 dark:border-neutral-700">Anywhere</div>
                            <div className="text-sm font-semibold px-4 border-r border-gray-300 dark:border-neutral-700">Any week</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 px-4">Add guests</div>
                            <div className="bg-rose-500 text-white p-2 rounded-full">
                                <MagnifyingGlassIcon className="h-4 w-4" />
                            </div>
                        </div>

                        {/* User Menu */}
                        <div className="flex items-center gap-4">
                            <div className="text-sm font-semibold hidden md:block hover:bg-gray-100 dark:hover:bg-neutral-800 px-4 py-2 rounded-full cursor-pointer">
                                Airbnb your home
                            </div>
                            <div className="hover:bg-gray-100 dark:hover:bg-neutral-800 p-2 rounded-full cursor-pointer">
                                <GlobeAltIcon className="h-5 w-5" />
                            </div>
                            <div className="flex items-center gap-2 border border-gray-300 dark:border-neutral-700 rounded-full p-1 pl-3 hover:shadow-md cursor-pointer transition">
                                <Bars3Icon className="h-5 w-5" />
                                <UserCircleIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Categories Filter Bar */}
                <div className="border-t border-gray-100 dark:border-neutral-800 pt-4 pb-2">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
                            {['Amazing Pools', 'Rooms', 'Beachfront', 'Cabins', 'OMG!', 'Camping', 'Tiny homes', 'Lakefront', 'Islands'].map(cat => (
                                <div key={cat} className="flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer opacity-60 hover:opacity-100 border-b-2 border-transparent hover:border-black dark:hover:border-white pb-2 transition-all group">
                                    <span className="text-xs font-semibold group-hover:text-black dark:group-hover:text-white">{cat}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="pt-[180px] pb-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {loading ? (
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="aspect-square w-full rounded-xl bg-gray-200 dark:bg-neutral-800"></div>
                                <div className="mt-4 h-4 w-3/4 bg-gray-200 dark:bg-neutral-800 rounded"></div>
                                <div className="mt-2 h-4 w-1/4 bg-gray-200 dark:bg-neutral-800 rounded"></div>
                            </div>
                        ))}
                    </div>
                ) : posts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {posts.map((post) => (
                            <ListingCard key={post._id} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <h3 className="mt-2 text-lg font-semibold text-foreground">No places found</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filters.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
