import React from "react";
import { bannerImgLink } from "../../../StaticData";
import "./Banner.css";

const Banner = () => {
  return (
    <section>
      <div className="relative">
        <img src={bannerImgLink} className="banner_img" alt="banner-img" />
      </div>
    </section>
  );
};

export default Banner;
