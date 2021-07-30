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
    myLocation: string
    getWeatherCities: typeof weatherActions.getWeatherStarted
    selectCity: typeof weatherActions.selectCity
    enterLocation: typeof weatherActions.enterLocation
    goToDetailView: typeof routerActions.push
}

const useFetching = (actionCreator, myLocation) => {
    useEffect(() => {
        actionCreator();
    }, [myLocation])
}

const WeatherCitiesContainer = (props: Prop) => {

    useFetching(props.getWeatherCities, props.myLocation)
    return h(
        WeatherCitiesView,
        {
            weatherCitiesList: props.weatherCitiesList,
            enterLocation: props.enterLocation,
            goToDetailView: props.goToDetailView,
            selectCity: props.selectCity
        }
    )
}


const mapStateToProps = (state) => ({
    weatherCitiesList: state.citiesWeather.weatherCitiesList,
    myLocation: state.citiesWeather.myLocation
})


const mapDispatchToProps = {
    goToDetailView,
    getWeatherCities: weatherActions.getWeatherStarted,
    enterLocation: weatherActions.enterLocation,
    selectCity: weatherActions.selectCity
}


export default connect(mapStateToProps, mapDispatchToProps)(WeatherCitiesContainer)
