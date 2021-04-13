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
import DropDownPicker from "react-native-dropdown-picker";
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
  const [showBy, setShowBy] = useState("All");
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
    } else if (itemData.item.Status == "Cancelled") {
      Colour = "#ff6961";
    }
    if (itemData.item.Status == showBy || showBy == "All") {
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
