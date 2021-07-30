import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const initialState = {
    weatherApiUrl: '',
    weatherApiKey: ''
}


const configReducer = (apiUrl, apiKey) =>
    (state = initialState) =>
        ({
            weatherApiUrl: apiUrl,
            weatherApiKey: apiKey
        })


const createReducer = (apiUrl, apiKey) => {
    const authPersistConfig = {
        key: 'root',
        storage: storage,
        timeout: null
    }

    return persistReducer(authPersistConfig, configReducer(apiUrl, apiKey))
}

export {
    createReducer
}
