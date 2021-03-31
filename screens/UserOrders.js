import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { scale } from "../components/ResponsiveText";

import Colour from "../constants/Colour";
import * as firebase from "firebase";
import MapView, { Marker } from "react-native-maps";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { concat } from "react-native-reanimated";

const UserOrders = (props) => {
  const [orders, setOrders] = useState({});
  const dbconnection = firebase.firestore();
  var user = firebase.auth().currentUser;
  var Colour = "#fff";
  useEffect(() => {
    console.log(user.uid);
    dbconnection
      .collection("OrderDetails")
      .where("userID", "==", user.uid)
      .onSnapshot((querySnapshot) => {
        var orders = [];

        querySnapshot.forEach(function (doc) {
          orders.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        orders.sort(function (a, b) {
          return new Date(b.created.toDate()) - new Date(a.created.toDate());
        });

        console.log("Orders", orders);
        setOrders(orders);
      });
  }, []);

  const renderCategory = (itemData) => {
    var FinalDate;
    var Time;

    var newCreated = itemData.item.created.toDate();
    var mins = newCreated.getMinutes();
    if (newCreated.getMinutes() < 10) {
      mins = "0" + newCreated.getMinutes();
    }
    FinalDate =
      newCreated.getDate() +
      "/" +
      (newCreated.getMonth() + 1) +
      "/" +
      newCreated.getFullYear();

    Time = newCreated.getHours() + ":" + mins;

    if (itemData.item.Status == "In Progress") {
      Colour = "#ffc575";
    } else if (itemData.item.Status == "Completed") {
      Colour = "#d3f8d3";
    }

    return (
      <TouchableOpacity
        style={[styles.Categories, { backgroundColor: Colour }]}
        onPress={() => {
          props.navigation.navigate({
            routeName: "Receipt",
            params: {
              orderID: itemData.item.key,
            },
          });
        }}
      >
        <Text style={styles.text}>
          {itemData.item.quantityOrdered}x {itemData.item.productName} from{" "}
          {itemData.item.busName}
        </Text>

        <Text style={styles.text}>
          Time of order: {FinalDate.toString()} {Time}
        </Text>
        <Text style={styles.text}>Order Status: {itemData.item.Status}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff2e0", alignItems: "center" }}>
      <FlatList
        style={{ alignContent: "center", paddingTop: 80 }}
        data={orders}
        renderItem={renderCategory}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Categories: {
    height: scale(100),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    width: scale(320),
    marginBottom: "3%",
    justifyContent: "space-evenly",
  },
  text: {
    fontFamily: "MonM",
    fontSize: 22,
  },
});

export default UserOrders;
