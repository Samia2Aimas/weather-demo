import {h} from 'react-hyperscript-helpers'
import {connect} from 'react-redux'
import WeatherCityDetailView from '../../components/presentational/weather-city-detail-view'


interface Prop {
    selectedCity: string
    weatherCitiesList: []

}


const WeatherDetailContainer = (props: Prop) => {
    return h(
        WeatherCityDetailView,
        {
            selectedCity: props.selectedCity,
            weatherCitiesList: props.weatherCitiesList
        }
    )
}


const mapStateToProps = (state) => ({
    selectedCity: state.citiesWeather.selectedCity,
    weatherCitiesList: state.citiesWeather.weatherCitiesList,

})


const mapDispatchToProps = {}


export default connect(mapStateToProps, mapDispatchToProps)(WeatherDetailContainer)
