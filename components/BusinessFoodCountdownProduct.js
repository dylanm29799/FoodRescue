import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { scale } from "./ResponsiveText";
import Colour from "../constants/Colour";
import { withNavigation } from "react-navigation";
import * as firebase from "firebase";

const BusinessFoodCountdownProduct = (props) => {
  const [foodCountdown, setFoodCountdown] = useState([]);

  const dbconnection = firebase.firestore();
  var user = firebase.auth().currentUser;
  var today = new Date();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  useEffect(() => {
    dbconnection
      .collection("Products")
      .where("businessID", "==", user.uid)
      .where("foodCountdown", "==", "Yes")
      .onSnapshot((querySnapshot) => {
        const foodCountdown = [];

        querySnapshot.forEach((doc) => {
          foodCountdown.push({
            ...doc.data(),
            key: doc.data().docId,
          });
          console.log(foodCountdown);
        });

        setFoodCountdown(foodCountdown);
      });
  }, []);

  const renderFoodCategory = (itemData) => {
    var myDate = new Date(itemData.item.created * 1000);

    var start = new Date(itemData.item.created * 1000);
    var finishDate = new Date(
      myDate.setHours(myDate.getHours() + parseInt(itemData.item.hours))
    );

    var dateAsString = today.toDateString().substring(4, 10);
    var startDateAsString = start.toDateString().substring(4, 10);

    var todayAsMin = today.getHours() * 60 + today.getMinutes();
    var endAsMin = finishDate.getHours() * 60 + finishDate.getMinutes();
    var startAsMin = start.getHours() * 60 + start.getMinutes() + 60;

    //https://math.stackexchange.com/questions/1667064/formula-to-get-percentage-from-a-target-start-and-current-numbers
    var Current_Start = todayAsMin - startAsMin;
    var total_start = endAsMin - startAsMin;
    var hourlyPrice = Current_Start / total_start;

    var hoursRemaining = finishDate.getHours() + 1 - today.getHours();
    var minutesRemaining = finishDate.getMinutes() - today.getMinutes();
    if (minutesRemaining < 0) {
      minutesRemaining = 60 + minutesRemaining;
    }

    var discount = itemData.item.usualPrice - itemData.item.newPrice;
    var newDiscount = discount * hourlyPrice;
    var finalPrice = itemData.item.usualPrice - newDiscount;
    console.log(
      discount,
      newDiscount,
      finalPrice,
      hourlyPrice,
      itemData.item.itemName
    );
    if (
      (hourlyPrice < 1) &
      (itemData.item.quantity > 0) &
      (startDateAsString == dateAsString)
    ) {
      return (
        <TouchableOpacity
          style={styles.Categories}
          onPress={() => {
            props.navigation.navigate({
              routeName: "ItemDetail",
              params: {
                BusinessID: businessName,
                productID: itemData.item.key,
                image: itemData.item.image,
                itemName: itemData.item.itemName,
                usualPrice: itemData.item.usualPrice,
                newPrice: finalPrice.toFixed(2),
                quantity: itemData.item.quantity,
                hours: itemData.item.hours,
                foodCountdown: itemData.item.foodCountdown,
              },
            });
          }}
        >
          <View style={styles.item}>
            <Image
              style={{
                height: "75%",
                width: "100%",
                borderRadius: 15,
                borderColor: "rgba(154, 18, 179, 1)",
              }}
              source={{ uri: itemData.item.image }}
            />
            <View
              style={{
                width: scale(40),
                height: scale(40),
                position: "absolute",
                backgroundColor: "white",
                alignItems: "center",
                borderRadius: 30,
                borderWidth: 2,
                borderColor: "rgba(154, 18, 179, 1)",
                justifyContent: "center",
                marginTop: scale(17),
                marginLeft: scale(12),
              }}
            >
              <Text style={styles.text4}>€{finalPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.heading}>
              <Text numberOfLines={1} style={styles.text1}>
                {itemData.item.itemName}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.text2}>
                {itemData.item.quantity} <Text>Items left!</Text>
              </Text>
              <Text
                style={{
                  fontSize: scale(10),
                  textAlign: "right",
                  color: "black",
                  fontFamily: "MonM",
                }}
              >
                {hoursRemaining} hours and{"\n"} {minutesRemaining} mins left
              </Text>
            </View>
          </View>

          <Text style={styles.text3}>
            Starting price was €{itemData.item.usualPrice}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <SafeAreaView
      style={{
        alignItems: "center",
        flex: 1,
      }}
    >
      <Text style={styles.sortName}>Food Countdown</Text>
      <FlatList
        style={{ flex: 1, width: "95%", alignContent: "center" }}
        renderItem={renderFoodCategory}
        data={foodCountdown}
        horizontal={true}
        keyExtractor={(itemData) => itemData.docId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    height: scale(250),
    paddingHorizontal: scale(10),
    paddingTop: scale(15),
    width: "100%",
    marginBottom: scale(15),
    borderRadius: 15,
  },
  heading: {},
  text1: {
    fontSize: scale(17),
    fontFamily: "MonB",
    width: "100%",
    overflow: "scroll",
    paddingLeft: scale(5),
    paddingTop: 10,
    color: "#3b3b3b",
  },
  text2: {
    paddingRight: "5%",
    paddingLeft: scale(5),
    fontSize: scale(11),
    fontFamily: "MonM",
    color: "black",
  },

  text3: {
    fontSize: scale(8),
    alignSelf: "center",
    fontFamily: "MonM",
    paddingRight: 5,
    color: "#3b3b3b",
    marginTop: scale(-20),
    paddingBottom: scale(10),
  },

  text4: {
    fontSize: scale(13),
    fontFamily: "MonM",
    color: "rgba(154, 18, 179, 1)",
    paddingRight: 5,
  },
  Categories: {
    flexDirection: "column",
    backgroundColor: "#ffc87c",
    flex: 1,
    borderWidth: 1,
    borderRadius: 15,
    marginHorizontal: 0.1,
    borderColor: "white",
    marginHorizontal: 5,
    minWidth: scale(180),
    maxWidth: scale(180),
    alignSelf: "center",
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
  sortName: {
    fontSize: scale(20),
    textAlign: "center",
    fontFamily: "MonM",
    paddingVertical: scale(10),
  },
});

export default withNavigation(BusinessFoodCountdownProduct);
