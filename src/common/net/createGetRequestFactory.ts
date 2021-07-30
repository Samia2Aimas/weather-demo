import {reduce} from 'lodash'

const createUrlQueryParameterPostfix = (queryParameters) =>
    reduce(
        queryParameters,
        (memo, value, name) =>
            (memo === '' ? '?' : memo + '&') + `${name}=${decodeURIComponent(value)}`,
        ''
    );

const dispatchGetRequest = async (url: string, queryParameters = {}) => {
    const options: RequestInit = {
        mode: 'cors',
    }
    const resolvedUrl = url + createUrlQueryParameterPostfix(queryParameters)
    let response
    let jsonData
    response = await fetch(resolvedUrl, options)
    jsonData = await response.json()
    return jsonData
}


const createGetRequestFactory = (apiBaseUrl: string) => {
    return (path, queryParameters = {}) => {
        const apiEndpoint = `${apiBaseUrl}${path}`

        return dispatchGetRequest(apiEndpoint, queryParameters)
    }
}


export {
    createGetRequestFactory,
}
