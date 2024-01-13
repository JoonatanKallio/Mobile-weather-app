import { StatusBar } from 'expo-status-bar';
import {Image, StyleSheet, Text, View} from 'react-native';
import Constants from 'expo-constants';
import Weather from "./src/components/Weather";

export default function App() {
    return (
        <View style={styles.container}>
            <View style={{justifyContent: "center", alignItems: "center"}}>
                <View style={styles.header}>
                    <Image source={require("./assets/weather-forecast.png")} style={{ width: 120, height: 120 }} />
                    <Text style={styles.headerText}>WeatherNow</Text>
                </View>
                <Weather />
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
    }
});
