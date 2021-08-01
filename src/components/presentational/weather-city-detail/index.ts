import {div, h1, span} from 'react-hyperscript-helpers'
import './style.less'


import {horizontalContainer, verticalContainer, view} from "../../framework";
import {convertUnixTimestamp, getCityStatebyName} from "../../../common/utils";


const Index = (props) => {
    const city = getCityStatebyName(props.weatherCitiesList, props.selectedCity)
    return view([
        h1('.title', [props.selectedCity]),
        div('.city', [
            horizontalContainer([
                verticalContainer([
                    div('.main', [city.weather[0]['main']]),
                    div('.temp', [
                        city.main['temp'].toFixed(),
                        span(
                            [props.units == 'metric' ? "\u2103" : "\u2109"]
                        )
                    ]),
                    div('.highLowTemp', [
                        'H: ' + city.main['temp_max'].toFixed(),
                        span(
                            [props.units == 'metric' ? "\u2103" : "\u2109"]
                        ),
                        ' L:  ' + city.main['temp_min'].toFixed(),
                        span(
                            [props.units == 'metric' ? "\u2103" : "\u2109"]
                        )
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

export default Index