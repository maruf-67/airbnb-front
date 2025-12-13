'use client';

import { useAuth } from '@/contexts';
import Link from 'next/link';
import { Menu } from '@headlessui/react';
import { UserCircleIcon, Bars3Icon } from '@heroicons/react/24/solid';

export default function AirbnbNav() {
  const { user, logout } = useAuth();

  return (
    <div className="flex w-full items-center gap-6">
      {/* Logo */}
      <Link href="/" className="relative h-8 w-[102px] flex-1 overflow-clip min-w-px min-h-px block">
        <svg
          className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-[102px]"
          viewBox="0 0 102 32"
          fill="currentColor"
        >
          <path
            d="M51.8 3.8c-5.1 0-8.9 3.8-8.9 8.9s3.8 8.9 8.9 8.9 8.9-3.8 8.9-8.9-3.8-8.9-8.9-8.9zm0 14.7c-3.3 0-5.8-2.5-5.8-5.8s2.5-5.8 5.8-5.8 5.8 2.5 5.8 5.8-2.6 5.8-5.8 5.8zM68.4 3.8c-5.1 0-8.9 3.8-8.9 8.9s3.8 8.9 8.9 8.9 8.9-3.8 8.9-8.9-3.9-8.9-8.9-8.9zm0 14.7c-3.3 0-5.8-2.5-5.8-5.8s2.5-5.8 5.8-5.8 5.8 2.5 5.8 5.8-2.6 5.8-5.8 5.8zM35.1 3.8c-5.1 0-8.9 3.8-8.9 8.9s3.8 8.9 8.9 8.9 8.9-3.8 8.9-8.9-3.8-8.9-8.9-8.9zm0 14.7c-3.3 0-5.8-2.5-5.8-5.8s2.5-5.8 5.8-5.8 5.8 2.5 5.8 5.8-2.5 5.8-5.8 5.8zM84.6 10.3v-6h-3.1v6.4c-.8-.5-1.7-.8-2.7-.8-2.9 0-5.3 2.4-5.3 5.3s2.4 5.3 5.3 5.3 5.3-2.4 5.3-5.3V10.3h.5zm-5.8 7.1c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM94.1 9.5c-2.9 0-5.3 2.4-5.3 5.3s2.4 5.3 5.3 5.3 5.3-2.4 5.3-5.3-2.4-5.3-5.3-5.3zm0 7.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM14.5 0c-.3 0-.6.1-.8.3L.3 13.7c-.4.4-.4 1 0 1.4l13.4 13.4c.4.4 1 .4 1.4 0l13.4-13.4c.4-.4.4-1 0-1.4L15.3.3c-.2-.2-.5-.3-.8-.3zm0 25.9L2.4 13.8 14.5 1.7l12.1 12.1-12.1 12.1z"
            fill="white"
          />
        </svg>
      </Link>

      {/* Pages */}
      <div className="hidden md:flex shrink-0 items-start gap-8">
        <div className="flex flex-col items-center gap-1 shrink-0 cursor-pointer">
          <p className="text-base font-normal leading-6 text-white whitespace-nowrap">
            Places to stay
          </p>
          <div className="h-0.5 w-4 bg-white rounded-full" />
        </div>
        <div className="flex flex-col items-center gap-1 shrink-0 cursor-pointer opacity-70 hover:opacity-100">
          <p className="text-base font-normal leading-6 text-white whitespace-nowrap">
            Experiences
          </p>
          <div className="h-0.5 w-4 bg-white rounded-full opacity-0" />
        </div>
        <div className="flex flex-col items-center gap-1 shrink-0 cursor-pointer opacity-70 hover:opacity-100">
          <p className="text-base font-normal leading-6 text-white whitespace-nowrap">
            Online Experiences
          </p>
          <div className="h-0.5 w-4 bg-white rounded-full opacity-0" />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-1 items-center justify-end gap-4 min-w-px min-h-px">
        <p className="text-sm font-medium leading-5 text-white whitespace-nowrap cursor-pointer hover:bg-white/10 px-4 py-2 rounded-full transition hidden sm:block">
          Become a Host
        </p>

        {/* Globe Icon */}
        <div className="relative size-6 overflow-clip shrink-0 cursor-pointer hover:bg-white/10 p-1 rounded-full w-10 h-10 flex items-center justify-center transition">
          <svg
            className="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        </div>

        {/* Profile Dropdown */}
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center gap-2 bg-white rounded-full p-1 pl-3 pr-1 shrink-0 hover:shadow-md transition cursor-pointer border border-gray-200">
            <Bars3Icon className="h-4 w-4 text-gray-700" />
            <div className="relative size-8 shrink-0 rounded-full bg-gray-500 overflow-hidden text-gray-500">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <UserCircleIcon className="w-full h-full text-gray-400 bg-gray-100" />
              )}
            </div>
          </Menu.Button>

          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden z-50">
            {user ? (
              <>
                <div className="px-4 py-3">
                  <p className="text-sm text-gray-900 font-semibold truncate">Hello, {user.name.split(' ')[0]}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link href="/account" className={`${active ? 'bg-gray-50' : ''} block px-4 py-2 text-sm text-gray-700`}>
                        Account
                      </Link>
                    )}
                  </Menu.Item>
                  {user.role?.type === 'admin' && (
                    <Menu.Item>
                      {({ active }) => (
                        <Link href="/admin" className={`${active ? 'bg-gray-50' : ''} block px-4 py-2 text-sm text-gray-700`}>
                          Admin Panel
                        </Link>
                      )}
                    </Menu.Item>
                  )}
                  <Menu.Item>
                    {({ active }) => (
                      <Link href="/trips" className={`${active ? 'bg-gray-50' : ''} block px-4 py-2 text-sm text-gray-700`}>
                        My Trips
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link href="/wishlists" className={`${active ? 'bg-gray-50' : ''} block px-4 py-2 text-sm text-gray-700`}>
                        Wishlists
                      </Link>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={logout}
                        className={`${active ? 'bg-gray-50' : ''} block w-full text-left px-4 py-2 text-sm text-gray-700`}
                      >
                        Log out
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </>
            ) : (
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/login" className={`${active ? 'bg-gray-50' : ''} block px-4 py-2 text-sm font-semibold text-gray-900`}>
                      Log in
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/register" className={`${active ? 'bg-gray-50' : ''} block px-4 py-2 text-sm text-gray-700`}>
                      Sign up
                    </Link>
                  )}
                </Menu.Item>
                <div className="border-t border-gray-100 my-1"></div>
                <Menu.Item>
                  {({ active }) => (
                    <Link href="#" className={`${active ? 'bg-gray-50' : ''} block px-4 py-2 text-sm text-gray-700`}>
                      Airbnb your home
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link href="#" className={`${active ? 'bg-gray-50' : ''} block px-4 py-2 text-sm text-gray-700`}>
                      Help Center
                    </Link>
                  )}
                </Menu.Item>
              </div>
            )}
          </Menu.Items>
        </Menu>
      </div>
    </div>
  );
}
