import React, { useState } from "react";
import "./Navbar.css";
import { IoMenu } from "react-icons/io5";
import {
  AiOutlineUser,
  AiOutlineShoppingCart
} from "react-icons/ai";
import MobileNavigation from "./MobileNavigation";
import { Link, useLocation } from "react-router-dom";
import Search from "../Search/Search";
import { useAuth, useCart } from "../../Context";
import { RESET } from "../../Constant";
import { MdContactPage, MdContacts } from "react-icons/md";

const Navbar = () => {
  const [showSideNavbar, setShowNavbar] = useState(false);
  const { logOutBtnHandler, user } = useAuth();
  const { cartState, dispatchCart } = useCart();
  const location = useLocation();

  const HandleSideNavbar = () => {
    setShowNavbar(!showSideNavbar);
  };

  const handleLogout = () => {
    logOutBtnHandler();
    dispatchCart({ type: RESET });
  };

  return (
    <>
      <nav className="d-flex items-center justify-between ">
        <div className=" d-flex items-center logo_container">
          <IoMenu
            className="d-none menu_icon cursor-pointer "
            onClick={HandleSideNavbar}
          />
          <Link to={"/"} className="link">
            <h3 className="nav-logo cursor-pointer ">Amit's Cart</h3>
          </Link>
        </div>
        {location.pathname === "/products" && (
          <div className="search">
            <Search />
          </div>
        )}
        <div>
          <ul className="d-flex">
            {user ? (
              <>
                <li
                  to={"/login"}
                  className="nav_link link  profile-icon relative"
                >
                  <AiOutlineUser className="nav_link_icon" />
                  <span className="nav_link_icon_title">
                    {user?.user?.firstName}
                  </span>
                  <div className="profile_content">
                    <p>Welcome</p>
                    <Link className="link " to={"/profile"}>
                      <button style={{ width: "90%" }} className="">
                        Profile
                      </button>
                    </Link>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                </li>
              </>
            ) : (
              <>
                <Link
                  to={"/login"}
                  state={{ from: location }}
                  className="nav_link link  profile-icon relative"
                >
                  <AiOutlineUser className="nav_link_icon" />
                  <span className="nav_link_icon_title">Login</span>
                </Link>
              </>
            )}
            <Link to={"/cart"} className=" link nav_link">
              <div className="relative">
                <AiOutlineShoppingCart className="nav_link_icon" />
                {user && <p className="badge">{cartState.products.length}</p>}
              </div>
              <span className="nav_link_icon_title">Cart</span>
            </Link>
            <Link to={"/contact"} className=" link nav_link">
              <div className="relative">
                <MdContacts className="nav_link_icon" />
              </div>
              <span className="nav_link_icon_title">Contact</span>
            </Link>
          </ul>
        </div>
        <MobileNavigation
          showSideNavbar={showSideNavbar}
          HandleSideNavbar={HandleSideNavbar}
        />
      </nav>
    </>
  );
};

export default Navbar;
