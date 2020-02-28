
const initialNotification = {
    text: null,
    look: null,
}
let rmNotifTimeout

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
            else return store
        }
        // hide initial tooltip / notification (on how to set the destination) if popup is opened
        case 'SET_POPUP': {
            if (store.text && store.text.includes('Click on the map')) return initialNotification
            return store
        }
        // cancel ongoing routing if new origin or destination is set
        case 'SET_ORIGIN':
        case 'SET_TARGET': {
            if (store.text === 'Calculating routes...') return initialNotification
            else return store
        }
        case 'SET_SHORTEST_PATH':
        case 'RMNOTIF':
            return initialNotification

        default:
            return store
    }
}

export const showNotification = (text, look, notifTime) => {
    return async (dispatch) => {
        if (rmNotifTimeout) {
            // wait for the current notification to get removed before showing the new one
            clearTimeout(rmNotifTimeout)
            rmNotifTimeout = null
            await new Promise(resolve => {
                rmNotifTimeout = setTimeout(() => {
                    dispatch(rmNotification())
                    resolve()
                }, 4000)
            })
            await new Promise(resolve => {
                setTimeout(() => {
                    dispatch(rmNotification())
                    resolve()
                }, 100)
            })
        }

        // show new notification after removing the old one
        dispatch({ type: 'SHOWNOTIF', text, look })

        await new Promise(resolve => {
            rmNotifTimeout = setTimeout(() => {
                dispatch(rmNotification())
                resolve()
            }, notifTime * 1000)
        })
    }
}

export const rmNotification = () => {
    clearTimeout(rmNotifTimeout)
    rmNotifTimeout = null
    return ({ type: 'RMNOTIF' })
}

export default notificationReducer
