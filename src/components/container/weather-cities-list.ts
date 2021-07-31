import {h} from 'react-hyperscript-helpers'
import {connect} from 'react-redux'
import {useEffect} from "react";
import {action as weatherActions} from '../../common/store/cities-weather'
import {Location} from "../../common/model";
import WeatherCitiesView from "../presentational/weather-cities-view";
import {goToDetailView} from "../../common/utils";
import {routerActions} from "connected-react-router";


interface Prop {
    citiesList: Array<Location>
    weatherCitiesList: []
    units: string
    myLocation: string
    changeUnits: typeof weatherActions.changeUnits
    getWeatherCities: typeof weatherActions.getWeatherStarted
    selectCity: typeof weatherActions.selectCity
    enterLocation: typeof weatherActions.enterLocation
    goToDetailView: typeof routerActions.push
}

const useFetching = (actionCreator, myLocation, units) => {
    useEffect(() => {
        actionCreator();
    }, [myLocation, units])
}

const WeatherCitiesContainer = (props: Prop) => {

    useFetching(props.getWeatherCities, props.myLocation, props.units)
    return h(
        WeatherCitiesView,
        {
            changeUnits: props.changeUnits,
            weatherCitiesList: props.weatherCitiesList,
            enterLocation: props.enterLocation,
            goToDetailView: props.goToDetailView,
            selectCity: props.selectCity,
            units: props.units
        }
    )
}


const mapStateToProps = (state) => ({
    weatherCitiesList: state.citiesWeather.weatherCitiesList,
    myLocation: state.citiesWeather.myLocation,
    units: state.citiesWeather.units
})


const mapDispatchToProps = {
    goToDetailView,
    changeUnits: weatherActions.changeUnits,
    getWeatherCities: weatherActions.getWeatherStarted,
    enterLocation: weatherActions.enterLocation,
    selectCity: weatherActions.selectCity
}


export default connect(mapStateToProps, mapDispatchToProps)(WeatherCitiesContainer)
