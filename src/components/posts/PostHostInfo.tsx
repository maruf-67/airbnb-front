import { UserCircleIcon } from '@heroicons/react/24/solid';

interface PostHostInfoProps {
    ownerName: string;
    ownerAvatar?: string;
}

export default function PostHostInfo({ ownerName, ownerAvatar }: PostHostInfoProps) {
    return (
        <div className="py-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full overflow-hidden bg-gray-200">
                    {ownerAvatar ? (
                        <img src={(ownerAvatar.startsWith('http') ? '' : 'http://localhost:3050') + ownerAvatar} alt={ownerName} className="h-full w-full object-cover" />
                    ) : (
                        <UserCircleIcon className="h-full w-full text-gray-400" />
                    )}
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Hosted by {ownerName}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Joined May 2021</p>
                </div>
            </div>
        </div>
    );
}
