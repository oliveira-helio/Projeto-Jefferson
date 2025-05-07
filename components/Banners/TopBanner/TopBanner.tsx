import Image from "next/image";
import Link from "next/link";

const TopBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-pink-400 to-pink-300 mt-8">
      <div className="mx-auto px-4 py-8 md:px-8 md:py12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
        <div className="md-8 md:mb-0 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Descontos
          </h1>
          <p className="text-2xl md:text-5xl text-yellow-300 font-bold">
            DE ATÉ 50%
          </p>
        </div>
        <div className="w-1/2 relative aspect-video h-auto">
          <Image
            src="/assets/img/Top_Banner.png"
            fill
            alt="banner"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
