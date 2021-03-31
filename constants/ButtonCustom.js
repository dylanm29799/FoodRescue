import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import Colour from "./Colour";
import { scale } from "../components/ResponsiveText";

const ButtonCustom = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    alignItems: "center",
    backgroundColor: Colour.primaryColour,
    padding: 10,
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
  },
  appButtonText: {
    color: Colour.secondaryColour,
    fontSize: scale(18),
    fontFamily: "MonM",
    width: scale(150),
    alignItems: "center",
    textAlign: "center",
  },
});

export default ButtonCustom;
