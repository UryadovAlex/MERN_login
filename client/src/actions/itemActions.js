import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import axios from "axios";

export const getItems = () => async (dispatch) => {
  dispatch(setItemsLoading());
  try {
    const response = await axios.get("/api/items");
    dispatch({ type: GET_ITEMS, payload: response.data });
  } catch (err) {
    dispatch(returnErrors(err.response.data.msg, err.response.status));
  }
};

export const deleteItem = (id) => async (dispatch, getState) => {
  try {
    await axios.delete(`/api/items/${id}`, tokenConfig(getState));
    dispatch({ type: DELETE_ITEM, payload: id });
  } catch (err) {
    dispatch(returnErrors(err.response.data.msg, err.response.status));
  }
};

export const addItem = (item) => async (dispatch, getState) => {
  try {
    const response = await axios.post(
      "/api/items",
      { ...item },
      tokenConfig(getState)
    );
    dispatch({ type: ADD_ITEM, payload: response.data });
  } catch (err) {
    dispatch(returnErrors(err.response.data.msg, err.response.status));
  }
};

export const setItemsLoading = () => {
  return { type: ITEMS_LOADING };
};
