import React, { useEffect, useState } from "react";
// import * as Location from "expo-location";
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [city, setCity] = useState("bengaluru");
  // const [location,setLocation]=useState('')

  const URL = `https://api.weatherapi.com/v1/current.json?key=6f507953980944c6be694748212407&q=${city}&aqi=no`;
  // const URL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4fbc6cbc5589f8beeeef0532031a1b28`

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(URL);
      const json = await response.json();
      setData(json);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       alert('Permission to access location was denied');
  //       return;
  //     }
  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //     console.log(location);

  //   })();
  // }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.head}>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator
            animating={true}
            color={Colors.blue800}
            size="large"
          />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.searchbar}>
            <TextInput
              style={styles.input}
              placeholder="Search for a city..."
              onChangeText={(val) => setCity(val)}
              placeholderTextColor="white"
            />
            <TouchableOpacity onPress={fetchData}>
              <View style={styles.searchButton}>
                <MaterialIcons name="search" size={40} style={styles.icon} />
              </View>
            </TouchableOpacity>
          </View>
          <ImageBackground
            style={styles.main}
            source={require("./assets/map.jpeg")}
          >
            <Image
              source={require("./assets/sun.png")}
              style={styles.cloudImg}
            />
          </ImageBackground>
          {data?.location?.name !== undefined ? (
            <View>
              <Text style={styles.status}>{data.current.condition.text}</Text>
              <Text style={styles.temp}>{data.current.temp_c}&#176;</Text>
              <Text style={styles.city}>{data.location.name}</Text>
              <View style={styles.cardsContainer}>
                <TouchableOpacity>
                  <View style={styles.card}>
                    <Image
                      source={require("./assets/plain.png")}
                      style={styles.cardImg}
                    />
                    <Text>{data.current.cloud} </Text>
                    <Text style={styles.cardText}>Cloud</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.card}>
                    <Image
                      source={require("./assets/rain.png")}
                      style={styles.cardImg}
                    />
                    <Text>{data.current.humidity} </Text>

                    <Text style={styles.cardText}>Humidity</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.card}>
                    <Image
                      source={require("./assets/moon.png")}
                      style={styles.cardImg}
                    />
                    <Text>{data.current.wind_kph} Kph</Text>

                    <Text style={styles.cardText}>Wind</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <Text style={styles.date}>{new Date().toDateString()}</Text>
            </View>
          ) : (
            <Text style={styles.warning}>No city with such name..</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  head: {
    flex: 1,
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#0d0d0d",
    paddingVertical: 60,
  },
  input: {
    color: "white",
  },
  searchbar: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 40,
    backgroundColor: "#1a1a1a",
    width: Dimensions.get("window").width - 80,
    paddingHorizontal: 25,
    paddingVertical: 12,
    justifyContent: "space-between",
  },
  main: {
    width: Dimensions.get("window").width,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  cloudImg: {
    height: 320,
    width: 270,
  },
  status: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  temp: {
    fontSize: 90,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  city: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  date: {
    textAlign: "center",
    fontSize: 17,
    color: "white",
  },
  cardsContainer: {
    flexDirection: "row",
    minHeight: 200,
    marginVertical: 30,
  },
  card: {
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: 20,
    height: 150,
    maxWidth: 130,
    marginHorizontal: 10,
  },
  cardImg: {
    width: 80,
    height: 50,
  },
  cardText: {
    textAlign: "center",
    color: "white",
  },
  warning: {
    color: "white",
  },
  icon: {
    color: "white",
  },
});
