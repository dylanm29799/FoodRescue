import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Colour from "../constants/Colour";
import { scale } from "../components/ResponsiveText";

import "firebase/firestore";
import * as firebase from "firebase";
import "firebase/storage";

import NormalProduct from "../components/NormalProduct";
import FoodCountdown from "../components/FoodCountdown";

const BusinessAddProduct = () => {
  const dbconnection = firebase.firestore();
  var user = firebase.auth().currentUser;
  var uid = ""
try{
  uid = user.uid;
}
catch(err){
  console.log(err)
}



  const [npview, setNpview] = useState("picked");
  const [nptext, setNptext] = useState("pickedText");
  const [fcview, setFcview] = useState("notPicked");
  const [fctext, setFctext] = useState("notPickedText");
  const [borderCorner, setBorderCorner] = useState({ borderTopLeftRadius: 30 });
  const [borderCornerFood, setBorderCornerFood] = useState({
    borderTopRightRadius: 30,
  });
  const [renderedPage, setRenderedPage] = useState("Normal");
  var newQuantity;

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
  function RenderTime() {
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
          newQuantity = doc.data().quantity;

          [(global.quantity = newQuantity + 1)];
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
