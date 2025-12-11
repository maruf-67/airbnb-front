export default function AirbnbSearch() {
  return (
    <div className="flex w-full items-center gap-8 bg-white rounded-full py-2 pl-8 pr-2 cursor-pointer">
      {/* Location */}
      <div className="flex flex-col items-start w-[193px] shrink-0">
        <p className="text-xs font-semibold leading-4 text-black whitespace-pre-wrap">
          Location
        </p>
        <p className="text-sm font-normal leading-5 text-gray-500 whitespace-nowrap">
          Where are you going?
        </p>
      </div>

      {/* Divider */}
      <div className="flex h-8 w-0 items-center justify-center shrink-0">
        <div className="h-0 w-8 border-t border-gray-200 rotate-90" />
      </div>

      {/* Check in */}
      <div className="flex flex-1 flex-col items-start min-w-px min-h-px shrink-0">
        <p className="text-xs font-semibold leading-4 text-black whitespace-pre-wrap">
          Check in
        </p>
        <p className="text-sm font-normal leading-5 text-gray-500 whitespace-nowrap">
          Add dates
        </p>
      </div>

      {/* Divider */}
      <div className="flex h-8 w-0 items-center justify-center shrink-0">
        <div className="h-0 w-8 border-t border-gray-200 rotate-90" />
      </div>

      {/* Check out */}
      <div className="flex flex-1 flex-col items-start min-w-px min-h-px shrink-0">
        <p className="text-xs font-semibold leading-4 text-black whitespace-pre-wrap">
          Check out
        </p>
        <p className="text-sm font-normal leading-5 text-gray-500 whitespace-nowrap">
          Add dates
        </p>
      </div>

      {/* Divider */}
      <div className="flex h-8 w-0 items-center justify-center shrink-0">
        <div className="h-0 w-8 border-t border-gray-200 rotate-90" />
      </div>

      {/* Guests */}
      <div className="flex flex-1 flex-col items-start min-w-px min-h-px shrink-0">
        <p className="text-xs font-semibold leading-4 text-black whitespace-pre-wrap">
          Guests
        </p>
        <p className="text-sm font-normal leading-5 text-gray-500 whitespace-nowrap">
          Add guests
        </p>
      </div>

      {/* Search Button */}
      <div className="flex items-start shrink-0 size-12">
        <div className="flex flex-1 size-full items-center justify-center bg-[#de3151] rounded-full p-2 shadow-[0px_1px_2px_0px_rgba(31,41,55,0.08)]">
          <div className="relative size-5 overflow-clip shrink-0">
            <svg
              className="size-full"
              viewBox="0 0 20 20"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
            >
              <circle cx="9" cy="9" r="7" />
              <path d="M14 14l5 5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
