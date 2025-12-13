'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface ServerPaginationProps {
    totalPages: number;
}

export default function ServerPagination({ totalPages }: ServerPaginationProps) {
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', pageNumber.toString());
        return `/?${params.toString()}`;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-4 mt-12 mb-8">
            <Link
                href={createPageURL(currentPage - 1)}
                className={`flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all hover:border-gray-900 dark:hover:border-gray-400 hover:shadow-sm ${currentPage <= 1
                    ? 'pointer-events-none opacity-50'
                    : ''
                    }`}
                aria-disabled={currentPage <= 1}
            >
                <ChevronLeftIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </Link>

            <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                Page {currentPage} of {totalPages}
            </span>

            <Link
                href={createPageURL(currentPage + 1)}
                className={`flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all hover:border-gray-900 dark:hover:border-gray-400 hover:shadow-sm ${currentPage >= totalPages
                    ? 'pointer-events-none opacity-50'
                    : ''
                    }`}
                aria-disabled={currentPage >= totalPages}
            >
                <ChevronRightIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </Link>
        </div>
    );
}
