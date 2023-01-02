import axios from "axios";
import { loadUserData, registerUser } from "../../api/authApi";
import {loadUserData as _loadUserData, register_Client, usersData ,register_Lawyer, loginUser} from '../../api/urls';
import setAuthToken from "./auth.utils";
import { setAlert } from "../alert/alert.actions";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./auth.types";

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(usersData, {
      headers: {
        "Authentication" : localStorage.getItem("token")
      }
    });
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.log(err)
    // dispatch({
    //   type: AUTH_ERROR,
    // });
  }
};

// Client Register User
export const registerClient =
  ({ username, password, email }) =>
  async (dispatch) => {
    try {
      const body = JSON.stringify({ username, password, email });

      const config_headers = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      const res = await axios.post(register_Client, body, config_headers);
      console.log(res)
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      dispatch(setAlert(res.data.message, "success"));

      dispatch(loadUser());
    } catch (err) {
      console.log(err.response.data)
      dispatch(setAlert(err.response.data.msg, "danger"));

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };


  // Lawyer Register
  export const registerLawyer =
  ({ username, password, email }) =>
  async (dispatch) => {
    try {

      
      const body = JSON.stringify({ username, password, email });

      const config_headers = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };  
      const res = await axios.post(register_Lawyer, body, config_headers);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      dispatch(setAlert(res.data.message, "success"));

      // dispatch(loadUser());
    } catch (err) {
      dispatch(setAlert(err.response.data.msg, "danger"));

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };




// Login User
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const config_headers = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      const body = JSON.stringify({ email, password });
      const res = await axios.post(loginUser, body, config_headers);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      dispatch(setAlert(res.data.message, "success"));

      dispatch(loadUser());
    } catch (err) {
      dispatch(setAlert(err.response.data.message, "danger"));

      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

//LOGOUT
export const logout = () => (dispatch) => {
  dispatch(setAlert("User has logged out", "success"));
  localStorage.removeItem("token");

  dispatch({ type: LOGOUT });
};
