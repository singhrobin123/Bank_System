import { combineReducers } from "redux";
import appReducer from "./appReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: appReducer,
  errors: errorReducer
});