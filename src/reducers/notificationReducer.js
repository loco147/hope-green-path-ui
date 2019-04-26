
const initialNotification = {
    text: null,
    look: null,
}
let notifTimeout

const notificationReducer = (store = initialNotification, action) => {

    switch (action.type) {
        case 'SHOWNOTIF':
            return { text: action.text, look: action.look }

        case 'ROUTING_STARTED':
            return { text: 'Calculating routes...' }

        case 'WAIT_FOR_USER_LOC_ORIGIN':
            return { text: 'Locating...' }

        case 'UPDATE_USER_LOCATION': {
            if (store.text === 'Locating...') return initialNotification
            return store
        }
        case 'SET_SHORTEST_PATH':
        case 'RMNOTIF':
            return initialNotification

        default:
            return store
    }
}

export const showNotification = (text, look, notiftime) => {
    return async (dispatch) => {
        dispatch(rmNotification())
        await new Promise(resolve => notifTimeout = setTimeout(resolve, 120))
        dispatch({ type: 'SHOWNOTIF', text, look })
        clearTimeout(notifTimeout)
        await new Promise(resolve => notifTimeout = setTimeout(resolve, notiftime * 1000))
        dispatch(rmNotification())
    }
}

export const rmNotification = () => {
    clearTimeout(notifTimeout)
    return ({ type: 'RMNOTIF' })
}

export default notificationReducer
