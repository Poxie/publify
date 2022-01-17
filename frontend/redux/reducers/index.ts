import { combineReducers } from "redux";
import notifications from "./notifications";
import post from "./post";
import profile from "./profile";

export default combineReducers({ profile, notifications, post });