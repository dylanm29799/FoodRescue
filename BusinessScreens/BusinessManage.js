/*
 *
 * ClassName: BusinessManage.js
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
 * @reference : https://www.npmjs.com/package/react-native-dropdown-picker
 *
 *
 */
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { scale } from "../components/ResponsiveText";
import DropDownPicker from "react-native-dropdown-picker";

import * as firebase from "firebase";

import { MaterialCommunityIcons } from "@expo/vector-icons";
const BusinessManage = (props) => {
  //Setting state
  const [orders, setOrders] = useState({});
  const [productImage, setProductImage] = useState(
    "https://www.transparenttextures.com/patterns/debut-light.png"
  );
  const [userName, setUserName] = useState(" ");
  const [userNumber, setUserNumber] = useState(" ");
  const dbconnection = firebase.firestore();
  //Setting state of querying
  const [showBy, setShowBy] = useState("All");

  console.log(showBy);
  var user = firebase.auth().currentUser;
  //Setting the initial colour
  var Colour = "#fff";
  useEffect(() => {
    //Getting all user orders
    console.log(user.uid);
    dbconnection
      .collection("OrderDetails")
      .where("businessID", "==", user.uid)
      .onSnapshot((querySnapshot) => {
        //Creating array
        var orders = [];
        //Pushing each order to the array
        querySnapshot.forEach(function (doc) {
          orders.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        //Sorting array by time and date
        orders.sort(function (a, b) {
          return new Date(a.created.toDate()) - new Date(b.created.toDate());
        });
        //Pushing array to an object
        setOrders(orders);
      });
  }, []);
  //Rendering the order details
  const renderCategory = (itemData) => {
    var FinalDate;
    var Time;
    //Getting the time of the order
    var newCreated = itemData.item.created.toDate();
    var mins = newCreated.getMinutes();
    //Making minutes double digits if below 10 e.g 08 instead of 8
    if (newCreated.getMinutes() < 10) {
      mins = "0" + newCreated.getMinutes();
    }
    //Getting the date and time as user readable figures
    FinalDate = newCreated.getDate() + "/" + (newCreated.getMonth() + 1);
    Time = newCreated.getHours() + ":" + mins;
    //Getting image of product and first and last name of user
    dbconnection
      .collection("Products")
      .doc(itemData.item.productID)
      .get()
      .then((doc) => {
        setProductImage(doc.data().image);
      });
    dbconnection
      .collection("userDetails")
      .doc(itemData.item.userID)
      .get()
      .then((doc) => {
        setUserName(doc.data().firstName + " " + doc.data().lastName);
        setUserNumber(doc.data().number);
      });
    //Setting the colour of the order
    if (itemData.item.Status == "In Progress") {
      Colour = "#ffc575";
    } else if (itemData.item.Status == "Completed") {
      Colour = "#d3f8d3";
    } else if (itemData.item.Status == "Cancelled") {
      Colour = "#ff6961";
    }
    //Displaying only the correct orders
    if (itemData.item.Status == showBy || showBy == "All") {
      return (
        <TouchableOpacity
          style={[styles.Categories, { backgroundColor: Colour }]}
          onPress={() => {
            props.navigation.navigate({
              //Navigating the the receipt page and passing the param of the order ID
              routeName: "businessReceipt",
              params: {
                orderID: itemData.item.key,
              },
            });
          }}
        >
          <View
            style={{
              flexDirection: "row",
              height: "100%",
              width: "100%",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: "80%",
                width: "50%",
                justifyContent: "center",
                alignSelf: "center",
                paddingLeft: scale(10),
                borderRadius: 10,
              }}
            >
              <Image
                source={{ uri: productImage }}
                style={{
                  height: "100%",
                  width: "100%",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.8,
                  borderRadius: 30,
                  shadowRadius: 2,
                }}
                resizeMode="stretch"
              />
            </View>
            <View style={{ alignItems: "center", width: "50%" }}>
              <Text style={styles.text2}>{itemData.item.Status}</Text>
              <Text style={styles.text2}>
                {FinalDate.toString()} {Time}
              </Text>
              <Text></Text>
              <Text style={styles.text}>{userName}</Text>

              <Text style={styles.text}>{userNumber}</Text>
              <Text style={styles.text}>
                {itemData.item.quantityOrdered} ordered
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 20,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: scale(12) }}>Sort By: </Text>
        <DropDownPicker
          //Dropdown picker allows the user to query the orders by status
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
//Stylesheet for styling
const styles = StyleSheet.create({
  Categories: {
    height: scale(145),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    width: scale(330),
    marginBottom: "3%",
    justifyContent: "space-evenly",
    borderRadius: 5,
  },
  text: {
    fontFamily: "MonL",
    fontSize: scale(16),
  },
  text2: {
    fontFamily: "MonM",
    fontSize: scale(18),
  },
});

export default BusinessManage;
