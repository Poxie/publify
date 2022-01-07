import { CREATE_NOTIFICATION, DESTROY_NOTIFICATION, RESET_NOTIFICATION } from "../actionTypes"

const intialState = {
    hasNotification: false,
    notification: '',
    notificationStatus: null,
    queuedNotifications: []
}

export default (state=intialState, action) => {
    switch(action.type) {
        case CREATE_NOTIFICATION: {
            // If there already is a notification, queue notification
            if(state.hasNotification) {
                return {
                    ...state,
                    queuedNotifications: [...state.queuedNotifications, ...[action.payload]]
                }
            }

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
            // Running queued notifications
            if(state.queuedNotifications.length) {
                const queuedNotification = state.queuedNotifications[0];
                const { notification, notificationStatus } = queuedNotification;
                return {
                    ...state,
                    notification,
                    notificationStatus,
                    hasNotification: true,
                    queuedNotifications: state.queuedNotifications.slice(1)
                }
            }

            // Else resetting to initial state
            return intialState;
        }
        default:
            return state;
    }
}