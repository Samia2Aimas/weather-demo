import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const initialState = {
    weatherApiUrl: ''
}


const configReducer = (apiUrl) =>
    (state = initialState) =>
        ({
            weatherApiUrl: apiUrl
        })


const createReducer = (apiUrl) => {
    const authPersistConfig = {
        key: 'root',
        storage: storage,
        timeout: null
    }

    return persistReducer(authPersistConfig, configReducer(apiUrl))
}

export {
    createReducer
}
