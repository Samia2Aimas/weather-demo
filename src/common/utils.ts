import moment from "moment"
import { action as routerAction } from '../common/store/router'


const getCityStatebyName = (weatherCitiesList, selectedCity) =>
    weatherCitiesList.find((item) => item.name === selectedCity)


const convertUnixTimestamp = (timestamp: number) => {
    return moment.unix(timestamp).format("HH:mm")
}

const goToDetailView = () =>
    dispatch => dispatch([
        routerAction.push('/detailView'),
    ])


export { goToDetailView, convertUnixTimestamp, getCityStatebyName }
