import {div, h1, input, span} from 'react-hyperscript-helpers'
import './weather-detail-view.less'

import {getCityStatebyName, convertUnixTimestamp} from '../../common/utils'
import view from "../framework/view";
import {horizontalContainer, verticalContainer} from "../framework";


const WeatherCityDetailView = (props) => {
    const city = getCityStatebyName(props.weatherCitiesList, props.selectedCity)
    return view([
        h1('.title', [props.selectedCity]),
        div('.city', [
            horizontalContainer([
                verticalContainer([
                    div('.main', [city.weather[0]['main']]),
                    div('.temp', [
                        city.main['temp'].toFixed(),
                        span(["\u2103"])
                    ]),
                    div('.highLowTemp', [
                        'H: ' + city.main['temp_max'].toFixed(), span(["\u2103"]),
                        ' L:  ' + city.main['temp_min'].toFixed(), span(["\u2103"])
                    ])
                ]),
                verticalContainer([
                    div('.main', ['Sunrise']),
                    div('.temp', [
                        convertUnixTimestamp(city.sys['sunrise'])
                    ]),
                    div('.h-separator'),
                    div('.main', ['Humidity']),
                    div('.temp', city.main['humidity'] + '%')
                ]),
                verticalContainer([
                    div('.ve-separator')
                ]),
                verticalContainer([
                    div('.main', ['Sunset']),
                    div('.temp', [
                        convertUnixTimestamp(city.sys['sunset'])
                    ]),
                    div('.h-separator'),
                    div('.main', ['Visibility']),
                    div('.temp', city.visibility)
                ])
            ]),
        ])
    ])
}

export default WeatherCityDetailView