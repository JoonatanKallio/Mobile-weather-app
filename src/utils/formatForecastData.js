import moment from "moment-timezone";
import * as Localization from "expo-localization";

//Cleans and calculates data from the API for frontend use
export default function formatForecastData(forecast) {
    const forecastList = forecast.list
    let compareDate = moment(new Date(forecastList[0].dt * 1000)).tz(Localization.getCalendars()[0].timeZone).format("YYMMDD")
    const formattedForecast = []
    const list = []
    let helperList = []
    let index = 0
    //Goes through the forecast data and creates a formattedForecast list where the index corresponds to the days weather
    forecastList.forEach((timestamp) => {
        if(moment(new Date(timestamp.dt * 1000)).tz(Localization.getCalendars()[0].timeZone).format("YYMMDD") === compareDate) {
            helperList.push(timestamp)
            index += 1
            if(index === 40) {
                formattedForecast.push(helperList)
            }
        } else {
            formattedForecast.push(helperList)
            helperList = []
            helperList.push(timestamp)
            compareDate = moment(new Date(forecastList[index].dt * 1000)).tz(Localization.getCalendars()[0].timeZone).format("YYMMDD")
            index += 1
        }
    })

    let sum = 0
    let MIN_VALUE = 9999
    let MAX_VALUE = -9999
    //Goes through the formatted list and creates a list of objects where the index corresponds to the days weather
    formattedForecast.forEach((day, index) => {
        let dayObject = { day: 0, averageTemp: 0, max: 0, min: 0 }
        day.forEach((hours) => {
            sum += hours.main.temp
            dayObject.day = hours.dt
            if(hours.main.temp_min < MIN_VALUE) {
                MIN_VALUE = hours.main.temp_min;
            }
            if(hours.main.temp_max > MAX_VALUE) {
                MAX_VALUE = hours.main.temp_max
            }
        })
        dayObject.averageTemp=(sum/day.length)
        dayObject.min = MIN_VALUE
        dayObject.max = MAX_VALUE
        list.push(dayObject)
        MIN_VALUE = 9999
        MAX_VALUE = -9999
        sum = 0
    })
    return list;
}
