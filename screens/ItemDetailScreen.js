/*
 *
 * ClassName: ItemDetailScreen.js
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
 */

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { scale } from "../components/ResponsiveText";
import * as firebase from "firebase";
import { EvilIcons } from "@expo/vector-icons";

const ItemDetailScreen = (props) => {
  const dbconnection = firebase.firestore();
  //Getting Params
  const businessID = props.navigation.getParam("BusinessID");
  const productID = props.navigation.getParam("productID");
  const itemName = props.navigation.getParam("itemName");
  var quantity = props.navigation.getParam("quantity");
  var newQuantity = quantity;
  const hours = props.navigation.getParam("hours");
  //Firebase and User variables
  var docRef = dbconnection.collection("Products").doc(productID);
  var user = firebase.auth().currentUser;
  //Getting more params
  const image = props.navigation.getParam("image");
  const newPrice = props.navigation.getParam("newPrice");
  const usualPrice = props.navigation.getParam("usualPrice");
  const foodCountdown = props.navigation.getParam("foodCountdown");

  //How much the user will save as a percentage
  var saveAmount = 1 - newPrice / usualPrice;
  var newSaveAmount = 100 * saveAmount;
  var finalSave = Math.round(newSaveAmount);
  const [specifiedQuantity, setSpecifiedQuantity] = useState(1);
  //Using a random string as the Product ID
  var randomString = require("random-string");
  var x;

  //Setting state
  const [busName, setBusName] = useState("");
  const [busLong, setBusLong] = useState(0);
  const [busLat, setBusLat] = useState(0);
  const [busNumber, setBusNumber] = useState("");
  const [productName, setProductName] = useState("");
  const [productUsualPrice, setProductUsualPrice] = useState("");

  useEffect(() => {
    //Getting business details
    console.log(productID);
    dbconnection
      .collection("businessDetails")
      .doc(businessID)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setBusName(doc.data().name);
          setBusLong(parseFloat(doc.data().longitude));
          setBusLat(parseFloat(doc.data().latitude));
          setBusNumber(doc.data().number);
        } else {
          console.log("Nothing There");
        }
      });

    docRef.get().then(function (doc) {
      //getting product details
      if (doc.exists) {
        setProductName(doc.data().itemName);
        setProductUsualPrice(doc.data().usualPrice);
      }
    });
  }, []);
  //Increase or decrease counter
  const increase = () => {
    if (specifiedQuantity != newQuantity) {
      setSpecifiedQuantity(specifiedQuantity + 1);
    } else {
      alert("Thats all we have!");
    }
  };
  const decrease = () => {
    if (specifiedQuantity > 1) {
      setSpecifiedQuantity(specifiedQuantity - 1);
    }
  };

  const buy = () => {
    //When the user clicks buy, update the quantity and create a new order
    if (newQuantity <= 0) {
      props.navigation.navigate({ routeName: "BusinessList" });
      alert("This Product is sold out");
    } else if (newQuantity > 0) {
      x = randomString({ length: 30 });
      docRef.get().then(function (doc) {
        console.log(doc.id);
        if (doc.exists) {
          newQuantity = newQuantity - specifiedQuantity;
          var long;
          var lat;
          [(long = global.longitude)];
          [(lat = global.latitude)];

          console.log(long, lat);
          return docRef

            .update({
              quantity: newQuantity,
            })
            .then(function () {
              console.log("Document successfully updated!");
              dbconnection.collection("OrderDetails").doc(x).set({
                productID: productID,
                businessID: businessID,
                quantityOrdered: specifiedQuantity,
                pricePerItem: newPrice,
                userLongitude: long,
                userLatitude: lat,
                created: firebase.firestore.FieldValue.serverTimestamp(),
                busName: busName,
                busLong: busLong,
                busLat: busLat,
                busNumber: busNumber,
                productName: productName,
                productUsualPrice: productUsualPrice,
                userID: user.uid,
                Status: "In Progress",
              });
              //then navigate to receipt page
              props.navigation.navigate({
                routeName: "Receipt",
                params: {
                  orderID: x,
                },
              });
            })
            .catch(function (error) {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
            });
        }
      });
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.above}>
        <Text style={styles.heading}>{itemName}</Text>
        <Text style={styles.price}>€{newPrice}</Text>
        <Text style={styles.saving}>You save {finalSave}%</Text>
      </View>
      <View style={styles.image}>
        <Image
          style={{ height: "85%", width: "95%", borderRadius: 15 }}
          source={{ uri: image }}
        />
      </View>
      <View style={styles.below}>
        <View style={styles.quantity}>
          <EvilIcons name="minus" onPress={decrease} size={35} color="black" />
          <Text
            style={{
              borderBottomWidth: 1.5,
              width: 30,
              paddingBottom: 2,
              marginHorizontal: 10,
              textAlign: "center",
              fontSize: 30,
            }}
          >
            {specifiedQuantity}
          </Text>
          <EvilIcons name="plus" onPress={increase} size={35} color="black" />
        </View>
        <TouchableOpacity
          style={{
            width: "80%",
            borderWidth: 2,
            height: "30%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffc575",
          }}
          onPress={buy}
        >
          <Text style={{ fontFamily: "MonB", fontSize: scale(25) }}>Buy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
//Stylesheet for styling
const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#ffecd2",
  },
  heading: {
    fontFamily: "MonM",
    fontSize: scale(25),
    color: "#3b3b3b",
    maxWidth: "66%",
    paddingBottom: 10,
    textAlign: "center",
  },
  price: {
    fontFamily: "MonB",
    fontSize: scale(30),
    color: "#3b3b3b",
    maxWidth: "66%",
  },
  quantity: {
    flexDirection: "row",
    paddingBottom: scale(20),
  },
  saving: {
    color: "red",
    fontFamily: "MonB",
    fontSize: scale(12),
    color: "red",
    maxWidth: "66%",
  },
  above: {
    height: "25%",
    justifyContent: "center",

    width: "100%",
    alignItems: "center",
  },
  image: {
    height: "50%",
    width: "100%",
    alignItems: "center",
  },
  below: {
    height: "25%",
    width: "100%",
    alignItems: "center",
  },
});

export default ItemDetailScreen;
