import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { firebaseConfig } from "./config";
import firebase from "firebase";
import { LogBox } from "react-native";
import * as Location from "expo-location";
LogBox.ignoreLogs(["Setting a timer"]);

firebase.initializeApp(firebaseConfig);

import FoodRescueNavigator from "./Navigation/FoodRescueNavigation";

const fetchFonts = () => {
  return Font.loadAsync({
    OpenSans: require("./assets/fonts/OpenSans-Regular.ttf"),
    Raleway: require("./assets/fonts/Raleway-VariableFont_wght.ttf"),
    MonL: require("./assets/fonts/Montserrat-Light.ttf"),
    MonB: require("./assets/fonts/Montserrat-Medium.ttf"),
    MonM: require("./assets/fonts/Montserrat-Regular.ttf"),
  });
};

export default function App() {
  //Creating Splash Screen to help with font loading times
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
  if (location) {
    long = location.coords.longitude;
    lat = location.coords.latitude;
    [(global.longitude = long)];
    [(global.latitude = lat)];
  }

  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return <FoodRescueNavigator />;
}
