import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

import {
   SET_CUSTOMER_AUTH
} from "./auth.constants.js";

export const authUser = (userData, confirmHandler) => dispatch => {
   const apiEndPoint = "http://localhost:3000/v1/auth/register";
   axios
      .post(apiEndPoint, userData)
      .then(res => {
         const {
            tokens,
            user
         } = res.data;
         const {
            access,
            refresh
         } = tokens;
         localStorage.setItem("accessToken", access.token);
         localStorage.setItem("refreshToken", refresh.token);
         // // Set token to Auth header
         setAuthToken(access);
         // Set current user
         dispatch(setCurrentUser(user));
         confirmHandler("success", "Successfully login", user.type, null);
      })
      .catch(err => {
         confirmHandler("failed", "Incorrect email or password", "", err);
         console.error("myError", err);
      });
};

export const loginUser = (userData, confirmHandler) => dispatch => {
   const apiEndPoint = "http://localhost:3000/v1/auth/login";
   axios
      .post(apiEndPoint, userData)
      .then(res => {
         const {
            tokens,
            user
         } = res.data;
         const {
            access,
            refresh
         } = tokens;
         localStorage.setItem("accessToken", access.token);
         localStorage.setItem("refreshToken", refresh.token);
         //  // // Set token to Auth header
         setAuthToken(access);
         // Set current user
         dispatch(setCurrentUser(user));
         confirmHandler("success", "Successfully login", user.type, null);
      })
      .catch(err => {
         confirmHandler("failed", "Incorrect email or password", "", err);
         console.error("myError", err);
      });
};
export const setStore = () => dispatch => {


};
// Set logged in user
export const setCurrentUser = data => {
   return {
      type: SET_CUSTOMER_AUTH,
      payload: data
   };
};