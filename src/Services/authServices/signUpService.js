import axios from "axios";
import { RESET, SET_SIGNUP_ERROR } from "../../Constant";
import { toast } from "react-hot-toast";

const url = process.env.REACT_APP_ENV === 'dev'?"http://localhost:5000":"";

export const signupService = async (user, dispatchUser, setUser) => {
  const { firstName, lastName, email, password } = user;
  try {
    const { data, status } = await axios.post(`${url}/api/auth/signup`, {
      email,
      password
    });

    if (status === 201) {
      dispatchUser({ type: RESET });
      const userDetails = {
        token: data.encodedToken,
        user: {
          firstName: data.createdUser.firstName,
          email: data.createdUser.email
        }
      };
      localStorage.setItem("user", JSON.stringify(userDetails));
      setUser(userDetails);
      toast.success("signup successfully");
    } else {
      toast.error("Something went wrong!");
    }
  } catch (error) {
    const errMsg = error.response.data.errors[0];
    dispatchUser({ type: SET_SIGNUP_ERROR, payload: errMsg });
  }
};
