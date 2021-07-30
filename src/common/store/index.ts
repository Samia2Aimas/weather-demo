import {routerMiddleware} from 'connected-react-router'
import {map} from 'lodash'
import {applyMiddleware, combineReducers, createStore as createStore_, Store} from 'redux'
import {createLogger} from 'redux-logger'
import {combineEpics, createEpicMiddleware} from 'redux-observable'
import {persistStore} from 'redux-persist'
import thunk from 'redux-thunk'
import {createReducer as createRouterReducer} from './router'
import {createReducer as createConfigReducer} from './config'
import {createReducer as createWeatherReducer, weatherCitiesEpic} from './cities-weather'


const multiActionMiddleware = store => next => action => {
    if (!Array.isArray(action)) {
        return next(action)
    }
    return map(action, x => store.dispatch(x))
}

const createRootReducer = (history, apiUrl, apiKey) =>
    combineReducers({
        config: createConfigReducer(apiUrl, apiKey),
        citiesWeather: createWeatherReducer(),
        router: createRouterReducer(history),
    })

const createStore = (history, apiUrl, apiKey) => {
    const epicMiddleware = createEpicMiddleware()
    const rootEpic = combineEpics(weatherCitiesEpic)

    const store = createStore_(
        createRootReducer(history, apiUrl, apiKey),
        undefined,
        applyMiddleware(
            multiActionMiddleware,
            epicMiddleware,
            thunk,
            routerMiddleware(history),
            createLogger()
        )
    )
    epicMiddleware.run(rootEpic)
    return store
}

const createPersistStore = (store: Store) =>
    persistStore(store)


export {
    createPersistStore,
    createStore
}
