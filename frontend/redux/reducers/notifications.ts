import { CREATE_NOTIFICATION, DESTROY_NOTIFICATION, RESET_NOTIFICATION } from "../actionTypes"

const intialState = {
    hasNotification: false,
    notification: '',
    notificationStatus: null
}

export default (state=intialState, action) => {
    switch(action.type) {
        case CREATE_NOTIFICATION: {
            const { notification, notificationStatus='info' } = action.payload;

            return {
                ...state,
                hasNotification: true,
                notification,
                notificationStatus
            }
        }
        case DESTROY_NOTIFICATION: {
            return {
                ...state,
                // Only changing has notification for animation purposes
                hasNotification: false,
            }
        }
        case RESET_NOTIFICATION: {
            return intialState;
        }
        default:
            return state;
    }
}