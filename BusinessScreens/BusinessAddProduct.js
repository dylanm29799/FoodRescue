import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Image,
  ColorPropType,
} from "react-native";
import Colour from "../constants/Colour";
import { scale } from "../components/ResponsiveText";
import * as ImagePicker from "expo-image-picker";
import CheckBox from "@react-native-community/checkbox";
import foodcountdown from "../models/foodcountdown";
import * as firebase from "firebase";
import "firebase/firestore";
import ButtonCustom from "../constants/ButtonCustom";
import "firebase/storage";
import { Picker } from "@react-native-picker/picker";
import { set } from "react-native-reanimated";
import NormalProduct from "../components/NormalProduct";
import FoodCountdown from "../components/FoodCountdown";

const BusinessAddProduct = (props) => {
  const [npview, setNpview] = useState("picked");
  const [nptext, setNptext] = useState("pickedText");
  const [fcview, setFcview] = useState("notPicked");
  const [fctext, setFctext] = useState("notPickedText");
  const [borderCorner, setBorderCorner] = useState({ borderTopLeftRadius: 30 });
  const [borderCornerFood, setBorderCornerFood] = useState({
    borderTopRightRadius: 30,
  });
  const [renderedPage, setRenderedPage] = useState("Normal");

  onFoodCountdown = () => {
    setFctext("pickedText");
    setFcview("picked");
    setNptext("notPickedText");
    setNpview("notPicked");
    setBorderCorner({ borderTopLeftRadius: 30 });
    console.log("FoodCountdown Pressed");

    setRenderedPage("FoodCountdown");
    console.log(renderedPage);
  };

  onNormalProduct = () => {
    setFctext("notPickedText");
    setFcview("notPicked");
    setNptext("pickedText");
    setNpview("picked");
    setBorderCornerFood({ borderTopRightRadius: 30 });

    console.log("Normal Pressed");

    setRenderedPage("Normal");
    console.log(renderedPage);
  };

  const Render = () => {
    if (renderedPage == "Normal") {
      return <NormalProduct />;
    } else {
      return <FoodCountdown />;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.category}>
        <TouchableOpacity
          //prettier-ignore
          style={[styles[npview],  borderCorner ]}
          onPress={onNormalProduct}
        >
          <Text style={styles[nptext]}>Normal Product</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles[fcview], borderCornerFood]}
          onPress={onFoodCountdown}
        >
          <Text style={styles[fctext]}>Food Countdown</Text>
        </TouchableOpacity>
      </View>
      <Render />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    borderTopWidth: 0,
    borderWidth: 2,
    borderColor: Colour.primaryColour,

    height: scale(500),
    width: scale(250),
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

  text: {
    marginTop: scale(10),
    fontSize: scale(13),
    textAlign: "center",
    fontFamily: "OpenSans",
  },

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
  picked: {
    backgroundColor: Colour.primaryColour,
    flex: 1,
    justifyContent: "center",
    elevation: 100,
  },

  notPicked: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",

    borderWidth: 2,
    borderColor: Colour.primaryColour,
  },

  pickedText: {
    color: "#fff",
    textAlign: "center",
    fontSize: scale(12),
    fontFamily: "OpenSans",
  },
  notPickedText: {
    color: Colour.primaryColour,
    textAlign: "center",
    fontSize: scale(12),
    fontFamily: "OpenSans",
  },

  category: {
    justifyContent: "center",
    flexDirection: "row",
    width: "90%",
    height: scale(50),
  },
});

export default BusinessAddProduct;
