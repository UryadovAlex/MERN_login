import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";

// check token & load user
export const loadUser = () => async (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  try {
    const response = await axios.get("/api/auth/user", tokenConfig(getState));
    dispatch({ type: USER_LOADED, payload: response.data });
  } catch (err) {
    dispatch(returnErrors(err.response.data.msg, err.response.status));
    dispatch({ type: AUTH_ERROR });
  }
};

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const response = await axios.post("/api/users", body, config);
    dispatch({ type: REGISTER_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch(
      returnErrors(err.response.data.msg, err.response.status, "REGISTER_FAIL")
    );
    dispatch({ type: REGISTER_FAIL });
  }
};

// Login User
export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const response = await axios.post("/api/auth", body, config);
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch(
      returnErrors(err.response.data.msg, err.response.status, "LOGIN_FAIL")
    );
    dispatch({ type: LOGIN_FAIL });
  }
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const tokenConfig = (getState) => {
  // Get token from local storage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
