'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { api } from '@/lib/api';
import { Post } from '@/types';
import { StarIcon, MapPinIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { HeartIcon, ShareIcon } from '@heroicons/react/24/outline';

export default function ListingPage() {
    const params = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            if (!params.id) return;
            try {
                const response = await api.get(`/posts/${params.id}`);
                setPost(response.data.data);
            } catch (err) {
                console.error('Failed to fetch post:', err);
                setError('Failed to load listing details');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex justify-center items-center bg-background">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex justify-center items-center bg-background text-foreground">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Listing not found</h2>
                    <p className="text-gray-500 dark:text-gray-400">{error || "The property you're looking for doesn't exist."}</p>
                </div>
            </div>
        );
    }

    // Handle owner being potentially populated or string ID (though it should be populated)
    const ownerName = typeof post.owner === 'object' ? post.owner.name : 'Host';
    const ownerAvatar = typeof post.owner === 'object' ? post.owner.avatar : null;

    return (
        <div className="min-h-screen pt-[100px] pb-20 bg-background text-foreground">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Title & Actions */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold mb-2">{post.title}</h1>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                                <StarIcon className="h-4 w-4 text-foreground" />
                                <span className="font-semibold text-foreground">{post.rating || 'New'}</span>
                            </div>
                            <span className="hidden md:inline">·</span>
                            <div className="flex items-center gap-1">
                                <MapPinIcon className="h-4 w-4" />
                                <span className="underline font-semibold text-foreground cursor-pointer">{post.location}</span>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex gap-4">
                        <button className="flex items-center gap-2 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-neutral-800 px-4 py-2 rounded-lg transition">
                            <ShareIcon className="h-4 w-4" />
                            Share
                        </button>
                        <button className="flex items-center gap-2 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-neutral-800 px-4 py-2 rounded-lg transition">
                            <HeartIcon className="h-4 w-4" />
                            Save
                        </button>
                    </div>
                </div>

                {/* Images Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden mb-12 relative">
                    <div className="md:col-span-2 h-full relative">
                        <Image
                            src={post.images[0] || 'https://placehold.co/800x600'}
                            alt={post.title}
                            fill
                            className="object-cover hover:opacity-90 transition cursor-pointer"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                    <div className="hidden md:grid grid-cols-1 gap-2 h-full">
                        <div className="relative h-full">
                            <Image src={post.images[1] || 'https://placehold.co/400x300'} alt={post.title} fill className="object-cover hover:opacity-90 transition cursor-pointer" sizes="25vw" />
                        </div>
                        <div className="relative h-full">
                            <Image src={post.images[2] || 'https://placehold.co/400x300'} alt={post.title} fill className="object-cover hover:opacity-90 transition cursor-pointer" sizes="25vw" />
                        </div>
                    </div>
                    <div className="hidden md:grid grid-cols-1 gap-2 h-full">
                        <div className="relative h-full">
                            <Image src={post.images[3] || 'https://placehold.co/400x300'} alt={post.title} fill className="object-cover hover:opacity-90 transition cursor-pointer" sizes="25vw" />
                        </div>
                        <div className="relative h-full">
                            <Image src={post.images[4] || 'https://placehold.co/400x300'} alt={post.title} fill className="object-cover hover:opacity-90 transition cursor-pointer" sizes="25vw" />
                        </div>
                    </div>
                    <button className="absolute bottom-4 right-4 bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:bg-gray-50 dark:hover:bg-neutral-800 transition">
                        Show all photos
                    </button>
                </div>

                {/* Main Content & Sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Host Info */}
                        <div className="flex justify-between items-center border-b border-gray-200 dark:border-neutral-800 pb-8">
                            <div>
                                <h2 className="text-2xl font-semibold">Hosted by {ownerName}</h2>
                                <p className="text-gray-500 dark:text-gray-400 mt-1">{post.maxGuests} guests · 1 bedroom · 1 bed · 1 bath</p>
                            </div>
                            <div className="relative h-14 w-14 rounded-full overflow-hidden border border-gray-200 dark:border-neutral-800">
                                {ownerAvatar ? (
                                    <Image src={ownerAvatar} alt={ownerName} fill className="object-cover" />
                                ) : (
                                    <UserCircleIcon className="h-full w-full text-gray-300" />
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="border-b border-gray-200 dark:border-neutral-800 pb-8">
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                {post.description}
                            </p>
                        </div>

                        {/* Amenities */}
                        <div className="border-b border-gray-200 dark:border-neutral-800 pb-8">
                            <h3 className="text-xl font-semibold mb-4">What this place offers</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {post.amenities.length > 0 ? (
                                    post.amenities.map((amenity, index) => (
                                        <div key={index} className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                            {/* We can map icons here later based on amenity name */}
                                            <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                                            <span>{amenity}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No amenities listed.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Booking Widget) */}
                    <div className="relative">
                        <div className="sticky top-28 p-6 border border-gray-200 dark:border-neutral-800 rounded-xl shadow-xl shadow-gray-200/50 dark:shadow-black/20 bg-white dark:bg-neutral-900">
                            <div className="flex justify-between items-end mb-6">
                                <div>
                                    <span className="text-2xl font-bold">${post.price}</span>
                                    <span className="text-gray-500 dark:text-gray-400"> night</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm">
                                    <StarIcon className="h-3 w-3 text-foreground" />
                                    <span className="font-semibold">{post.rating || 'New'}</span>
                                </div>
                            </div>

                            <div className="border border-gray-300 dark:border-neutral-700 rounded-lg mb-4 overflow-hidden">
                                <div className="grid grid-cols-2 border-b border-gray-300 dark:border-neutral-700">
                                    <div className="p-3 border-r border-gray-300 dark:border-neutral-700">
                                        <div className="text-[10px] uppercase font-bold text-gray-600 dark:text-gray-400">Check-in</div>
                                        <div className="text-sm">Add date</div>
                                    </div>
                                    <div className="p-3">
                                        <div className="text-[10px] uppercase font-bold text-gray-600 dark:text-gray-400">Check-out</div>
                                        <div className="text-sm">Add date</div>
                                    </div>
                                </div>
                                <div className="p-3">
                                    <div className="text-[10px] uppercase font-bold text-gray-600 dark:text-gray-400">Guests</div>
                                    <div className="text-sm">1 guest</div>
                                </div>
                            </div>

                            <button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 rounded-lg transition">
                                Check availability
                            </button>

                            <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                You won't be charged yet
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
