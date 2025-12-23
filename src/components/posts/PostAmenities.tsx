import {
    WifiIcon,
    TvIcon,
    HomeModernIcon,
    FireIcon,
    TruckIcon,
    MapPinIcon
} from '@heroicons/react/24/outline';

interface PostAmenitiesProps {
    amenities: string[];
}

export default function PostAmenities({ amenities }: PostAmenitiesProps) {
    // Mapping of common amenities to icons
    // In a real app, this might be more robust or dynamic
    const getIcon = (item: string) => {
        const lower = item.toLowerCase();
        if (lower.includes('wifi')) return <WifiIcon className="h-6 w-6" />;
        if (lower.includes('tv')) return <TvIcon className="h-6 w-6" />;
        if (lower.includes('kitchen')) return <HomeModernIcon className="h-6 w-6" />;
        if (lower.includes('heating') || lower.includes('ac')) return <FireIcon className="h-6 w-6" />;
        if (lower.includes('parking')) return <TruckIcon className="h-6 w-6" />;
        return <MapPinIcon className="h-6 w-6" />; // Default
    };

    if (!amenities || amenities.length === 0) {
        return null;
    }

    return (
        <div className="py-8 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">What this place offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {amenities.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                        {getIcon(item)}
                        <span>{item}</span>
                    </div>
                ))}
            </div>
            <button className="mt-6 border border-gray-900 dark:border-gray-100 rounded-lg px-6 py-3 font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                Show all {amenities.length} amenities
            </button>
        </div>
    );
}
