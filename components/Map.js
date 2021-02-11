import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import Colour from "../constants/Colour";
import { scale } from "./ResponsiveText";

Map = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let long = -6.243367195129395;
  let lat = 53.34900146651947;

  let text = "Please Wait";

  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
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
          title={"Business Name"}
        />
      </MapView>
    </View>
  );
};

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

export default function Map() {}
