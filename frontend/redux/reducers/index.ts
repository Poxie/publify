import { combineReducers } from "redux";
import notifications from "./notifications";
import posts from "./posts";

export default combineReducers({ posts, notifications });