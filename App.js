import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import Firebase from "@react-native-firebase/app";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNATnerGchx1ogJt7qfX753b2hKA_6lCM",
  authDomain: "food-rescue-34ffd.firebaseapp.com",
  projectId: "food-rescue-34ffd",
  storageBucket: "food-rescue-34ffd.appspot.com",
  messagingSenderId: "938358312786",
  appId: "1:938358312786:web:a2a3b677f6dd2efcf9f48b",
  measurementId: "G-WLL8GZ4PH7",
};

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
