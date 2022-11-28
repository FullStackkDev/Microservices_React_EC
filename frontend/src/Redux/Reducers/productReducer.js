import { ActionTypes } from "../Constants/action-type";

const initialState = {
  products: [{
    id:1,
    title:"M Ali",
    categoty: "wow"
  }],
};
export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return state;

    default:
      return state;
  }
};
