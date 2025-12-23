'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PostCardProps {
    id: string;
    title: string;
    location: string;
    price: number;
    images: string[];
    rating?: number;
}

const PostCard: React.FC<PostCardProps> = ({ id, title, location, price, images, rating }) => {
    const mainImage = images && images.length > 0 ? images[0] : 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800';

    return (
        <Link href={`/posts/${id}`} className="group block h-full">
            <div className="flex bg-white dark:bg-gray-900 h-full flex-col overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-200 dark:bg-gray-800">
                    <Image
                        src={mainImage}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3 rounded-full bg-white/90 dark:bg-gray-800/90 px-2 py-1 text-xs font-semibold text-gray-900 dark:text-gray-100 shadow-sm backdrop-blur-sm">
                        ★ {rating || '4.9'}
                    </div>
                </div>

                <div className="flex flex-1 flex-col p-4">
                    <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate pr-2">{title}</h3>
                        <div className="flex items-center gap-1">
                            {/* Assuming StarIcon is imported or defined elsewhere */}
                            {/* <StarIcon className="h-4 w-4 text-gray-900 dark:text-white" /> */}
                            <span className="text-gray-900 dark:text-white">{rating}</span>
                        </div>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">{location}</p>
                    <div className="mt-1 flex items-baseline gap-1">
                        <span className="font-semibold text-gray-900 dark:text-white">${price}</span>
                        <span className="text-gray-900 dark:text-white">night</span>
                    </div>              </div>
            </div>
        </Link>
    );
};

export default PostCard;
