'use client';

import React from 'react';
import Image from 'next/image';

const Banner = () => {
    return (
        <div className="relative h-[500px] w-full bg-black text-center flex flex-col items-center justify-center overflow-hidden rounded-2xl my-6">
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2000"
                    alt="Banner Background"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
            </div>

            <div className="relative z-10 flex flex-col items-center gap-6 px-4">
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight drop-shadow-lg">
                    Find Your Ideal Stay
                </h1>
                <p className="text-lg md:text-xl text-gray-200 font-medium max-w-2xl drop-shadow-md">
                    Discover best-in-class homes, cabins, and unique stays around the world.
                    Perfect for your next getaway.
                </p>

                <button className="mt-4 px-8 py-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-full transform transition hover:scale-105 active:scale-95 shadow-lg">
                    Start Exploring
                </button>
            </div>
        </div>
    );
};

export default Banner;
