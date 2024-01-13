import {View, Text, StyleSheet, Image} from "react-native";
import {useEffect, useState} from "react";
import moment from 'moment-timezone';
import * as Localization from "expo-localization";

export default function Weather () {
    const [weatherData, setWeatherData] = useState()
    const apiKey = process.env.EXPO_PUBLIC_WEATHER_API_KEY

    function fetchData() {
        fetch("https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&units=metric&q=Lappeenranta")
            .then(response => response.json())

            .then(json => {
                setWeatherData(json)
            })
            .catch(error => {
                console.log(error);
            })
    }
    useEffect(() => {
        fetchData();
    }, []);

    //Checks if the weather data has been loaded
    if (weatherData) {
        //Formats the time to local timezone
        const weatherIcon = "https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
        const sunrise = new Date(weatherData.sys.sunrise * 1000)
        const formattedSunrise = moment(sunrise).tz(Localization.getCalendars()[0].timeZone).format("HH:mm")
        const sunset = new Date(weatherData.sys.sunset * 1000)
        const formattedSunset = moment(sunset).tz(Localization.getCalendars()[0].timeZone).format("HH:mm")
        return (
            <View style={styles.wrapper}>
                <View style={styles.weatherData}>
                    <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 20}}>
                        <View style={styles.temp}>
                            <View>
                                <Text style={{fontWeight: "900", fontSize: 30}}>{weatherData.name}</Text>
                            </View>
                            <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                                <Image source={{uri: weatherIcon}} style={{width: 120, height: 120}}/>
                                <View style={{justifyContent: "center", alignItems: "center"}}>
                                    <Text style={{
                                        fontWeight: "700",
                                        fontSize: 45
                                    }}>{Math.round((weatherData.main.temp * 100) / 100)}&deg;</Text>
                                    <Text style={{fontWeight: "700", textAlign: "center", fontSize: 15}}>Feels
                                        like {Math.round((weatherData.main.feels_like * 100) / 100)} &deg;</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.dayTime}>
                            <View
                                style={{flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 20}}>
                                <Image source={require("../../assets/sunrise.png")} style={{width: 100, height: 100}}/>
                                <Text style={{fontWeight: "900", fontSize: 30}}>{formattedSunrise}</Text>
                            </View>
                        </View>
                        <View style={styles.dayTime}>
                            <View
                                style={{flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 20}}>
                                <Image source={require("../../assets/sunset.png")} style={{width: 100, height: 100}}/>
                                <Text style={{fontWeight: "900", fontSize: 30}}>{formattedSunset}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    wrapper: {
        justifyContent: "center",
        alignItems: "center"
    },
    weatherData: {
        justifyContent: "center",
        alignItems: "center"
    },
    temp: {
        backgroundColor: "rgb(141,208,236)",
        borderRadius: 50,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        width: 350,
        paddingHorizontal: 30,
    },
    dayTime: {
        backgroundColor: "rgb(141,208,236)",
        borderRadius: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: 350,
        padding: 10
    }
})
