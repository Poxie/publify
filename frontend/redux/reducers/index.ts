import { combineReducers } from "redux";
import explore from "./explore";
import notifications from "./notifications";
import post from "./post";
import profile from "./profile";
import users from "./users";

export default combineReducers({ profile, notifications, post, explore, users });