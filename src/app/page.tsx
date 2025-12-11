import AirbnbNav from '@/components/AirbnbNav';
import AirbnbSearch from '@/components/AirbnbSearch';
import AirbnbFooter from '@/components/AirbnbFooter';
import CityCard from '@/components/CityCard';

export default function Home() {
  return (
    <div className="flex size-full flex-col items-start">
      {/* Hero Section */}
      <div className="flex w-full flex-col items-center gap-6 bg-black px-20 pt-4 pb-24 shrink-0">
        <AirbnbNav />
        <AirbnbSearch />

        {/* Big Card */}
        <div className="relative flex w-full h-[640px] flex-col items-center justify-end gap-6 overflow-clip rounded-lg p-20 shrink-0">
          {/* Background Image */}
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2000)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />

          {/* Content */}
          <p className="relative z-10 text-5xl font-medium leading-14 text-white whitespace-nowrap">
            Not sure where to go? Perfect.
          </p>
          <button className="relative z-10 flex items-center justify-center gap-2 bg-white px-6 py-4 rounded-lg">
            <span className="text-base font-medium bg-linear-to-r from-[#671296] to-[#9e1f83] bg-clip-text text-transparent">
              I'm flexible
            </span>
          </button>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex w-full flex-col items-center gap-24 bg-white px-20 py-24 shrink-0">
        {/* Inspiration for your next trip */}
        <div className="flex w-full flex-col items-start gap-12 shrink-0">
          <p className="w-full text-4xl font-medium leading-11 text-black whitespace-pre-wrap">
            Inspiration for your next trip
          </p>
          <div className="flex w-full items-start gap-6">
            <CityCard
              imageSrc="https://images.unsplash.com/photo-1531219432768-9f540ce91ef3?q=80&w=400"
              cityName="Nashville"
              distance="53 miles away"
              bgColor="#cc2d4a"
            />
            <CityCard
              imageSrc="https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=400"
              cityName="South Haven"
              distance="168 miles away"
              bgColor="#bc1a6e"
            />
            <CityCard
              imageSrc="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=400"
              cityName="Stanton"
              distance="192 miles away"
              bgColor="#de3151"
            />
            <CityCard
              imageSrc="https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=400"
              cityName="New Buffalo"
              distance="130 miles away"
              bgColor="#d93b30"
            />
          </div>
        </div>

        {/* Discover Airbnb Experiences */}
        <div className="flex w-full flex-col items-start gap-12 shrink-0">
          <p className="w-full text-4xl font-medium leading-11 text-black whitespace-pre-wrap">
            Discover Airbnb Experiences
          </p>
          <div className="flex w-full items-start gap-6">
            {/* Things to do on your trip */}
            <div className="relative flex flex-1 h-[628px] flex-col items-start gap-6 overflow-clip rounded-lg p-20 min-w-px min-h-px shrink-0">
              <div
                className="absolute inset-0 rounded-lg"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="relative z-10 flex flex-col justify-center text-5xl font-medium leading-14 text-white w-min whitespace-pre-wrap">
                <p className="mb-0">Things to do</p>
                <p>on your trip</p>
              </div>
              <button className="relative z-10 flex items-center justify-center gap-2 bg-white px-6 py-4 rounded-lg shrink-0">
                <span className="text-base font-medium leading-6 text-gray-700">
                  Experiences
                </span>
              </button>
            </div>

            {/* Things to do from home */}
            <div className="relative flex flex-1 h-[628px] flex-col items-start gap-6 overflow-clip rounded-lg p-20 min-w-px min-h-px shrink-0">
              <div
                className="absolute inset-0 rounded-lg"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1588392382834-a891154bca4d?q=80&w=800)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="relative z-10 flex flex-col justify-center text-5xl font-medium leading-14 text-white w-min whitespace-pre-wrap">
                <p className="mb-0">Things to do</p>
                <p>from home</p>
              </div>
              <button className="relative z-10 flex items-center justify-center gap-2 bg-white px-6 py-4 rounded-lg shrink-0">
                <span className="text-base font-medium leading-6 text-gray-700">
                  Online Experiences
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Shop Airbnb gift cards */}
        <div className="flex w-full items-center gap-12 shrink-0">
          <div className="flex flex-1 flex-col items-start gap-6 min-w-px min-h-px shrink-0">
            <div className="flex flex-col justify-center text-5xl font-medium leading-14 text-black w-min whitespace-pre-wrap">
              <p className="mb-0">Shop Airbnb</p>
              <p>gift cards</p>
            </div>
            <button className="flex items-center justify-center gap-2 bg-black px-6 py-4 rounded-lg shadow-[0px_1px_2px_0px_rgba(31,41,55,0.08)] shrink-0">
              <span className="text-base font-medium leading-6 text-white">
                Learn more
              </span>
            </button>
          </div>
          <div className="relative h-80 w-[854px] shrink-0">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=854)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          </div>
        </div>

        {/* Questions about hosting */}
        <div className="relative flex w-full h-[640px] flex-col items-start justify-between overflow-clip rounded-lg p-20 shrink-0">
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="relative z-10 flex flex-col justify-center text-[96px] font-medium leading-24 text-white whitespace-nowrap">
            <p className="mb-0">Questions</p>
            <p className="mb-0">about</p>
            <p>hosting?</p>
          </div>
          <button className="relative z-10 flex items-center justify-center gap-2 bg-white px-6 py-4 rounded-lg shrink-0">
            <span className="text-base font-medium leading-6 text-gray-700">
              Ask a Superhost
            </span>
          </button>
        </div>

        {/* Pre-Footer - Inspiration for future getaways */}
        <div className="flex w-full flex-col items-start gap-8 shrink-0">
          {/* Header */}
          <div className="flex w-full flex-col items-start gap-4 shrink-0">
            <p className="w-full text-2xl font-medium leading-8 text-black whitespace-pre-wrap">
              Inspiration for future getaways
            </p>

            {/* Tab Bar */}
            <div className="relative flex w-full items-center gap-6 bg-white shrink-0 border-b border-gray-200">
              <div className="flex flex-col items-start gap-2.5 pb-0 pt-2 px-0 shrink-0">
                <p className="text-sm font-medium leading-5 text-black whitespace-nowrap">
                  Destinations for arts & culture
                </p>
                <div className="h-0.5 w-full bg-black" />
              </div>
              <div className="flex flex-col items-start gap-2.5 pb-0 pt-2 px-0 shrink-0">
                <p className="text-sm font-medium leading-5 text-gray-500 whitespace-nowrap">
                  Destinations for outdoor adventure
                </p>
              </div>
              <div className="flex flex-col items-start gap-2.5 pb-0 pt-2 px-0 shrink-0">
                <p className="text-sm font-medium leading-5 text-gray-500 whitespace-nowrap">
                  Mountain cabins
                </p>
              </div>
              <div className="flex flex-col items-start gap-2.5 pb-0 pt-2 px-0 shrink-0">
                <p className="text-sm font-medium leading-5 text-gray-500 whitespace-nowrap">
                  Beach destinations
                </p>
              </div>
              <div className="flex flex-col items-start gap-2.5 pb-0 pt-2 px-0 shrink-0">
                <p className="text-sm font-medium leading-5 text-gray-500 whitespace-nowrap">
                  Popular destinations
                </p>
              </div>
              <div className="flex flex-col items-start gap-2.5 pb-0 pt-2 px-0 shrink-0">
                <p className="text-sm font-medium leading-5 text-gray-500 whitespace-nowrap">
                  Unique Stays
                </p>
              </div>
            </div>
          </div>

          {/* Destinations Grid */}
          <div className="flex w-full items-start gap-6">
            <div className="flex flex-1 flex-col items-start min-w-px min-h-px shrink-0">
              <p className="w-full text-sm font-normal leading-5 text-black whitespace-pre-wrap">Phoenix</p>
              <p className="w-full text-sm font-normal leading-5 text-gray-500 whitespace-pre-wrap">Arizona</p>
            </div>
            <div className="flex flex-1 flex-col items-start min-w-px min-h-px shrink-0">
              <p className="w-full text-sm font-normal leading-5 text-black whitespace-pre-wrap">Hot Springs</p>
              <p className="w-full text-sm font-normal leading-5 text-gray-500 whitespace-pre-wrap">Arkansas</p>
            </div>
            <div className="flex flex-1 flex-col items-start min-w-px min-h-px shrink-0">
              <p className="w-full text-sm font-normal leading-5 text-black whitespace-pre-wrap">Los Angeles</p>
              <p className="w-full text-sm font-normal leading-5 text-gray-500 whitespace-pre-wrap">California</p>
            </div>
            <div className="flex flex-1 flex-col items-start min-w-px min-h-px shrink-0">
              <p className="w-full text-sm font-normal leading-5 text-black whitespace-pre-wrap">San Diego</p>
              <p className="w-full text-sm font-normal leading-5 text-gray-500 whitespace-pre-wrap">California</p>
            </div>
          </div>

          <div className="flex w-full items-start gap-6">
            <div className="flex flex-1 flex-col items-start min-w-px min-h-px shrink-0">
              <p className="w-full text-sm font-normal leading-5 text-black whitespace-pre-wrap">San Francisco</p>
              <p className="w-full text-sm font-normal leading-5 text-gray-500 whitespace-pre-wrap">California</p>
            </div>
            <div className="flex flex-1 flex-col items-start min-w-px min-h-px shrink-0">
              <p className="w-full text-sm font-normal leading-5 text-black whitespace-pre-wrap">Barcelona</p>
              <p className="w-full text-sm font-normal leading-5 text-gray-500 whitespace-pre-wrap">Catalonia</p>
            </div>
            <div className="flex flex-1 flex-col items-start min-w-px min-h-px shrink-0">
              <p className="w-full text-sm font-normal leading-5 text-black whitespace-pre-wrap">Prague</p>
              <p className="w-full text-sm font-normal leading-5 text-gray-500 whitespace-pre-wrap">Czechia</p>
            </div>
            <div className="flex flex-1 flex-col items-start min-w-px min-h-px shrink-0">
              <p className="w-full text-sm font-normal leading-5 text-black whitespace-pre-wrap">Washington</p>
              <p className="w-full text-sm font-normal leading-5 text-gray-500 whitespace-pre-wrap">District of Columbia</p>
            </div>
          </div>

          <div className="flex w-full items-start gap-6 text-sm">
            <div className="flex flex-1 flex-col items-start min-w-px min-h-px shrink-0">
              <p className="w-full font-normal leading-5 text-black whitespace-pre-wrap">Keswick</p>
              <p className="w-full font-normal leading-5 text-gray-500 whitespace-pre-wrap">England</p>
            </div>
            <div className="flex flex-1 flex-col items-start min-w-px min-h-px shrink-0">
              <p className="w-full font-normal leading-5 text-black whitespace-pre-wrap">London</p>
              <p className="w-full font-normal leading-5 text-gray-500 whitespace-pre-wrap">England</p>
            </div>
            <div className="flex flex-1 flex-col items-start min-w-px min-h-px shrink-0">
              <p className="w-full font-normal leading-5 text-black whitespace-pre-wrap">Scarborough</p>
              <p className="w-full font-normal leading-5 text-gray-500 whitespace-pre-wrap">England</p>
            </div>
            <div className="flex flex-col justify-center shrink-0 w-[302px]">
              <p className="font-medium leading-5 text-black underline whitespace-pre-wrap">Show more</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex w-full items-start bg-gray-50 px-20 pt-16 pb-6 shrink-0">
        <AirbnbFooter />
      </div>
    </div>
  );
}
