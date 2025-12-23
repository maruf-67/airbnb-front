import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3050/api/v1';

// Extract base URL without /api/v1
const getBaseUrl = () => {
    return API_BASE_URL.replace('/api/v1', '');
};

export const getAvatarUrl = (avatarPath: string | null | undefined): string | null => {
    if (!avatarPath) return null;

    // If already a full URL, return as is
    if (avatarPath.startsWith('http://') || avatarPath.startsWith('https://')) {
        return avatarPath;
    }

    // Construct full URL
    return `${getBaseUrl()}${avatarPath}`;
};
