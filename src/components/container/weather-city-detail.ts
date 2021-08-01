import {h} from 'react-hyperscript-helpers'
import {connect} from 'react-redux'
import {action as weatherActions} from '../../common/store/cities-weather'
import Index from '../presentational/weather-city-detail'


interface Prop {
    selectedCity: string
    units: string
    weatherCitiesList: []

}

const WeatherDetailContainer = (props: Prop) => {
    return h(
        Index,
        {
            selectedCity: props.selectedCity,
            weatherCitiesList: props.weatherCitiesList,
            units: props.units
        }
    )
}


const mapStateToProps = (state) => ({
    selectedCity: state.citiesWeather.selectedCity,
    weatherCitiesList: state.citiesWeather.weatherCitiesList,
    units: state.citiesWeather.units
})


const mapDispatchToProps = {
    changeUnits: weatherActions.changeUnits
}


export default connect(mapStateToProps, mapDispatchToProps)(WeatherDetailContainer)
