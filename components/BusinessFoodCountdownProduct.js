/*
 *
 * ComponentName: BusinessFoodCountdownProduct.js
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
 * @reference : https://math.stackexchange.com/questions/1667064/formula-to-get-percentage-from-a-target-start-and-current-numbers
 *
 */
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

import { withNavigation } from "react-navigation";
import * as firebase from "firebase";

const BusinessFoodCountdownProduct = (props) => {
  const [foodCountdown, setFoodCountdown] = useState([]);
  //Firebase and user id link
  const dbconnection = firebase.firestore();
  var user = firebase.auth().currentUser;
  //Todays date
  var today = new Date();

  useEffect(() => {
    //Get products from the user id and that are food countdown
    dbconnection
      .collection("Products")
      .where("businessID", "==", user.uid)
      .where("foodCountdown", "==", "Yes")
      .onSnapshot((querySnapshot) => {
        //Create array
        const foodCountdown = [];
        //Put each product into the array
        querySnapshot.forEach((doc) => {
          foodCountdown.push({
            ...doc.data(),
            key: doc.data().docId,
          });
          console.log(foodCountdown);
        });
        //Put the array into the foodCountdown object
        setFoodCountdown(foodCountdown);
      });
  }, []);

  const renderFoodCategory = (itemData) => {
    //Getting the date from the firebase timestamp
    var myDate = new Date(itemData.item.created * 1000);
    //Getting the date from the firebase timestamp
    var start = new Date(itemData.item.created * 1000);
    //Getting the date hours and adding on the amount of hours specified
    var finishDate = new Date(
      myDate.setHours(myDate.getHours() + parseInt(itemData.item.hours))
    );
    //Getting the date as a string
    var dateAsString = today.toDateString().substring(4, 10);
    //Getting the firebase date as a string
    var startDateAsString = start.toDateString().substring(4, 10);

    //Get todays hours and minutes
    var todayAsMin = today.getHours() * 60 + today.getMinutes();
    //Get the end of food countdown hours and minutes
    var endAsMin = finishDate.getHours() * 60 + finishDate.getMinutes();
    //Get the start of food countdown hours and minutes
    var startAsMin = start.getHours() * 60 + start.getMinutes();

    //Getting current progress and total interval as per https://math.stackexchange.com/questions/1667064/formula-to-get-percentage-from-a-target-start-and-current-numbers
    var Current_Start = todayAsMin - startAsMin;
    var total_start = endAsMin - startAsMin;
    if (total_start === 0) {
      total_start = total_start + 60;
    }
    //Final percentage of time
    var hourlyPrice = Current_Start / total_start;
    //Hours remaining on food rescue
    var hoursRemaining = finishDate.getHours() - today.getHours();
    //Minutes remaining on food rescue
    var minutesRemaining = finishDate.getMinutes() - today.getMinutes();
    //Get minutes remaining - Went negative if lower than 45 so changed it to always be positive
    if (hoursRemaining * 60 + minutesRemaining > itemData.item.hours * 60) {
      hoursRemaining -= 1;
    }

    if (minutesRemaining < 0) {
      minutesRemaining = 60 + minutesRemaining;
      hoursRemaining -= 1;
    }
    if (hoursRemaining < 0) {
      hoursRemaining += 1;
    }
    //Getting the final price of the product
    var discount = itemData.item.usualPrice - itemData.item.newPrice;
    var newDiscount = discount * hourlyPrice;
    var finalPrice = itemData.item.usualPrice - newDiscount;

    return (
      <TouchableOpacity
        style={styles.Categories}
        onPress={() => {
          props.navigation.navigate({
            //navigate to business edit screen with item key as a param
            routeName: "BusinessEdit",
            params: {
              productKey: itemData.item.key,
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
              width: scale(50),
              height: scale(40),
              position: "absolute",
              backgroundColor: "white",
              alignItems: "center",
              borderRadius: 10,
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
//Stylesheet for styling
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
//With navigation used so that our component can navigate with props
export default withNavigation(BusinessFoodCountdownProduct);
