/*
 *
 * ClassName: Receipt.js
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
import { View, Text, StyleSheet } from "react-native";
import { scale } from "../components/ResponsiveText";
import Colour from "../constants/Colour";
import * as firebase from "firebase";
import MapView, { Marker } from "react-native-maps";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const Receipt = (props) => {
  //Getting order param
  var orderID = "";

  //User and firebase details
  var user = firebase.auth().currentUser;
  const dbconnection = firebase.firestore();
  //Setting state
  const [businessID, setBusinessID] = useState("");
  const [created, setCreated] = useState(new Date());
  const [price, setPrice] = useState(0);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);
  const [busName, setBusName] = useState("");
  const [busLong, setBusLong] = useState(0);
  const [busLat, setBusLat] = useState(0);
  const [busNumber, setBusNumber] = useState("");
  const [ID, setID] = useState("");
  const [productName, setProductName] = useState("");
  const [productUsualPrice, setProductUsualPrice] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [Status, setStatus] = useState("");
  const [time, setTime] = useState(0);

  useEffect(() => {
    //Getting order details
    orderID = props.navigation.getParam("orderID");
    dbconnection
      .collection("OrderDetails")
      .doc(orderID)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setBusinessID(doc.data().businessID);
          setID(doc.id);
          setCreated(doc.data().created.toDate());
          setPrice(parseFloat(doc.data().pricePerItem));
          setProductId(doc.data().productID);
          setQuantity(doc.data().quantityOrdered);
          setLong(doc.data().userLongitude);
          setLat(doc.data().userLatitude);
          setBusName(doc.data().busName);
          setBusLong(doc.data().busLong);
          setBusLat(doc.data().busLat);
          setBusNumber(doc.data().busNumber);
          setProductName(doc.data().productName);
          setProductUsualPrice(parseFloat(doc.data().productUsualPrice));
          setStatus(doc.data().Status);
        } else {
          console.log("Nothing There");
        }
      })
      .then(function () {
        //Changing timestamp to readable time
        var mins = created.getMinutes();
        if (created.getMinutes() < 10) {
          mins = "0" + created.getMinutes();
        }
        setFinalDate(
          created.getDate() +
            "/" +
            (created.getMonth() + 1) +
            "/" +
            created.getFullYear()
        );

        setTime(created.getHours() + ":" + mins);
        console.log(time);
      });
  }, []);
  //Getting how much the user saved
  var saveAmount = 1 - price / productUsualPrice;
  var newSaveAmount = 100 * saveAmount;
  var finalSave = Math.round(newSaveAmount);
  var totalPrice = parseFloat(quantity) * parseFloat(price);
  return (
    <View style={{ flex: 1, backgroundColor: "#fff2e0" }}>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          height: "100%",
        }}
        horizontal={false}
      >
        <Text
          style={{
            fontFamily: "MonM",
            fontSize: scale(20),
            textAlign: "center",
            paddingTop: "15%",
            paddingBottom: "3%",
            width: "95%",
            borderBottomWidth: 1,
          }}
        >
          Thank you for your order
        </Text>

        <View
          style={{
            backgroundColor: "#d3f8d3",
            width: "90%",
            height: "10%",
            justifyContent: "center",
            marginBottom: "5%",
            marginTop: "5%",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: scale(15),
              fontFamily: "MonM",
              marginBottom: 10,
            }}
          >
            ORDER CONFIRMATION
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: scale(10),
              fontFamily: "MonL",
            }}
          >
            Your order ID is {ID}
          </Text>
        </View>

        <MapView
          style={styles.Map}
          region={{
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}
        >
          <Marker
            coordinate={{ latitude: lat, longitude: long }}
            title={"You"}
            description={"Your Location"}
          >
            <MaterialCommunityIcons
              name="home-map-marker"
              size={20}
              color={Colour.primaryColour}
            />
          </Marker>
          <Marker
            coordinate={{
              latitude: busLat,
              longitude: busLong,
            }}
            title={busName}
          >
            <Feather name="map-pin" size={40} color="green" />
          </Marker>
        </MapView>
        <Text style={styles.heading}>
          Your order at {busName} has been confirmed!
        </Text>
        <View style={styles.order}>
          <View
            style={{
              alignItems: "center",
              marginBottom: scale(10),
            }}
          >
            <Text style={styles.left}>WHAT YOU BOUGHT:</Text>
            <Text style={styles.right}>
              {quantity}x {productName}
            </Text>
          </View>
          <View style={{ alignItems: "center", marginBottom: scale(10) }}>
            <Text style={styles.left}>TOTAL PRICE:</Text>
            <Text style={styles.right}>€{totalPrice}</Text>
          </View>
          <View style={{ alignItems: "center", marginBottom: scale(10) }}>
            <Text style={styles.left}>YOUR SAVINGS WITH US:</Text>
            <Text style={styles.right}>{finalSave}%</Text>
          </View>
          <View style={{ alignItems: "center", marginBottom: scale(10) }}>
            <Text style={styles.left}>TIME OF PURCHASE:</Text>
            <Text style={styles.right}>
              {finalDate.toString()} {time}
            </Text>
          </View>
          <View style={{ alignItems: "center", justifyContent: "flex-end" }}>
            <Text style={styles.left}>STATUS:</Text>
            <Text style={styles.right}>{Status}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
//Stylesheet for styling
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  Map: {
    height: "25%",
    width: "100%",
  },

  heading: {
    fontFamily: "MonL",
    fontSize: scale(18),
    textAlign: "center",
    paddingTop: "5%",
    borderBottomWidth: 1,
    marginBottom: "5%",
  },

  order: {
    width: "75%",
    justifyContent: "space-evenly",
    backgroundColor: "#d3f8d3",
    padding: 60,
  },
  left: {
    fontFamily: "MonL",
    fontSize: scale(14),
  },
  right: {
    fontFamily: "MonM",
    fontSize: scale(16),
  },
});

export default Receipt;
