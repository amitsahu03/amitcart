import React from "react";
import { Input } from "../../../Components";
import "./../authpage.css";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowDropRightLine } from "react-icons/ri";
import { BiErrorCircle } from "react-icons/bi";
import { useAuth } from "../../../Context/AuthContext/AuthContext";
import {
  SAVE_USER,
  SET_LOGIN_EMAIL,
  SET_LOGIN_PASSWORD
} from "../../../Constant/index.js";
import useDocumentTitle from "../../../hook/useDocumentTitle";
import axios from "axios";
import toast from "react-hot-toast";

const LoginPage = () => {
  const {
    userState: {
      loginUser: { email, password },
      loginError,
      isLoading,
      isSaveUser
    },
    dispatchUser,
    loginHandler
  } = useAuth();

  useDocumentTitle("Login");
  //* guest user obj for test credential login */
  const guestUser = {
    email: "gautamshekhar078@gmail.com",
    password: "Gautam#123"
  };

  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password
    });
    if(res.status === 200){
      const userDetails = {
        token: res.data.accessToken,
        user: {isLogged: true}
      };
      localStorage.setItem("user", JSON.stringify(userDetails));
  
      navigate("/");
    }
    else{
      toast.error(res.data.error.message);
    }

  }

  return (
    <div className=" d-flex justify-center items-center login_form_container">
      <form onSubmit={handleLogin} className="login_form card-shadow ">
        <div className="login_form_wrapper">
          <div className="login_form_title">
            <h2>Login</h2>
          </div>
          <div>
            <Input
              value={email}
              placeholder={"Enter your email"}
              label={"Email address"}
              type={"email"}
              onChange={(e) =>
                dispatchUser({ type: SET_LOGIN_EMAIL, payload: e.target.value })
              }
            />
            <Input
              type={"password"}
              value={password}
              onChange={(e) =>
                dispatchUser({
                  type: SET_LOGIN_PASSWORD,
                  payload: e.target.value
                })
              }
              placeholder={"Enter your Password"}
              label={"Password"}
            />
          </div>
          <div className="my-1">
            <input
              className="cursor-pointer"
              checked={isSaveUser}
              type="checkbox"
              onChange={(e) =>
                dispatchUser({ type: SAVE_USER, payload: e.target.checked })
              }
            />{" "}
            <span>Remember me</span>
          </div>

          <button type="submit" className="solid-btn w-full ">
            {isLoading ? "Loading.." : "Login"}
          </button>
          {loginError && (
            <p className="d-flex justify-center items-center auth_error ">
              {" "}
              <BiErrorCircle className="auth_error_icon" /> {loginError}
            </p>
          )}
          <div className=" d-flex justify-center items-center w-full">
            <Link className="link sign_up_link" to={"/signup"}>
              Create New Account
            </Link>
            <RiArrowDropRightLine className="icon" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
