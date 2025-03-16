import Image from "next/image";

const BottonBanner = () => {
  return (
    <div>
      <div className="baner">
        <Image
          className="baner-img"
          src="/assets/img/Botton_Banner.jpg"
          alt="baner"
        />
      </div>
    </div>
  );
};

export default BottonBanner;
