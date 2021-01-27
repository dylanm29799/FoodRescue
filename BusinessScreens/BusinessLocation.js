//with help From Expo Documentation https://docs.expo.io/versions/latest/sdk/location/#usage

import React from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import Colour from "../constants/Colour";
import { scale } from "../components/ResponsiveText";
import Map, { long, lat } from "../components/Map";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "firebase";
import "firebase/firestore";

const BusinessLocation = (props) => {
  const dbconnection = firebase.firestore();
  console.log(long, lat);

  return (
    <View style={styles.container}>
      <Map style={styles.Map} />

      <View style={styles.textOverMap}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => {
            props.navigation.navigate({ routeName: "BusinessHome" });
          }}
        >
          <Text style={styles.text}>This is Your Location?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => {
            props.navigation.navigate({ routeName: "CorrectLocation" });
          }}
        >
          <Text style={styles.text}>This is Not your Location?</Text>
        </TouchableOpacity>
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
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",

    marginTop: scale(20),
  },
  touch: { flex: 1, marginHorizontal: scale(5) },
  text: {
    fontSize: scale(20),
    borderColor: Colour.primaryColour,
    borderWidth: scale(2),
    width: scale(150),
    backgroundColor: "#fff",
    borderRadius: scale(50),
    height: scale(100),
    textAlign: "center",
    paddingTop: scale(30),
    marginHorizontal: scale(5),
  },
});

export default BusinessLocation;
