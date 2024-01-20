import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Constants from 'expo-constants';
import Weather from "../src/components/Weather";
import {Link} from "expo-router";
import {useEffect, useState} from "react";
import * as Location from 'expo-location';

export default function App() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    //Gets user's location
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    //Renders error message
    if(errorMsg) {
        return (
            <View style={styles.container}>
                <View style={{justifyContent: "center", alignItems: "center"}}>
                    <View style={styles.header}>
                        <Image source={require("../assets/weather-forecast.png")} style={{ width: 120, height: 120 }} />
                        <Text style={styles.headerText}>WeatherNow</Text>
                    </View>
                    <Text style={{fontWeight: "900"}}>{errorMsg}</Text>
                    <StatusBar style="auto" />
                </View>
            </View>
        );
    }
    //Renders correct view if location has been set
    if(location) {
        return (
            <View style={styles.container}>
                <View style={{justifyContent: "center", alignItems: "center"}}>
                    <View style={styles.header}>
                        <Image source={require("../assets/weather-forecast.png")} style={{ width: 120, height: 120 }} />
                        <Text style={styles.headerText}>WeatherNow</Text>
                    </View>
                    <Weather location={location}/>
                    <Link href={{pathname: "/weekForecast",
                        params: {lat: location.coords.latitude, lon: location.coords.longitude},
                    }} asChild style={styles.weeklyForecast}>
                        <Pressable>
                            <Text style={styles.forecastButton}>Forecast</Text>
                        </Pressable>
                    </Link>
                    <StatusBar style="auto" />
                </View>
            </View>
        );
    }

    //Loading view
    return (
        <View style={styles.container}>
            <View style={{justifyContent: "center", alignItems: "center"}}>
                <View style={styles.header}>
                    <Image source={require("../assets/weather-forecast.png")} style={{ width: 120, height: 120 }} />
                    <Text style={styles.headerText}>WeatherNow</Text>
                </View>
                <Text style={{fontWeight: "900"}}>Loading data...</Text>
                <StatusBar style="auto" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#fff",
    },
    header: {
        width: "50%",
        height: "auto",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        padding: 30,
        borderRadius: 40
    },
    headerText: {
        color: "#000000",
        fontSize: 22,
        fontWeight: "900"
    },
    weeklyForecast: {
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
    },
    forecastButton: {
        fontWeight: "900",
        fontSize: 30,
    }
});
