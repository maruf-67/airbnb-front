import Image from 'next/image';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/solid';

import { Post } from '@/types';

type ListingCardProps = {
    post: Post;
};

export default function ListingCard({ post }: ListingCardProps) {
    return (
        <Link href={`/listings/${post._id}`} className="group relative cursor-pointer block">
            <div className="aspect-square w-full overflow-hidden rounded-xl bg-gray-200 dark:bg-neutral-800 relative">
                <Image
                    src={post.images[0] || 'https://placehold.co/600x400'}
                    alt={post.title}
                    fill
                    className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 fill-black/50">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                </div>
            </div>
            <div className="mt-3 flex justify-between">
                <div>
                    <h3 className="text-sm font-semibold text-foreground line-clamp-1">{post.location}</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{post.title}</p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold text-foreground">${post.price}</span> night
                    </p>
                </div>
                <div className="flex items-center gap-1 text-sm">
                    <StarIcon className="h-4 w-4 text-foreground" />
                    <span className="text-foreground">{post.rating || 'New'}</span>
                </div>
            </div>
        </Link>
    );
}
