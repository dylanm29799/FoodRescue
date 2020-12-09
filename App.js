import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import FoodRescueNavigator from "./Navigation/FoodRescueNavigation";
const fetchFonts = () => {
  return Font.loadAsync({
    Raleway: require("./assets/fonts/Raleway-VariableFont_wght.ttf"),
  });
};

export default function App() {
  //Creating Splash Screen to help with font loading times
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
