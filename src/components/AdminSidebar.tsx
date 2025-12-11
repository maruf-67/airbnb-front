'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    HomeIcon,
    UsersIcon,
    DocumentTextIcon,
    CurrencyDollarIcon,
    ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
import { deleteCookie } from 'cookies-next';

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: HomeIcon },
    { name: 'Users', href: '/users', icon: UsersIcon },
    { name: 'Posts', href: '/posts', icon: DocumentTextIcon },
    { name: 'Pricing', href: '/pricing', icon: CurrencyDollarIcon },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function AdminSidebar() {
    const pathname = usePathname();

    const handleLogout = () => {
        deleteCookie('token');
        deleteCookie('user');
        window.location.href = '/login';
    };

    return (
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
                <span className="text-xl font-bold text-white">Airbnb Admin</span>
            </div>
            <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={classNames(
                                            pathname.startsWith(item.href)
                                                ? 'bg-gray-800 text-white'
                                                : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                                        )}
                                    >
                                        <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li className="mt-auto">
                        <button
                            onClick={handleLogout}
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white w-full"
                        >
                            <ArrowLeftOnRectangleIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
