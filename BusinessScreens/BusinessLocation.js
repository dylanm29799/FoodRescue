//Taken From Expo Documentation https://docs.expo.io/versions/latest/sdk/location/#usage

import React from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import Colour from "../constants/Colour";
import { scale } from "../components/ResponsiveText";
import Map from "../components/Map";

const BusinessLocation = (props) => {
  return (
    <View style={styles.container}>
      <Map style={styles.Map} />

      <View style={styles.textOverMap}>
        <Text style={styles.text}>This is Your Location?</Text>
        <Text style={styles.text}>This is Not your Location?</Text>
      </View>
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
  textOverMap: {
    position: "absolute",
    flex: 1,
    flexDirection: "row",
    width: "70%",
    backgroundColor: "#fff",
    alignItems: "center",
    borderRadius: scale(100),
  },

  text: {
    fontSize: scale(20),
    color: Colour.primaryColour,
    borderWidth: scale(2),
    flex: 1,
    justifyContent: "center",
  },
});

export default BusinessLocation;
