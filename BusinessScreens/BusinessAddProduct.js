import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Colour from "../constants/Colour";
import { scale } from "../components/ResponsiveText";
import Map from "../components/Map";
import CheckBox from "@react-native-community/checkbox";
import foodcountdown from "../models/foodcountdown";

const BusinessAddProduct = (props) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  let foodCountdown = "";
  let textStyle = "";

  let place = "";

  if (toggleCheckBox == false) {
    foodCountdown = "";
    textStyle = "";
    place = "";
  } else {
    foodCountdown = "How Many hours will this product be available";
    place = "3";
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Product Name</Text>
      <TextInput style={styles.input} placeholder="Pizza Slice" />
      <Text style={styles.text}>Quantity Available</Text>
      <TextInput style={styles.input} placeholder="8" />
      <Text style={styles.text}>Initial Price before discount</Text>
      <TextInput style={styles.input} placeholder="4.00" />
      <Text style={styles.text}>New Price for Food Rescue</Text>
      <TextInput style={styles.input} placeholder="2.40" />
      <Text style={styles.text}>Food Countdown?</Text>
      <CheckBox
        title="Food Countdown?"
        disabled={false}
        value={toggleCheckBox}
        onValueChange={(True) => setToggleCheckBox(True)}
      />

      <Text style={styles.text}>{foodCountdown}</Text>
      <TextInput
        styles={styles.input}
        placeholder={place}
        keyboardType="numeric"
      ></TextInput>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate({
            routeName: "BusinessHome",
          });
        }}
        style={styles.touchable}
      >
        <TextInput style={styles.touchableText}>Submit</TextInput>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: Colour.primaryColour,
    width: "70%",
    paddingVertical: scale(3),
    paddingHorizontal: scale(10),
    textAlign: "center",
  },

  text: { marginTop: scale(10), fontSize: scale(13) },

  touchable: {
    height: scale(30),
    width: scale(70),
    backgroundColor: Colour.primaryColour,
    justifyContent: "center",

    marginHorizontal: scale(10),
  },
  touchableText: {
    color: "#fff",

    textAlign: "center",
    fontSize: scale(12),
  },
});

export default BusinessAddProduct;
