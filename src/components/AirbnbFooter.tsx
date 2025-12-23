export default function AirbnbFooter() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0f0f0f] transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 py-12">

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Support Column */}
          <div className="flex flex-col gap-4 text-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white">Support</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="hover:underline cursor-pointer">Help Center</li>
              <li className="hover:underline cursor-pointer">AirCover</li>
              <li className="hover:underline cursor-pointer">Anti-discrimination</li>
              <li className="hover:underline cursor-pointer">Disability support</li>
              <li className="hover:underline cursor-pointer">Cancellation options</li>
              <li className="hover:underline cursor-pointer">Report neighborhood concern</li>
            </ul>
          </div>

          {/* Hosting Column */}
          <div className="flex flex-col gap-4 text-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white">Hosting</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="hover:underline cursor-pointer">Airbnb your home</li>
              <li className="hover:underline cursor-pointer">AirCover for Hosts</li>
              <li className="hover:underline cursor-pointer">Hosting resources</li>
              <li className="hover:underline cursor-pointer">Community forum</li>
              <li className="hover:underline cursor-pointer">Hosting responsibly</li>
              <li className="hover:underline cursor-pointer">Airbnb-friendly apartments</li>
            </ul>
          </div>

          {/* Community Column */}
          <div className="flex flex-col gap-4 text-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white">Airbnb</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="hover:underline cursor-pointer">Newsroom</li>
              <li className="hover:underline cursor-pointer">New features</li>
              <li className="hover:underline cursor-pointer">Careers</li>
              <li className="hover:underline cursor-pointer">Investors</li>
              <li className="hover:underline cursor-pointer">Gift cards</li>
              <li className="hover:underline cursor-pointer">Airbnb.org emergency stays</li>
            </ul>
          </div>

          {/* About Column - Merged for standard design or extra */}
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex flex-wrap justify-center gap-2">
            <span>© 2025 Airbnb, Inc.</span>
            <span className="hidden md:inline">·</span>
            <span className="hover:underline cursor-pointer">Privacy</span>
            <span className="hidden md:inline">·</span>
            <span className="hover:underline cursor-pointer">Terms</span>
            <span className="hidden md:inline">·</span>
            <span className="hover:underline cursor-pointer">Sitemap</span>
          </div>

          <div className="flex items-center gap-6 font-semibold text-gray-900 dark:text-white">
            <div className="flex items-center gap-2 cursor-pointer hover:underline">
              <span className="mr-1">🌐</span> English (US)
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:underline">
              <span>$</span> USD
            </div>
            <div className="flex items-center gap-4">
              {/* Social Icons Placeholder */}
              <span className="cursor-pointer hover:text-rose-500 transition">
                <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </span>
              <span className="cursor-pointer hover:text-rose-500 transition">
                <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </span>
              <span className="cursor-pointer hover:text-rose-500 transition">
                <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 014.18 3.388c.636-.247 1.363-.416 2.427-.465C7.673 2.012 8.016 2 10.38 2h1.935zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zm5.338-3.205a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4z" clipRule="evenodd" /></svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
