'use client';

import Image from 'next/image';
import { PhotoIcon } from '@heroicons/react/24/outline';

interface PostImageGalleryProps {
    images: string[];
}

export default function PostImageGallery({ images }: PostImageGalleryProps) {
    // Ensure we have at least 5 images for the grid (using placeholders if needed for now, or just handle empty)
    // For the design, we ideally want 5. If fewer, we can adjust layout, but for this clone, let's assume valid data or fallback.

    const displayImages = images.length > 0 ? images : [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1600',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800',
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=800',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800',
    ];

    return (
        <div className="relative rounded-xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 h-[300px] md:h-[400px] lg:h-[500px]">
                {/* Main large image */}
                <div className="md:col-span-2 md:row-span-2 relative">
                    <Image
                        src={displayImages[0]}
                        alt="Main photo"
                        fill
                        className="object-cover hover:opacity-95 transition-opacity cursor-pointer text-gray-400 bg-gray-200 dark:bg-gray-800"
                        priority
                    />
                </div>

                {/* Smaller images */}
                <div className="hidden md:block relative">
                    <Image
                        src={displayImages[1] || displayImages[0]}
                        alt="Photo 2"
                        fill
                        className="object-cover hover:opacity-95 transition-opacity cursor-pointer bg-gray-200 dark:bg-gray-800"
                    />
                </div>
                <div className="hidden md:block relative">
                    <Image
                        src={displayImages[2] || displayImages[0]}
                        alt="Photo 3"
                        fill
                        className="object-cover hover:opacity-95 transition-opacity cursor-pointer bg-gray-200 dark:bg-gray-800"
                    />
                </div>
                <div className="hidden md:block relative">
                    <Image
                        src={displayImages[3] || displayImages[0]}
                        alt="Photo 4"
                        fill
                        className="object-cover hover:opacity-95 transition-opacity cursor-pointer bg-gray-200 dark:bg-gray-800"
                    />
                </div>
                <div className="hidden md:block relative">
                    <Image
                        src={displayImages[4] || displayImages[0]}
                        alt="Photo 5"
                        fill
                        className="object-cover hover:opacity-95 transition-opacity cursor-pointer bg-gray-200 dark:bg-gray-800"
                    />
                </div>
            </div>

            <button className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 border border-gray-900 dark:border-gray-200 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center gap-2">
                <PhotoIcon className="h-4 w-4" />
                Show all photos
            </button>
        </div>
    );
}
