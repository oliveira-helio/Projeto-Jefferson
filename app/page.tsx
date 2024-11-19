"use client";
import TopBanner from "./components/TopBanner/TopBanner";
import TopSellers from "./components/TopSellers/TopSellers";
import Recommended from "./components/Recomended/Recommended";

export default function Home() {
  return (
    <div>
      <div>
        <TopBanner />
      </div>
      <div>
        <Recommended />
      </div>
      <div>
        <TopBanner />
      </div>
      <div>
        <TopSellers />
      </div>
    </div>
  );
}
