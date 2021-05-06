/*
 *
 * ClassName: BusinessAddProduct.js
 *
 * Date: 28/04/2021
 *
 *
 * @author: Dylan Murphy, X17506166
 *
 * @reference : https://www.udemy.com/course/react-native-the-practical-guide/learn/lecture/15674818?start=0#overview
 * @reference : https://docs.expo.io/
 * @reference : https://firebase.google.com/docs/web/setup
 * @reference : https://github.com/wix/react-native-navigation
 *
 *
 */

import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Colour from "../constants/Colour";
import { scale } from "../components/ResponsiveText";

import "firebase/firestore";
import * as firebase from "firebase";
import "firebase/storage";

import NormalProduct from "../components/NormalProduct";
import FoodCountdown from "../components/FoodCountdown";
const { height } = Dimensions.get("window");

const BusinessAddProduct = () => {
  const dbconnection = firebase.firestore();
  var user = firebase.auth().currentUser;
  //Getting user id
  var uid = "";
  try {
    uid = user.uid;
  } catch (err) {
    console.log(err);
  }
  //Setting the view and text original picked state
  const [npview, setNpview] = useState("picked");
  const [nptext, setNptext] = useState("pickedText");
  const [fcview, setFcview] = useState("notPicked");
  const [fctext, setFctext] = useState("notPickedText");
  const [borderCorner, setBorderCorner] = useState({ borderTopLeftRadius: 30 });
  const [borderCornerFood, setBorderCornerFood] = useState({
    borderTopRightRadius: 30,
  });
  //The original page rendered is the normal products page
  const [renderedPage, setRenderedPage] = useState("Normal");
  var newQuantity;

  onFoodCountdown = () => {
    //When food countdown is picked
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
    //When normal product is picked
    setFctext("notPickedText");
    setFcview("notPicked");
    setNptext("pickedText");
    setNpview("picked");
    setBorderCornerFood({ borderTopRightRadius: 30 });

    console.log("Normal Pressed");

    setRenderedPage("Normal");
    console.log(renderedPage);
  };
  function RenderTime() {
    //render the page that is picked
    if (renderedPage == "Normal") {
      return <NormalProduct />;
    } else {
      return <FoodCountdown />;
    }
  }
  useEffect(() => {
    dbconnection
      .collection("businessDetails")
      .doc(uid)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          //setting quantity
          newQuantity = doc.data().quantity;
        }
      });
  }, [RenderTime]);

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
      <RenderTime />
    </View>
  );
};
//Stylesheet
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: height - 40,
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
    fontFamily: "MonM",
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
    fontFamily: "MonM",
  },
  notPickedText: {
    color: Colour.primaryColour,
    textAlign: "center",
    fontSize: scale(12),
    fontFamily: "MonM",
  },

  category: {
    justifyContent: "center",
    flexDirection: "row",
    width: "90%",
    height: scale(50),
  },
});

export default BusinessAddProduct;
