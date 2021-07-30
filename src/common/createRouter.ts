import {ConnectedRouter} from 'connected-react-router'
import {h} from 'react-hyperscript-helpers'
import {PersistGate} from 'redux-persist/lib/integration/react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import {Store} from 'redux'
import WeatherCitiesContainer from '../components/container/weather-cities-list'
import WeatherDetailContainer from '../components/container/weather-city-detail'
import {createPersistStore} from '../common/store'


interface Prop {
    history: any
}

const AppRouter = ({history}: Prop) =>
    h(
        ConnectedRouter,
        {history},
        [
            h(
                Switch,
                [
                    h(
                        Redirect,
                        {
                            exact: true,
                            from: '/',
                            to: '/dashboard'
                        }
                    ),
                    h(
                        Route,
                        {
                            path: '/dashboard',
                            render: (props) => h(WeatherCitiesContainer, {...props})
                        }
                    ),
                    h(
                        Route,
                        {
                            path: '/detailView',
                            render: (props) => h(WeatherDetailContainer, {...props})
                        }
                    )
                ]
            )
        ]
    )

const createRouter = (history: any, store: Store) =>
    h(
        Provider,
        {store},
        [
            h(
                PersistGate,
                {persistor: createPersistStore(store)},
                [
                    h(AppRouter, {history})
                ]
            )
        ]
    )

export default createRouter


