import { combineReducers } from "redux";
import notifications from "./notifications";
import post from "./post";
import posts from "./posts";

export default combineReducers({ posts, notifications, post });