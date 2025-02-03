import React from "react";
import RecentProducts from './../RecentProducts/RecentProducts';
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import MainBanner from "../MainBanner/MainBanner";

export default function Home() {
  return (
    <>
    <MainBanner />
    <CategoriesSlider/>
      <RecentProducts />
    </>
  );
}
