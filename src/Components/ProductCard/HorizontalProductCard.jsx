import React from "react";
import "./ProductCard.css";
import { useCart, useWishlist } from "../../Context";
import { Link } from "react-router-dom";

import { getProductById } from "../../Utils";

const HorizontalProductCard = (props) => {
  const { removeFromCartHandler, updateCartQtyHandler } = useCart();

  const { productName, image, alt, price, oldPrice, discount, _id, qty } =
    props;

  return (
    <div className="horizontal_product m-1 ">
      <div className="horizontal_product_wrapper d-flex ">
        <Link to={`/product/${_id}`}>
          <div className="horizontal_product_img p-1 ">
            <img src={image} alt={alt} />
          </div>
        </Link>
        <div className="horizontal_product_info m-1  ">
          <p className=" product_name ">{productName}</p>
          <div>
            <span className="product_price">{price}</span>
            <span className="product_old_price">{oldPrice}</span>
          </div>
          <p className="horizontal_product_discount py-1 ">
            <span className="discount"> {discount}</span> <span>off</span>
          </p>
          <div className="d-flex py-1 flex-row items-center ">
            <p>Quantity</p>
            <div className=" d-flex justify-center items-center mx-1 ">
              <button
                onClick={() =>
                  updateCartQtyHandler(_id, productName, "decrement")
                }
                disabled={qty === 1}
                className={` inc_dec_btn d-flex items-center justify-center cursor-pointer ${
                  qty === 1 && "btn-disable"
                } `}
              >
                -
              </button>
              <span className=" px-1 product_qty ">{qty}</span>
              <button
                onClick={() =>
                  updateCartQtyHandler(_id, productName, "increment")
                }
                className=" inc_dec_btn d-flex items-center justify-center cursor-pointer "
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalProductCard;
