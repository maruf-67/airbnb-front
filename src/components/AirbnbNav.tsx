export default function AirbnbNav() {
  return (
    <div className="flex w-full items-center gap-6">
      {/* Logo */}
      <div className="relative h-8 w-[102px] flex-1 overflow-clip min-w-px min-h-px">
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
      </div>

      {/* Pages */}
      <div className="flex shrink-0 items-start gap-8">
        <div className="flex flex-col items-center gap-1 shrink-0">
          <p className="text-base font-normal leading-6 text-white whitespace-nowrap">
            Places to stay
          </p>
          <div className="h-0.5 w-4 bg-white rounded-full" />
        </div>
        <div className="flex flex-col items-center gap-1 shrink-0">
          <p className="text-base font-normal leading-6 text-white whitespace-nowrap">
            Experiences
          </p>
          <div className="h-0.5 w-4 bg-white rounded-full opacity-0" />
        </div>
        <div className="flex flex-col items-center gap-1 shrink-0">
          <p className="text-base font-normal leading-6 text-white whitespace-nowrap">
            Online Experiences
          </p>
          <div className="h-0.5 w-4 bg-white rounded-full opacity-0" />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-1 items-center justify-end gap-4 min-w-px min-h-px">
        <p className="text-sm font-medium leading-5 text-white whitespace-nowrap">
          Become a Host
        </p>

        {/* Globe Icon */}
        <div className="relative size-6 overflow-clip shrink-0">
          <svg
            className="size-full"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            <path d="M2 12h20" />
          </svg>
        </div>

        {/* Profile Dropdown */}
        <div className="flex items-center gap-2 bg-white rounded-full py-2 pl-4 pr-2 shrink-0">
          {/* Menu Icon */}
          <div className="relative size-6 overflow-clip shrink-0">
            <svg
              className="size-full"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#111827"
              strokeWidth="1.5"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </div>

          {/* Avatar */}
          <div className="relative size-8 shrink-0 rounded-full bg-gray-100 overflow-clip">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6B7280"
                strokeWidth="1.5"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
