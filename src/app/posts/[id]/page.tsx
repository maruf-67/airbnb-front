import { notFound } from 'next/navigation';
import PostImageGallery from '@/components/posts/PostImageGallery';
import PostBookingWidget from '@/components/posts/PostBookingWidget';
import PostAmenities from '@/components/posts/PostAmenities';
import PostHostInfo from '@/components/posts/PostHostInfo';
import AirbnbNav from '@/components/AirbnbNav';
import AirbnbFooter from '@/components/AirbnbFooter';
import { StarIcon } from '@heroicons/react/24/solid';

async function getPost(id: string) {
    try {
        const res = await fetch(`http://localhost:3050/api/v1/posts/${id}`, {
            cache: 'no-store',
        });

        if (!res.ok) {
            if (res.status === 404) return null;
            throw new Error('Failed to fetch post');
        }

        const data = await res.json();
        return data.data; // Assuming response structure { success: true, data: { ...post } }
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default async function PostPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const post = await getPost(params.id);

    if (!post) {
        notFound();
    }

    return (
        <div className="flex min-h-screen flex-col bg-white dark:bg-[#0f0f0f] transition-colors duration-300">
            <AirbnbNav />

            <main className="flex-1 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 pt-6 pb-20 w-full">
                {/* Title Section */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{post.title}</h1>
                    <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-gray-200 font-medium">
                        <span className="flex items-center gap-1">
                            <StarIcon className="h-4 w-4" /> 4.9 ·
                        </span>
                        <span className="underline cursor-pointer">12 reviews</span> ·
                        <span className="underline cursor-pointer">{post.location}</span>
                    </div>
                </div>

                {/* Image Gallery */}
                <PostImageGallery images={post.images} />

                {/* Content Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
                    {/* Left Column: Details */}
                    <div className="md:col-span-2">
                        <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                Entire home in {post.location.split(',')[0]}
                            </h2>
                            <p className="text-gray-900 dark:text-gray-200">
                                {post.maxGuests || 2} guests · {post.bedrooms || 1} bedroom · {post.beds || 1} bed · {post.bathrooms || 1} bath
                            </p>
                        </div>

                        <PostHostInfo ownerName={post.owner?.name || "Host"} ownerAvatar={post.owner?.avatar} />

                        <div className="py-8 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-lg">
                                {post.description}
                            </p>
                        </div>

                        <PostAmenities amenities={post.amenities} />
                    </div>

                    {/* Right Column: Sticky Booking Widget */}
                    <div className="md:col-span-1 relative">
                        <PostBookingWidget price={post.price} />
                    </div>
                </div>
            </main>

            <AirbnbFooter />
        </div>
    );
}
