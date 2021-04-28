/*
 *
 * ClassName: UserOrders.js
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
  FlatList,
  TouchableOpacity,
} from "react-native";
import { scale } from "../components/ResponsiveText";
import DropDownPicker from "react-native-dropdown-picker";

import * as firebase from "firebase";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const UserOrders = (props) => {
  const [orders, setOrders] = useState({});
  const dbconnection = firebase.firestore();
  var user = firebase.auth().currentUser;
  var Colour = "#fff";
  //Setting state for querying data
  const [showBy, setShowBy] = useState("All");
  useEffect(() => {
    dbconnection
      .collection("OrderDetails")
      .where("userID", "==", user.uid)
      .onSnapshot((querySnapshot) => {
        //creating array
        var orders = [];

        querySnapshot.forEach(function (doc) {
          //pushing every order to the array
          orders.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        //Sorting order by time
        orders = orders.sort((a, b) => b.created.toDate() - a.created.toDate());
        //Pushing array to object
        setOrders(orders);
      });
  }, []);

  const renderCategory = (itemData) => {
    var FinalDate;
    var Time;
    //Getting firebase time as date
    var newCreated = itemData.item.created.toDate();
    //getting firebase minutes
    var mins = newCreated.getMinutes();
    //Turning single digit to double digit
    if (newCreated.getMinutes() < 10) {
      mins = "0" + newCreated.getMinutes();
    }
    //Getting the full date
    FinalDate =
      newCreated.getDate() +
      "/" +
      (newCreated.getMonth() + 1) +
      "/" +
      newCreated.getFullYear();
    //Getting full time
    Time = newCreated.getHours() + ":" + mins;
    //Setting the colour for the item
    if (itemData.item.Status == "In Progress") {
      Colour = "#ffc575";
    } else if (itemData.item.Status == "Completed") {
      Colour = "#d3f8d3";
    } else if (itemData.item.Status == "Cancelled") {
      Colour = "#ff6961";
    }
    //Only show if the status is the one selected
    if (itemData.item.Status == showBy || showBy == "All") {
      return (
        <TouchableOpacity
          style={[styles.Categories, { backgroundColor: Colour }]}
          onPress={() => {
            props.navigation.navigate({
              //Navigating to receipt page and bringing over params
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
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff2e0", alignItems: "center" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 60,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: scale(12) }}>Sort By: </Text>
        <DropDownPicker
          items={[
            {
              label: "All",
              value: "All",
              icon: () => (
                <MaterialCommunityIcons
                  name="all-inclusive"
                  size={24}
                  color="black"
                />
              ),
            },
            {
              label: "In Progress",
              value: "In Progress",
              icon: () => (
                <MaterialCommunityIcons
                  name="progress-alert"
                  size={24}
                  color="black"
                />
              ),
            },
            {
              label: "Completed",
              value: "Completed",
              icon: () => (
                <MaterialCommunityIcons
                  name="progress-check"
                  size={24}
                  color="black"
                />
              ),
            },
            {
              label: "Cancelled",
              value: "Cancelled",
              icon: () => (
                <MaterialCommunityIcons
                  name="progress-close"
                  size={24}
                  color="black"
                />
              ),
            },
          ]}
          defaultValue={"All"}
          containerStyle={{ height: 40, width: "50%" }}
          style={{ backgroundColor: "#fafafa" }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={(item) => setShowBy(item.value)}
        />
      </View>
      <FlatList
        style={{ alignContent: "center", paddingTop: 20 }}
        data={orders}
        renderItem={renderCategory}
      />
    </View>
  );
};
//Styling
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
