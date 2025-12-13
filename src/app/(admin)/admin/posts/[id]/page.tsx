'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PostService } from '@/services/post.service';
import { Post } from '@/types';
import { Button, Badge } from '@/components/ui';
import { ArrowLeftIcon, PencilSquareIcon, MapPinIcon, CurrencyDollarIcon, UserGroupIcon, CalendarIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function PostDetailsPage({ params }: PageProps) {
    const { id } = use(params);
    const router = useRouter();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPost = async () => {
            try {
                const data = await PostService.getById(id);
                setPost(data);
            } catch (error) {
                console.error('Failed to load post', error);
                router.push('/admin/posts');
            } finally {
                setLoading(false);
            }
        };
        loadPost();
    }, [id, router]);

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading details...</div>;
    }

    if (!post) {
        return <div className="p-8 text-center text-gray-500">Listing not found</div>;
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-10">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => router.push('/admin/posts')}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <ArrowLeftIcon className="w-5 h-5 text-gray-500" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{post.title}</h1>
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                                <CalendarIcon className="w-4 h-4" />
                                Created on {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                            <span>•</span>
                            <Badge variant={post.isPublished ? 'success' : 'warning'}>
                                {post.isPublished ? 'Published' : 'Draft'}
                            </Badge>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="default"
                        onClick={() => router.push(`/admin/posts/${post._id}/edit`)}
                    >
                        <PencilSquareIcon className="h-4 w-4 mr-2" />
                        Edit Listing
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Image Gallery */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 overflow-hidden">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Gallery</h3>
                        {post.images && post.images.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {post.images.map((img, idx) => (
                                    <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-gray-100">
                                        <Image
                                            src={img}
                                            alt={`Gallery ${idx + 1}`}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform"
                                            unoptimized
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-gray-500 italic py-8 text-center bg-gray-50 rounded-lg">No images uploaded</div>
                        )}
                    </div>

                    {/* Description */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Description</h3>
                        <div
                            className="prose prose-rose max-w-none text-gray-600"
                            dangerouslySetInnerHTML={{ __html: post.description }}
                        />
                    </div>

                    {/* Amenities */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Amenities</h3>
                        <div className="flex flex-wrap gap-2">
                            {post.amenities && post.amenities.length > 0 ? (
                                post.amenities.map((amenity, idx) => (
                                    <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200">
                                        {amenity}
                                    </span>
                                ))
                            ) : (
                                <span className="text-gray-500 italic">No amenities listed</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Overview</h3>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <CurrencyDollarIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                                <div>
                                    <span className="block text-sm text-gray-500">Price per Night</span>
                                    <span className="block text-lg font-medium text-gray-900">${post.price}</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <MapPinIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                                <div>
                                    <span className="block text-sm text-gray-500">Location</span>
                                    <span className="block text-base font-medium text-gray-900">{post.location}</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <UserGroupIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                                <div>
                                    <span className="block text-sm text-gray-500">Max Guests</span>
                                    <span className="block text-base font-medium text-gray-900">{post.maxGuests} Guests</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
