/*
 *
 * ClassName: App.js
 *
 * Date: 28/04/2021
 *
 *
 * @author: Dylan Murphy, X17506166
 *
 * @reference : https://www.udemy.com/course/react-native-the-practical-guide/learn/lecture/15674818?start=0#overview
 * @reference : https://docs.expo.io/
 * @reference : https://firebase.google.com/docs/web/setup
 * @reference : https://fonts.google.com/
 * @reference : https://github.com/wix/react-native-navigation
 *
 */

import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { firebaseConfig } from "./config";
import firebase from "firebase";
import { LogBox } from "react-native";
import * as Location from "expo-location";
//Ignore Timer Issues with android
LogBox.ignoreLogs(["Setting a timer"]);

//Ignore Warnings in React Native
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

//Initialise Firebase
firebase.initializeApp(firebaseConfig);

//Import Navigation
import FoodRescueNavigator from "./Navigation/FoodRescueNavigation";

//Specifying fonts
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
  //Getting users location
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
