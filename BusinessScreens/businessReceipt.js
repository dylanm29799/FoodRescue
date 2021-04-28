/*
 *
 * ClassName: businessReceipt.js
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
 * @reference : https://www.npmjs.com/package/react-native-dialog
 *
 */
import React, { useEffect, useState, componentDidMount } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { scale } from "../components/ResponsiveText";
import Colour from "../constants/Colour";
import * as firebase from "firebase";
import MapView, { Marker } from "react-native-maps";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Dialog from "react-native-dialog";

const businessReceipt = (props) => {
  var orderID;
  //Connection to firebase
  const dbconnection = firebase.firestore();
  //Getting order param
  try {
    orderID = props.navigation.getParam("orderID");
  } catch (err) {
    console.log(err);
  }
  //Setting state
  const [businessID, setBusinessID] = useState("");
  const [created, setCreated] = useState(new Date());
  const [price, setPrice] = useState(0);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);
  const [userID, setUserID] = useState("Standard");
  //Business and Product state
  const [busName, setBusName] = useState("");
  const [busLong, setBusLong] = useState(0);
  const [busLat, setBusLat] = useState(0);
  const [busNumber, setBusNumber] = useState("");
  const [ID, setID] = useState("");
  const [productName, setProductName] = useState("");
  const [productUsualPrice, setProductUsualPrice] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [newStatus, setStatus] = useState("");
  const [name, setName] = useState("");
  var newDate = new Date();
  const [time, setTime] = useState(0);
  const [confirm, setConfirm] = useState(false);
  useEffect(() => {
    //Getting order details and setting the state
    dbconnection
      .collection("OrderDetails")
      .doc(orderID)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setBusinessID(doc.data().businessID);
          setID(doc.id);
          setCreated(doc.data().created.toDate());
          setPrice(parseInt(doc.data().pricePerItem));
          setProductId(doc.data().productID);
          setQuantity(doc.data().quantityOrdered);
          setLong(doc.data().userLongitude);
          setLat(doc.data().userLatitude);
          setBusName(doc.data().busName);
          setBusLong(doc.data().busLong);
          setBusLat(doc.data().busLat);
          setBusNumber(doc.data().busNumber);
          setProductName(doc.data().productName);
          setProductUsualPrice(parseInt(doc.data().productUsualPrice));
          setStatus(doc.data().Status);
          setUserID(doc.data().userID);
        } else {
          console.log("Nothing There");
        }
      })
      .then(function () {
        //Setting single digit to double digits
        var mins = created.getMinutes();
        if (created.getMinutes() < 10) {
          mins = "0" + created.getMinutes();
        }
        //getting the date
        setFinalDate(
          created.getDate() +
            "/" +
            (created.getMonth() + 1) +
            "/" +
            created.getFullYear()
        );
        //Getting time
        setTime(created.getHours() + ":" + mins);
        console.log(time);
      });
    //Getting user details
    dbconnection
      .collection("userDetails")
      .doc(userID)
      .get()
      .then((doc) => {
        if (doc.exists) {
          //Setting the name of the user
          setName(doc.data().firstName + " " + doc.data().lastName);
        }
      });
  }, [userID]);

  const submit = (userClick) => {
    //Update status of order
    dbconnection
      .collection("OrderDetails")
      .doc(ID)
      .update({
        Status: userClick,
      })
      .then(() => {
        console.log("Document successfully updated!");
        //navigate to the BusinessManage page
        props.navigation.navigate({ routeName: "BusinessManage" });
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };

  const handleCancel = () => {
    //Handle cancel of the dialog
    setConfirm(false);
    submit("Cancelled");
  };

  const handleComplete = () => {
    //Handle complete of the dialog
    setConfirm(false);
    submit("Completed");
  };
  const handleProgress = () => {
    //Handle progress of the dialog
    setConfirm(false);
    submit("In Progress");
  };
  //Total order price
  var totalPrice = parseInt(quantity) * parseInt(price);
  //Haversine for distance between two points
  const haversine = require("haversine");
  //user location
  var userLoc = { longitude: long, latitude: lat };
  //business location
  var BusinessLocation = { longitude: busLong, latitude: busLat };
  //getting distance
  const distance = haversine(userLoc, BusinessLocation).toFixed(2);
  var Colour = "#fff";
  //setting colour depending on status
  if (newStatus == "In Progress") {
    Colour = "#ffc575";
  } else if (newStatus == "Completed") {
    Colour = "#d3f8d3";
  } else if (newStatus == "Cancelled") {
    Colour = "#ff6961";
  }
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
          Order has been placed by {name}
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
            The order ID is {ID}
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
          {name} was {distance}km away when they ordered
        </Text>

        <View style={[styles.order, { backgroundColor: Colour }]}>
          <Text
            style={{
              fontFamily: "MonB",
              fontSize: scale(17),
              textAlign: "center",
            }}
          >
            Order Details
          </Text>
          <View
            style={{
              justifyContent: "space-between",
              marginBottom: scale(10),
              flexDirection: "row",
              marginTop: scale(10),
            }}
          >
            <Text style={styles.right}>
              {quantity}x {productName}:
            </Text>
            <Text style={styles.right}>€{totalPrice}</Text>
          </View>
          <View
            style={{ alignItems: "center", marginBottom: scale(10) }}
          ></View>

          <View style={{ alignItems: "center", marginBottom: scale(10) }}>
            <Text style={styles.right}>
              {finalDate.toString()} {time}
            </Text>
          </View>
          <View style={{ alignItems: "center", justifyContent: "flex-end" }}>
            <Text style={styles.right}>Order {newStatus}</Text>
          </View>

          <TouchableOpacity
            onPress={() => setConfirm(true)}
            style={{
              width: "50%",
              alignSelf: "center",
              borderColor: "white",
              borderWidth: 1,
              borderRadius: 20,
              width: "50%",
              marginTop: 30,
              backgroundColor: "#6B6B6B",
            }}
          >
            <Text
              style={{
                fontSize: scale(13),
                fontFamily: "MonM",
                textAlign: "center",
                color: "white",
              }}
            >
              CHANGE STATUS?
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          {/* Change the status of the order*/}
          <Dialog.Container
            style={{ textAlign: "center", alignItems: "center" }}
            visible={confirm}
          >
            <Dialog.Title
              style={{ fontSize: 20, fontFamily: "MonM", textAlign: "center" }}
            >
              Update the status of this order
            </Dialog.Title>
            <Dialog.Description
              style={{ fontSize: 15, fontFamily: "MonM", textAlign: "center" }}
            >
              Please Click one of the options below
            </Dialog.Description>
            <View
              style={{ justifyContent: "space-around", flexDirection: "row" }}
            >
              <Dialog.Button
                style={styles.button}
                label="Cancelled"
                onPress={handleCancel}
              />
              <Dialog.Button
                style={styles.button}
                label="In Progress"
                onPress={handleProgress}
              />
              <Dialog.Button
                style={styles.button}
                label="Completed"
                onPress={handleComplete}
              />
            </View>
          </Dialog.Container>
        </View>
      </ScrollView>
    </View>
  );
};
//Stylesheet for ordering
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

    marginBottom: "5%",
  },

  order: {
    height: "30%",
    width: "80%",
    backgroundColor: "#fff",
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

  button: {
    fontFamily: "MonL",
    fontSize: scale(16),
  },
});

export default businessReceipt;
