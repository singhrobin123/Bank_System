import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

import {
   SET_AFTER_DELETE,
   SET_UPDATED_USER_DATA
} from "./dashboard.constants";

export const removeUser = (id, setUsersHandler) => dispatch => {
   const apiEndPoint = `/v1/users/${id}`;
   axios
      .delete(apiEndPoint)
      .then(res => {
         axios.get(`/v1/users`).then(res => {
            dispatch(setAllUserData({
               users: res.data
            }));
            return setUsersHandler(res.data);

         });
      })
      .catch(err => {
         console.error("myError", err);
      });
};

export const changeUserData = (id, userData, setUsersHandler) => dispatch => {

   const apiEndPoint = `/v1/users/${id}`;
   axios
      .patch(apiEndPoint, userData)
      .then(res => {
         dispatch(setUserData({
            user: res.data
         }));
         return setUsersHandler(res.data);
      })
      .catch(err => {
         return setUsersHandler(null, err);
      });
};
export const updateUser = (id, userData, setUsersHandler) => dispatch => {

   const apiEndPoint = `/v1/users/${id}`;
   axios
      .patch(apiEndPoint, userData)
      .then(res => {
         axios.get(`/v1/users`).then(res => {
            dispatch(setAllUserData({
               users: res.data
            }));
            return setUsersHandler(res.data);

         });
      })
      .catch(err => {
         console.error("myError", err);
      });
};

export const AddUser = (userData, setUsersHandler) => dispatch => {

   const apiEndPoint = "/v1/auth/register"
   axios
      .post(apiEndPoint, userData)
      .then(res => {
         axios.get(`/v1/users`).then(res => {
            dispatch(setAllUserData({
               users: res.data
            }));
            return setUsersHandler(res.data);

         });
      })
      .catch(err => {
         console.error("myError", err);
      });
};
// Set logged in user
export const setAllUserData = data => {
   return {
      type: SET_AFTER_DELETE,
      payload: data
   };
};
export const setUserData = data => {
   return {
      type: SET_UPDATED_USER_DATA,
      payload: data
   };
};