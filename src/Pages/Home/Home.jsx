import React from "react";
import Banner from "./Components/Banner";
import "./Home.css";
import useDocumentTitle from "../../hook/useDocumentTitle";
import MainComp from "../Productspage/Component/MainComp";

const Home = () => {
  useDocumentTitle("Home");

  return (
    <div>
      <Banner />
      <div>
        <h2 className="d-flex justify-center my-2 py-4 brand_heading">Products</h2>
        <div className="d-flex justify-center my-2 flex-wrap direction-column">
          <MainComp />
        </div>
      </div>
    </div>
  );
};

export default Home;
