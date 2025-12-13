'use client';

import { StarIcon } from '@heroicons/react/24/solid';

interface PostBookingWidgetProps {
    price: number;
    rating?: number;
}

export default function PostBookingWidget({ price, rating }: PostBookingWidgetProps) {
    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-6 sticky top-28">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">${price}</span>
                    <span className="text-gray-500 dark:text-gray-400"> night</span>
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold  text-gray-900 dark:text-gray-200">
                    <StarIcon className="h-4 w-4 inline mb-[2px]" />
                    {rating || '4.9'} · <span className="underline text-gray-500 dark:text-gray-400">124 reviews</span>
                </div>
            </div>

            <div className="border border-gray-400 rounded-lg overflow-hidden mb-4">
                <div className="grid grid-cols-2 border-b border-gray-400">
                    <div className="border-r border-gray-400 p-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                        <label className="block text-[10px] font-bold uppercase text-gray-900 dark:text-gray-100">Check-in</label>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Add date</div>
                    </div>
                    <div className="p-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                        <label className="block text-[10px] font-bold uppercase text-gray-900 dark:text-gray-100">Check-out</label>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Add date</div>
                    </div>
                </div>
                <div className="p-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                    <label className="block text-[10px] font-bold uppercase text-gray-900 dark:text-gray-100">Guests</label>
                    <div className="text-sm text-gray-600 dark:text-gray-300">1 guest</div>
                </div>
            </div>

            <button className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-lg transition transform active:scale-95 shadow-lg">
                Reserve
            </button>

            <div className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
                You won't be charged yet
            </div>

            <div className="mt-6 space-y-3 text-gray-600 dark:text-gray-300">
                <div className="flex justify-between">
                    <span className="underline">${price} x 5 nights</span>
                    <span>${price * 5}</span>
                </div>
                <div className="flex justify-between">
                    <span className="underline">Cleaning fee</span>
                    <span>$75</span>
                </div>
                <div className="flex justify-between">
                    <span className="underline">Service fee</span>
                    <span>$50</span>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between font-bold text-lg text-gray-900 dark:text-white">
                <span>Total</span>
                <span>${(price * 5) + 75 + 50}</span>
            </div>
        </div>
    );
}
