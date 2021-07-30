import {div, h1, span, input} from 'react-hyperscript-helpers'
import './weather-view.less'
import view from "../framework/view";
import {horizontalContainer} from "../framework";


const WeatherCitiesView = (props) => {
    return view([
        h1('.title', ['Dashboard']),
        input('.inputLocation', {
            placeholder: 'Enter your city name..',
            onChange: (event) => props.enterLocation({defaultLocation: event.target.value})
        }),
        div('.cities-list',
            [
                props.weatherCitiesList.map((item) =>
                    horizontalContainer([
                        [
                            div('.cityProp',
                                {
                                    onClick: () => [
                                        props.selectCity({selectedCity: item.name}),
                                        props.goToDetailView()
                                    ]
                                }, [item.name]
                            ),
                            div('.cityProp', [
                                item.main !== undefined ? item.main['temp'].toFixed() : '',
                                span(["\u2103"])
                            ])
                        ]
                    ])
                )
            ]
        )
    ])
}


export default WeatherCitiesView