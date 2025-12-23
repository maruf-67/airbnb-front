'use client';

import { useAuth, useTheme } from '@/contexts';
import Link from 'next/link';
import { Menu } from '@headlessui/react';
import { UserCircleIcon, Bars3Icon, SunIcon, MoonIcon } from '@heroicons/react/24/solid';

export default function AirbnbNav() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  // Helper to ensure avatar URL is absolute
  const getAvatarUrl = (path: string | undefined) => {
    if (!path) return undefined;
    if (path.startsWith('http') || path.startsWith('https')) {
      return path;
    }
    return `http://localhost:3050${path}`;
  };

  const avatarUrl = getAvatarUrl(user?.avatar);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-[#0f0f0f] border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-1">
            <div className="relative h-8 w-8">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="block h-full w-full fill-[#FF385C] dark:fill-white transition-colors" aria-hidden="true" role="presentation" focusable="false">
                <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 3.162.726 4.692-.246 2.05-1.453 4.192-3.616 5.433-2.163 1.241-4.708 1.487-7.639.697-3.479-.938-5.322-2.316-5.83-2.735a20.08 20.08 0 0 1-.271-.225 3.39 3.39 0 0 1-.786.745c-.322.21-.904.542-1.782.934-2.812 1.258-5.352 1.206-7.534.123-2.227-1.106-3.593-3.236-3.92-5.41-.24-1.593-.036-3.216.608-4.852l.243-.585c.983-2.296 5.146-11.006 7.101-14.836l.533-1.025C6.537 1.963 7.992 1 10 1h6zm0 2H10c-.808 0-1.758.55-2.709 2.253l-.527 1.013C4.814 8.077 1.624 14.846 1.624 14.846c-.503 1.278-.659 2.502-.486 3.655.244 1.623 1.267 3.206 2.879 4.008 1.554.772 3.425.86 5.568-.098.814-.364 1.343-.67 1.705-.905.087-.056.166-.11.238-.16a1.39 1.39 0 0 0 .548-.752l.063-.264.07-.492a2.802 2.802 0 0 1 2.37-2.37l.493-.07.264-.063a1.402 1.402 0 0 0 1.016-1.3l.03-.432-.016-.36a2.802 2.802 0 0 1 2.37-2.37l.492-.07.264-.063a1.397 1.397 0 0 0 .61-2.272 26.697 26.697 0 0 1-.365-.39c-.197-.206-.412-.415-.644-.627a1.401 1.401 0 0 0-1.764-.083l-.348.257-.387.234a2.802 2.802 0 0 1-2.924-.132l-.4-.257-.348-.27a1.402 1.402 0 0 0-1.791.077c-.12.106-.282.256-.475.45l-.066.068a1.397 1.397 0 0 0-.178 1.68l.215.378.21.439a2.802 2.802 0 0 1-.132 2.924l-.257.4-.27.348a1.402 1.402 0 0 0 .077 1.791c.147.167.336.372.541.59l.07.072a1.4 1.4 0 0 0 1.65.21l.378-.215.439-.21a2.802 2.802 0 0 1 2.925.132l.4.257.347.27a1.402 1.402 0 0 0 1.792-.077c.451-.512.83-1.01 1.127-1.488.232-.375.428-.737.587-1.082a1.397 1.397 0 0 0-.083-1.474l-.257-.348-.234-.387a2.802 2.802 0 0 1 .132-2.924l-.257-.4.27-.348a1.402 1.402 0 0 0-.077-1.791l-.014-.015c-.23-.257-.52-.57-.803-.865a1.4 1.4 0 0 0-1.635-.246l-.378.216-.439.21a2.802 2.802 0 0 1-2.924-.132l-.4-.257-.348-.27a1.402 1.402 0 0 0-1.791.077l-.023.024c-.198.22-.444.498-.682.787a1.4 1.4 0 0 0 .083 1.764l.257.348.234.387a2.802 2.802 0 0 1-.132 2.924l-.257.4-.27.348a1.402 1.402 0 0 0 .077 1.791l.011.013c.241.28.53.606.82.906a1.4 1.4 0 0 0 1.64.237l.378-.216.439-.21a2.802 2.802 0 0 1 2.924.132l.4.257.348.27a1.402 1.402 0 0 0 1.791-.077l.076-.084c.333-.377.72-.857 1.096-1.392.366-.521.696-1.11.979-1.748l.056-.128a1.4 1.4 0 0 0-.411-1.666l-.348-.257-.387-.234a2.802 2.802 0 0 1-.132-2.924l.257-.4.27-.348a1.402 1.402 0 0 0-.077-1.791l-.004-.004c-.16-.179-.344-.389-.55-.623l-.067-.074a1.4 1.4 0 0 0-1.656-.206l-.378.215-.439.21a2.802 2.802 0 0 1-2.925-.132l-.4-.257-.347-.27a1.402 1.402 0 0 0-1.792.077c-.31.352-.644.755-.95 1.162-.303.404-.576.81-.817 1.201a1.397 1.397 0 0 0 .11 1.54l.257.348.234.387a2.802 2.802 0 0 1-.132 2.924l-.257.4-.27.348a1.402 1.402 0 0 0 .077 1.791c.219.248.47.533.74.83l.035.038a1.4 1.4 0 0 0 1.61.272l.378-.216.439-.21a2.802 2.802 0 0 1 2.924.132l.4.257.348.27a1.402 1.402 0 0 0 1.791-.077l.006-.007c.216-.242.47-.534.757-.864.285-.328.59-.691.905-1.084a1.4 1.4 0 0 0-.137-1.907l-.348-.257-.387-.234a2.802 2.802 0 0 1-.132-2.924l.257-.4.27-.348a1.402 1.402 0 0 0 .077-1.791c.106-.12.246-.273.414-.467l.073-.082a1.4 1.4 0 0 0 .19-1.674l-.215-.378-.21-.439a2.802 2.802 0 0 1 .132-2.924l.257-.4.27-.348a1.402 1.402 0 0 0-.077-1.791l-.044-.049c-.212-.236-.464-.492-.705-.733a1.4 1.4 0 0 0-1.57-.278l-.378.216-.439.21a2.802 2.802 0 0 1-2.924-.132l-.4-.257-.348-.27a1.402 1.402 0 0 0-1.791.077c-.201.229-.434.502-.693.805-.257.301-.54.646-.843 1.018a1.4 1.4 0 0 0 .165 2.016l.348.257.387.234a2.802 2.802 0 0 1 .132 2.924l-.257.4-.27.348a1.402 1.402 0 0 0-.077 1.791l.012.014c.189.21.417.458.636.702a1.4 1.4 0 0 0 1.614.303l.378-.215.439-.21a2.802 2.802 0 0 1 2.925.132l.4.257.347.27a1.402 1.402 0 0 0 1.792-.077c.307-.356.634-.766.969-1.221.332-.452.684-.972 1.042-1.56a1.397 1.397 0 0 0-.012-1.428l-.215-.378-.21-.439a2.802 2.802 0 0 1 .132-2.924l.257-.4.27-.348a1.402 1.402 0 0 0-.077-1.791l-.04-.047c-.205-.228-.431-.482-.676-.745a1.401 1.401 0 0 0-1.577-.31l-.378.216-.439.21a2.802 2.802 0 0 1-2.924-.132l-.4-.257-.348-.27a1.402 1.402 0 0 0-1.791.077c-.12.138-.266.313-.434.52l-.066.082a1.4 1.4 0 0 0 .216 1.954l.348.257.387.234a2.802 2.802 0 0 1 .132 2.924l-.257.4-.27.348a1.402 1.402 0 0 0 .077 1.791l.006.007c.185.207.397.444.629.7a1.4 1.4 0 0 0 1.6.309l.378-.216.439-.21a2.802 2.802 0 0 1 2.924.132l.4.257.348.27a1.402 1.402 0 0 0 1.791-.077c.338-.383.69-.817 1.045-1.292.352-.471.722-.998 1.09-1.571a1.4 1.4 0 0 0-.034-1.467l-.215-.378-.21-.439a2.802 2.802 0 0 1 .132-2.924l.257-.4.27-.348a1.402 1.402 0 0 0-.077-1.791l-.019-.022c-.179-.199-.396-.438-.636-.677a1.4 1.4 0 0 0-1.558-.288l-.378.216-.439.21a2.802 2.802 0 0 1-2.924-.132l-.4-.257-.348-.27a1.402 1.402 0 0 0-1.791.077c-.105.12-.244.271-.412.46l-.076.085a1.4 1.4 0 0 0 .195 1.696l.348.257.387.234a2.802 2.802 0 0 1 .132 2.924l-.257.4-.27.348a1.402 1.402 0 0 0 .077 1.791c.21.238.455.513.722.807l.033.036a1.4 1.4 0 0 0 1.62.257l.378-.216.439-.21a2.802 2.802 0 0 1 2.924.132l.4.257.348.27a1.402 1.402 0 0 0 1.791-.077c.395-.453.805-1.01 1.205-1.613.397-.6.79-1.258 1.159-1.928a1.4 1.4 0 0 0-.077-1.39l-.215-.379-.21-.439a2.802 2.802 0 0 1 .132-2.924l.257-.4.27-.348a1.402 1.402 0 0 0-.077-1.791l-.016-.018c-.183-.205-.389-.434-.616-.671a1.4 1.4 0 0 0-1.58-.266l-.378.215-.439.21a2.802 2.802 0 0 1-2.925-.132l-.4-.257-.347-.27a1.402 1.402 0 0 0-1.792.077c-.115.132-.266.305-.445.503l-.066.074a1.403 1.403 0 0 0 .229 1.942l.348.257.387.234a2.802 2.802 0 0 1 .132 2.924l-.257.4-.27.348a1.402 1.402 0 0 0 .077 1.791c.218.247.468.53.738.826l.035.039a1.4 1.4 0 0 0 1.612.27l.378-.215.439-.21a2.802 2.802 0 0 1 2.925.132l.4.257.347.27a1.402 1.402 0 0 0 1.792-.077c.451-.518.892-1.12 1.298-1.764.403-.642.772-1.312 1.087-1.968a1.4 1.4 0 0 0-.109-1.37l-.215-.378-.21-.439a2.802 2.802 0 0 1 .132-2.924l.257-.4.27-.348a1.402 1.402 0 0 0-.077-1.791l-.039-.043c-.198-.221-.424-.473-.674-.725a1.4 1.4 0 0 0-1.572-.293l-.378.216-.439.21a2.802 2.802 0 0 1-2.924-.132l-.4-.257-.348-.27a1.402 1.402 0 0 0-1.791.077c-.105.12-.218.25-.337.39l.235.42a2.8 2.8 0 0 1-.132 2.924l-.257.4-.27.348a1.402 1.402 0 0 0 .077 1.791c.205.234.405.461.597.68h.005a1.4 1.4 0 0 0 1.62.247l.378-.216.439-.21a2.802 2.802 0 0 1 2.924.132l.4.257.348.27a1.402 1.402 0 0 0 1.791-.077c.484-.555.952-1.196 1.377-1.875.424-.678.802-1.38 1.116-2.057a1.4 1.4 0 0 0-.129-1.365l-.215-.378-.21-.439a2.802 2.802 0 0 1 .132-2.924l.257-.4.27-.348a1.402 1.402 0 0 0-.077-1.791l-.031-.035c-.171-.19-.36-.401-.564-.61a1.4 1.4 0 0 0-1.58-.224l-.378.216-.439.21a2.802 2.802 0 0 1-2.924-.132l-.4-.257-.348-.27a1.402 1.402 0 0 0-1.791.077c-.012.013-.023.027-.035.04l.279.499a2.802 2.802 0 0 1-.132 2.924l-.257.4-.27.348a1.402 1.402 0 0 0 .077 1.791c.219.248.423.479.61.696l.035.039a1.4 1.4 0 0 0 1.61.27l.378-.216.439-.21a2.802 2.802 0 0 1 2.924.132l.4.257.348.27a1.402 1.402 0 0 0 1.791-.077c.394-.452.793-1.002 1.185-1.594.278-.42.535-.851.77-1.282A22.062 22.062 0 0 0 24.363 4.294l.533-1.025C26.184 1.037 27.639 2.074 29.647 2.074c2.008 0 3.463-.963 4.751-3.269l-3.551-5.115C28.893-9.14.963-8.177-1.045-8.177c-2.008 0-3.463 1.963-4.751 4.269l.533 1.025c.983 3.83 5.146 12.54 6.129 14.836l.243.585a2.802 2.802 0 0 1 2.37 2.37l.493.07.264.063a1.402 1.402 0 0 0 1.907-.137c.328-.285.691-.59 1.084-.905a1.4 1.4 0 0 0 .16-1.57l-.063-.061c-.02-.02-.041-.039-.062-.058L10.3 3.553C9.349 1.85 8.399 2.1 7.591 2.1zm8.4 0c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 3.162.726 4.692-.246 2.05-1.453 4.192-3.616 5.433-2.163 1.241-4.708 1.487-7.639.697-3.479-.938-5.322-2.316-5.83-2.735a20.08 20.08 0 0 1-.271-.225 3.39 3.39 0 0 1-.786.745c-.322.21-.904.542-1.782.934-2.812 1.258-5.352 1.206-7.534.123-2.227-1.106-3.593-3.236-3.92-5.41-.24-1.593-.036-3.216.608-4.852l.243-.585c.983-2.296 5.146-11.006 7.101-14.836l.533-1.025C22.537 1.963 23.992 1 26 1z" />
              </svg>
            </div>
            <span className="text-[#FF385C] dark:text-white text-xl font-bold tracking-tighter hidden md:block transition-colors">airbnb</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-900 dark:text-gray-100 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2 rounded-full transition">
              Home
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full cursor-pointer transition text-gray-900 dark:text-gray-100"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>

            <div className="hidden md:block text-sm font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 px-4 py-2 rounded-full cursor-pointer transition">
              Airbnb your home
            </div>

            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-full p-1 pl-3 transition hover:shadow-md dark:hover:bg-gray-800">
                <Bars3Icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <div className="h-8 w-8 bg-gray-500 rounded-full overflow-hidden text-white flex items-center justify-center relative">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={user?.name || "User"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserCircleIcon className="h-full w-full text-gray-400 bg-gray-100" />
                  )}
                </div>
              </Menu.Button>

              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 dark:divide-gray-700 rounded-xl bg-white dark:bg-[#1a1a1a] shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <div className="px-1 py-1">
                  {user ? (
                    <>
                      <Menu.Item>
                        {({ active }) => (
                          <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 mb-1">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">Hi, {user.name.split(' ')[0]}</p>
                          </div>
                        )}
                      </Menu.Item>

                      {user.role?.type === 'admin' ? (
                        <>
                          <Menu.Item>
                            {({ active }) => (
                              <Link href="/admin" className={`${active ? 'bg-gray-50 dark:bg-gray-700' : ''} group flex w-full items-center rounded-md px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}>
                                Admin Panel
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link href="/account" className={`${active ? 'bg-gray-50 dark:bg-gray-700' : ''} group flex w-full items-center rounded-md px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}>
                                Account
                              </Link>
                            )}
                          </Menu.Item>
                        </>
                      ) : (
                        <>
                          <Menu.Item>
                            {({ active }) => (
                              <Link href="/trips" className={`${active ? 'bg-gray-50 dark:bg-gray-700' : ''} group flex w-full items-center rounded-md px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}>
                                My Trips
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link href="/wishlists" className={`${active ? 'bg-gray-50 dark:bg-gray-700' : ''} group flex w-full items-center rounded-md px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}>
                                Wishlists
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link href="/account" className={`${active ? 'bg-gray-50 dark:bg-gray-700' : ''} group flex w-full items-center rounded-md px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}>
                                Account
                              </Link>
                            )}
                          </Menu.Item>
                        </>
                      )}

                      <Menu.Item>
                        {({ active }) => (
                          <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button onClick={logout} className={`${active ? 'bg-gray-50 dark:bg-gray-700' : ''} group flex w-full items-center rounded-md px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}>
                            Log out
                          </button>
                        )}
                      </Menu.Item>
                    </>
                  ) : (
                    <>
                      <Menu.Item>
                        {({ active }) => (
                          <Link href="/login" className={`${active ? 'bg-gray-50 dark:bg-gray-700' : ''} group flex w-full items-center rounded-md px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white`}>
                            Log in
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link href="/register" className={`${active ? 'bg-gray-50 dark:bg-gray-700' : ''} group flex w-full items-center rounded-md px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}>
                            Sign up
                          </Link>
                        )}
                      </Menu.Item>
                    </>
                  )}
                </div>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
}
