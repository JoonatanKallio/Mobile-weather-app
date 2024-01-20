import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {useLocalSearchParams} from "expo-router";
import {useEffect, useState} from "react";
import moment from "moment-timezone";
import * as Localization from "expo-localization";
import formatForecastData from "../src/utils/formatForecastData";
export default function weekForecast() {
    const [forecast, setForecast] = useState()
    const apiKey = process.env.EXPO_PUBLIC_WEATHER_API_KEY
    const params = useLocalSearchParams()

    //Fetches the weather forecast data from the user's location
    function fetchData() {
        fetch("http://api.openweathermap.org/data/2.5/forecast?id=524901&units=metric&appid=" + apiKey + "&lat=" +  params.lat + "&lon=" + params.lon)
            .then(response => response.json())
            .then(json => {
                setForecast(json)
            })
            .catch(error => {
                console.log(error);
            })
    }
    useEffect(() => {
        fetchData();
    }, []);

    if(forecast) {
        const list = formatForecastData(forecast)
        return (
            <View style={{justifyContent: "center", alignItems: "center", marginTop: 100}}>
                <Text style={{fontWeight: "900", fontSize: 30}}>{forecast.city.name}</Text>
                <Text style={{fontWeight: "500", fontSize: 15}}>Forecast</Text>
                <View style={{gap: 20, justifyContent: "center", alignItems: "center", marginTop: 50}}>
                    <FlatList numColumns={2} data={list} renderItem={({item}) => {
                        return (
                            <View style={{
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "rgb(141,208,236)",
                                width: 155,
                                borderRadius: 25,
                                flexDirection: "column",
                                margin: 10,
                                paddingBottom: 10
                            }}>
                                <View style={{alignItems: "center", justifyContent: "center"}}>
                                    <Text style={styles.averageTemp}>
                                        {moment(new Date(item.day * 1000)).tz(Localization.getCalendars()[0].timeZone).format("ddd")}
                                    </Text>
                                    <Text style={styles.averageTemp}>
                                        {Math.round(item.averageTemp * 100 / 100)}&deg;
                                    </Text>
                                </View>
                                <View style={{flexDirection: "row", gap: 20}}>
                                    <View
                                        style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                                        <Text style={{fontWeight: "700"}}>{Math.round(item.max * 100 / 100)}&deg;</Text>
                                        <Image source={require("../assets/positive_thermometer.png")}
                                               style={{width: 15, height: 15}}/>
                                    </View>
                                    <View
                                        style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                                        <Text style={{fontWeight: "700"}}>{Math.round(item.min * 100 / 100)}&deg;</Text>
                                        <Image source={require("../assets/negative_thermometer.png")}
                                               style={{width: 15, height: 15}}/>
                                    </View>
                                </View>
                            </View>
                        )
                    }} keyExtractor={item => item.day}/>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    averageTemp: {
        fontSize: 30,
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    },
    previous: {
        backgroundColor: "rgb(141,208,236)",
        borderRadius: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: 350,
        padding: 10,
        marginTop: 20,
        borderStyle: "solid",
        borderColor: "rgb(140,140,140)",
        borderWidth: 2
    }
})
