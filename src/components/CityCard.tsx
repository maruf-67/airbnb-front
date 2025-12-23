import Image from 'next/image';

interface CityCardProps {
  imageSrc: string;
  cityName: string;
  distance: string;
  bgColor: string;
}

export default function CityCard({ imageSrc, cityName, distance, bgColor }: CityCardProps) {
  return (
    <div className="flex flex-1 flex-col items-start min-w-px min-h-px overflow-clip rounded-lg shrink-0">
      {/* Image */}
      <div className="h-[200px] w-full relative shrink-0">
        <Image
          src={imageSrc}
          alt={cityName}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div
        className="flex w-full flex-col items-start gap-2 pb-24 pt-6 px-4 shrink-0"
        style={{ backgroundColor: bgColor }}
      >
        <p className="w-full text-4xl font-medium leading-11 text-white whitespace-pre-wrap">
          {cityName}
        </p>
        <p className="w-full text-lg font-normal leading-7 text-white whitespace-pre-wrap">
          {distance}
        </p>
      </div>
    </div>
  );
}
