import {createBrowserHistory} from 'history'
import {render} from 'react-dom'
import {h} from 'react-hyperscript-helpers'

import createRouter from './common/createRouter'
import environment from './common/environment'
import {createStore} from './common/store'

import './style/main.less'


const basename = environment.release ? environment.BASE_NAME : undefined
const history = createBrowserHistory({basename})
const store = createStore(history, environment.API_URL, environment.API_KEY)
console.log(environment.API_URL)


const App = () =>
    createRouter(history, store)


// print build version
if (environment.release) {
    console.log(`build version: ${environment.version} (${environment.branch}, ${environment.time})`)
}

render(
    h(App),
    document.getElementById('app')
)
