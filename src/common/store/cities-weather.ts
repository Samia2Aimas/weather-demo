import {Action} from 'redux'
import {actionCreatorFactory, isType} from 'typescript-fsa'
import {combineEpics, ofType} from "redux-observable";
import {catchError, map, switchMap} from "rxjs/operators";
import {createGetRequestFactory} from "../net/createGetRequestFactory";
import {forkJoin, from, of} from "rxjs";

const actionCreator = actionCreatorFactory()


const getWeatherStarted = actionCreator('WEATHER_LIST_STARTED')
const getWeatherResult = actionCreator<{ weatherCitiesList: Array<Number> }>('WEATHER_LIST_RESULT')
const getWeatherFailed = actionCreator<{ error: number }>('WEATHER_LIST_FAILED')

const enterLocation = actionCreator<{ defaultLocation: string }>('ENTER_LOCATION')
const selectCity = actionCreator<{ selectedCity: string }>('SELECT_CITY')
const changeUnits = actionCreator<{units: string}>('CHANGE_UNITS')

const initialState = {
    weatherCitiesList: [],
    myLocation: 'Frankfurt',
    selectedCity: '',
    units: 'metric'
}

const weatherActions = {
    changeUnits,
    getWeatherStarted,
    enterLocation,
    selectCity
}


const weatherListEpic = (action$, state$) => {
    const createGetRequest = createGetRequestFactory(
        state$.value.config.weatherApiUrl
    )

    return action$.pipe(
        ofType(getWeatherStarted),
        switchMap(
            () => forkJoin([
                from(createGetRequest(
                    `weather`,
                    {
                        appid: state$.value.config.weatherApiKey,
                        units: state$.value.citiesWeather.units,
                        q: state$.value.citiesWeather.myLocation
                    })),
                from(createGetRequest(
                    `weather`,
                    {
                        appid: state$.value.config.weatherApiKey,
                        units: state$.value.citiesWeather.units,
                        q: 'Berlin'
                    })),
                from(createGetRequest(
                    `weather`,
                    {
                        appid: state$.value.config.weatherApiKey,
                        units: state$.value.citiesWeather.units,
                        q: 'London'
                    }))
            ]).pipe(
                map((data) => {
                    return getWeatherResult({
                        weatherCitiesList: data
                    })
                }),
                catchError(error => of(getWeatherFailed({error: error})))
            )
        )
    )
}

const weatherCitiesEpic = combineEpics(
    weatherListEpic
)

const createReducer = () =>
    (state = initialState, action: Action) => {
        //
        if (isType(action, enterLocation)) {
            return {
                ...state,
                myLocation: action.payload.defaultLocation,
            }
        }
        if (isType(action, changeUnits)) {
            return {
                ...state,
                units: action.payload.units,
            }
        }
        if (isType(action, selectCity)) {
            return {
                ...state,
                selectedCity: action.payload.selectedCity,
            }
        }
        if (isType(action, getWeatherStarted)) {
            return {
                ...state,
                loading: true
            }
        } else if (isType(action, getWeatherResult)) {
            return {
                ...state,
                weatherCitiesList: action.payload.weatherCitiesList,
                loading: false

            }
        } else if (isType(action, getWeatherFailed)) {
            return {
                ...state,
                error: action.payload.error
            }
        }
        return state
    }

export {
    weatherCitiesEpic,
    weatherActions as action,
    createReducer
}
