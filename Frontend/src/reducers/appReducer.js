import {
    SET_CUSTOMER_AUTH,
    SET_UPDATED_USER_DATA,
    USER_LOADING,
    SET_AFTER_DELETE,
    SET_USERS_DATA,
    SET_CUSTOMER_LOGOUT,
    SET_USER_DATA
 } from "../actions/types";
 
 const isEmpty = require("is-empty");
 
 const initialState = {
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    userType: null,
    user: {},
    users: [],
    loading: false,
    history: [],
    historyResponseIdentifer: 0,
    user_id: null
 
 };
 //this.props.history.push()
 export default function(state = initialState, action) {
    switch (action.type) {
       case SET_CUSTOMER_AUTH:
          return {
             ...state,
             isAuthenticated: true,
                user: action.payload,
                userType: action.payload.type
          };
 
       case USER_LOADING:
          return {
             ...state,
             loading: true
          };
       case SET_UPDATED_USER_DATA:
          return {
             ...state,
             user: action.payload.user,
                user_id: action.payload.user.id,
          };
       case SET_USER_DATA:
          return {
             ...state,
             accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                user_id: action.payload.user_id,
                user: action.payload.user,
                loading: true
          };
       case SET_USERS_DATA:
          return {
             ...state,
             accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                user_id: action.payload.user_id,
                user: action.payload.user,
                users: action.payload.users,
                loading: true
          };
       case SET_AFTER_DELETE:
          return {
             ...state,
             users: action.payload.users,
                loading: true
          };
       case SET_CUSTOMER_LOGOUT:
          return {
             ...state,
             users: [],
                user: {},
                accessToken: null,
                refreshToken: null,
                isAuthenticated: false,
                user_id: null,
          };
 
       default:
          return state;
    }
 }