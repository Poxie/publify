import { AnyAction } from "redux";
import { UserType } from "../../utils/types";
import { PUSH_USER } from "../actionTypes";

const intialState: UserType[] = [];

export default (state=intialState, action: any) => {
    switch(action.type) {
        case PUSH_USER: {
            return [...state, ...[action.payload]];
        }
        default: {
            return state;
        }
    }
}