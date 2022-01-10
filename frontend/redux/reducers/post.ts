import { SET_POST } from "../actionTypes"

const initialState = {
    isLoading: true
}

export default (state=initialState, action) => {
    switch(action.type) {
        case SET_POST: {
            return {
                isLoading: false,
                ...action.payload.post
            }
        }
        default:
            return state;
    }
}