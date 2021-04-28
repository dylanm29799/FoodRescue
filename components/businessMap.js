/*
 *
 * ComponentName: businessMap.js
 *
 * Date: 28/04/2021
 *
 *
 * @author: Dylan Murphy, X17506166
 *
 * @reference : https://www.udemy.com/course/react-native-the-practical-guide/learn/lecture/15674818?start=0#overview
 * @reference : https://docs.expo.io/
 * @reference : https://firebase.google.com/docs/web/setup
 * @reference : https://github.com/wix/react-native-navigation
 *
 */
import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import Colour from "../constants/Colour";

BusinessMap = () => {
  //location and error message state
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      //get request to use location
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      //get location of user
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  //predefined location
  let long = -6.243367195129395;
  let lat = 53.34900146651947;

  let text = "Please Wait";

  if (errorMsg) {
    //Error message returned, return text
    text = errorMsg;
  } else if (location) {
    //if location is good, store location in global attribute
    text = JSON.stringify(location);
    long = location.coords.longitude;
    lat = location.coords.latitude;
    [(global.longitude = long)];
    [(global.latitude = lat)];
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.Map}
        region={{
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.02,
          longitudeDelta: 0.0,
        }}
      >
        <Marker
          coordinate={{ latitude: lat, longitude: long }}
          pinColor={Colour.primaryColour}
          title={"Your Location"}
        />
      </MapView>
    </View>
  );
};
//Stylesheet for styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  paragraph: {
    flex: 1,
  },

  Map: {
    width: "100%",
    height: "100%",
  },
});

export default function BusinessMap() {}
