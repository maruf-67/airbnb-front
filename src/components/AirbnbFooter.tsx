export default function AirbnbFooter() {
  return (
    <div className="flex w-full flex-col items-start gap-12">
      {/* Columns */}
      <div className="flex w-full items-start gap-6">
        {/* Support Column */}
        <div className="flex flex-1 flex-col items-start gap-4 min-w-px min-h-px shrink-0 whitespace-pre-wrap">
          <p className="w-full text-base font-medium leading-6 text-black">
            Support
          </p>
          <p className="w-full text-sm font-normal leading-5 text-gray-600">
            Help Center
          </p>
          <p className="w-full text-sm font-normal leading-5 text-gray-600">
            Safety information
          </p>
          <p className="w-full text-sm font-normal leading-5 text-gray-600">
            Cancellation options
          </p>
          <p className="w-full text-sm font-normal leading-5 text-gray-600">
            Our COVID-19 Response
          </p>
          <p className="w-full text-sm font-normal leading-5 text-gray-600">
            Supporting people with disabilities
          </p>
          <p className="w-full text-sm font-normal leading-5 text-gray-600">
            Report a neighborhoood concern
          </p>
        </div>

        {/* Community Column */}
        <div className="flex flex-1 flex-col items-start gap-4 min-w-px min-h-px shrink-0 whitespace-pre-wrap">
          <p className="w-full text-base font-medium leading-6 text-black">
            Community
          </p>
          <p className="w-full text-sm font-normal leading-5 text-gray-600">
            Airbnb.org: disaster relief housing
          </p>
          <p className="w-full text-sm font-normal leading-5 text-gray-600">
            Support: Afghan refugees
          </p>
          <p className="w-full text-sm font-normal leading-5 text-gray-600">
            Celebrating diversity & belonging
          </p>
          <p className="w-full text-sm font-normal leading-5 text-gray-600">
            Combating discriminatino
          </p>
        </div>

        {/* Hosting Column */}
        <div className="flex flex-1 flex-col items-start gap-4 min-w-px min-h-px shrink-0 whitespace-pre-wrap">
          <p className="w-full text-base font-medium leading-6 text-black">
            Hosting
          </p>
          <p className="w-full text-sm font-normal leading-5 text-gray-600">
            Try hosting
          </p>
          <p className="w-full text-sm font-normal leading-5 text-gray-600">
            AirCover: protection for Hosts
          </p>
          <p className="w-full text-sm font-normal leading-5 text-gray-600">
            Explore hosting resources
          </p>
          <p className="w-full text-sm font-normal leading-5 text-gray-600">
            Visit our community forum
          </p>
          <p className="w-full text-sm font-normal leading-5 text-gray-600">
            How to host responsibly
          </p>
        </div>

        {/* About Column */}
        <div className="flex flex-1 flex-col items-start gap-4 min-w-px min-h-px shrink-0 whitespace-pre-wrap">
          <p className="w-full text-base font-medium leading-6 text-black">
            About
          </p>
          <p className="w-full text-sm font-normal leading-5 text-gray-600">
            Newsroom
          </p>
          <p className="w-full text-sm font-normal leading-5 text-gray-600">
            Learn about new features
          </p>
          <p className="w-full text-sm font-normal leading-5 text-gray-600">
            Letter from our founders
          </p>
          <p className="w-full text-sm font-normal leading-5 text-gray-600">
            Careers
          </p>
          <p className="w-full text-sm font-normal leading-5 text-gray-600">
            Investors
          </p>
          <p className="w-full text-sm font-normal leading-5 text-gray-600">
            Airbnb Luxe
          </p>
        </div>
      </div>

      {/* Kicker */}
      <div className="flex w-full flex-col items-start gap-6 shrink-0">
        {/* Divider */}
        <div className="h-0 w-full shrink-0 border-t border-gray-200" />

        {/* Sub-Footer */}
        <div className="flex w-full items-center justify-between shrink-0">
          {/* Left */}
          <div className="flex items-center gap-2 shrink-0">
            <p className="text-sm font-normal leading-5 text-gray-600 shrink-0">
              © 2022 Airbnb, Inc.
            </p>
            <div className="size-0.5 shrink-0 bg-gray-600 rounded-full" />
            <p className="text-sm font-normal leading-5 text-gray-600 shrink-0">
              Privacy
            </p>
            <div className="size-0.5 shrink-0 bg-gray-600 rounded-full" />
            <p className="text-sm font-normal leading-5 text-gray-600 shrink-0">
              Terms
            </p>
            <div className="size-0.5 shrink-0 bg-gray-600 rounded-full" />
            <p className="text-sm font-normal leading-5 text-gray-600 shrink-0">
              Sitemap
            </p>
          </div>

          {/* Right */}
          <div className="flex items-start gap-10 shrink-0">
            {/* Language & Currency */}
            <div className="flex items-start gap-4 shrink-0">
              {/* Language */}
              <div className="flex items-center gap-1 shrink-0">
                <div className="relative size-6 overflow-clip shrink-0">
                  <svg
                    className="size-full"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4B5563"
                    strokeWidth="1.5"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    <path d="M2 12h20" />
                  </svg>
                </div>
                <p className="text-sm font-medium leading-5 text-gray-600 underline shrink-0">
                  English (US)
                </p>
              </div>

              {/* Currency */}
              <div className="flex items-center gap-1 shrink-0">
                <div className="relative size-6 overflow-clip shrink-0">
                  <svg
                    className="size-full"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4B5563"
                    strokeWidth="1.5"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <p className="text-sm font-medium leading-5 text-gray-600 underline shrink-0">
                  USD
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-start gap-4 shrink-0">
              {/* Facebook */}
              <div className="relative size-6 shrink-0">
                <svg
                  className="size-full"
                  viewBox="0 0 24 24"
                  fill="#4B5563"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>

              {/* Twitter */}
              <div className="relative size-6 shrink-0">
                <svg
                  className="size-full"
                  viewBox="0 0 24 24"
                  fill="#4B5563"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </div>

              {/* Instagram */}
              <div className="relative size-6 overflow-clip shrink-0">
                <svg
                  className="size-full"
                  viewBox="0 0 24 24"
                  fill="#4B5563"
                >
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
