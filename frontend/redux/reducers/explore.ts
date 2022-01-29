import { AnyAction } from "redux"
import { SET_POPULAR_USERS } from "../actionTypes"

const initialState = {
    popularPosts: [],
    popularUsers: []
}

export default (state=initialState, action: AnyAction) => {
    switch(action.type) {
        case SET_POPULAR_USERS:
            return {
                ...state,
                popularUsers: action.payload
            }
        default:
            return state;
    }
}