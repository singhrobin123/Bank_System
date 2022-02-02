import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
   SET_USER_DATA,
   SET_USERS_DATA,
   SET_CUSTOMER_LOGOUT
} from "./verify.constants";

export const getUser = (setDataHandler) => dispatch => {
   const apiEndPoint = "/v1/auth/refresh-tokens";
   if (!!localStorage.getItem('refreshToken')) {
      const token = localStorage.getItem('refreshToken');
      axios
         .post(apiEndPoint, {
            refreshToken: token
         })
         .then(res => {
            // const {tokens} = res.data;
            const {
               access,
               refresh
            } = res.data;
            localStorage.setItem("accessToken", access.token);
            localStorage.setItem("refreshToken", refresh.token);
            // // Set token to Auth header
            setAuthToken(access);
            // Set current user
            const decoded = jwt_decode(access.token);
            axios.get(`/v1/users/${decoded.sub}`).then(res => {
               let userName = res.data.name;
               let userType = res.data.type;
               let userData = res.data;
               if (res.data.type == 'customer') {
                  dispatch(setData({
                     accessToken: access.token,
                     refreshToken: refresh.token,
                     user_id: decoded.sub,
                     user: res.data
                  }));
               } else {
                  axios.get(`/v1/users`).then(res => {
                     dispatch(setAllUserData({
                        accessToken: access.token,
                        refreshToken: refresh.token,
                        user_id: decoded.sub,
                        user: res.data,
                        users: res.data
                     }));
                  });
               }
               return setDataHandler(userName, true, userType, userData);
            });
         })
         .catch(err => {
            return setDataHandler("", false, null, null);
         });
   } else {
      return setDataHandler("", false, null, null);
   }
};
export const logoutUser = (confirmHandler) => dispatch => {

   const apiEndPoint = "/v1/auth/logout";
   if (!!localStorage.getItem('refreshToken')) {
      const token = localStorage.getItem('refreshToken');
      axios
         .post(apiEndPoint, {
            refreshToken: token
         })
         .then(res => {
            // const {tokens} = res.data;

            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            // Set current user
            dispatch(logutData());
            return confirmHandler("success");
         })
         .catch((err) => {
            return confirmHandler("failed");
         });

   } else {
      return confirmHandler("failed");
   }
};


export const logutData = () => {
   return {
      type: SET_CUSTOMER_LOGOUT,
      payload: {}
   };
};
export const setData = payload => {
   return {
      type: SET_USER_DATA,
      payload: payload
   };
};

export const setAllUserData = payload => {
   return {
      type: SET_USERS_DATA,
      payload: payload
   };
};