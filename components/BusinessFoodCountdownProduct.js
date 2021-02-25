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
    return (
      <TouchableOpacity
        style={styles.Categories}
        onPress={() => {
          props.navigation.navigate({
            routeName: "BusinessEdit",
            params: {
              productName: itemData.item.itemName,
            },
          });
        }}
      >
        <View style={styles.item}>
          <Image
            style={{ height: "75%", width: "100%", borderRadius: 22 }}
            source={{ uri: itemData.item.image }}
          />
          <View>
            <View style={styles.heading}>
              <Text style={styles.text1}>{itemData.item.itemName}</Text>

              <Text style={styles.text2}>
                <Text>Quantity:</Text> {itemData.item.quantity}
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View
                style={{
                  paddingLeft: "5%",
                  flex: 2,
                  fontFamily: "OpenSans",
                }}
              >
                <Text style={styles.text4}>
                  €{itemData.item.newPrice}
                  <Text style={styles.text3}>€{itemData.item.usualPrice}</Text>
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    paddingRight: "9%",
                    fontSize: scale(13),
                    textAlign: "right",
                  }}
                >
                  {itemData.item.hours} Hours
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView
      style={{
        alignItems: "center",
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <Text style={styles.sortName}>Food Countdown</Text>
      <FlatList
        style={{ width: "90%", flex: 1 }}
        renderItem={renderFoodCategory}
        data={foodCountdown}
        numColumns={2}
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
  },

  text1: {
    fontSize: scale(13),
    fontFamily: "OpenSans",
    width: "90%",
    overflow: "scroll",
    paddingLeft: 20,
    paddingTop: 10,
  },
  text2: {
    textAlign: "right",
    paddingRight: "5%",
    fontSize: scale(15),
    fontFamily: "OpenSans",
  },

  text3: {
    fontSize: scale(10),
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    fontFamily: "OpenSans",
    borderRightColor: "#808080",
    borderRightWidth: 1,
    paddingRight: 5,
  },

  text4: {
    fontSize: scale(10),
    fontFamily: "OpenSans",
    borderRightWidth: 1,
    paddingRight: 5,
  },
  Categories: {
    flexDirection: "column",
    backgroundColor: "#fffaf5",
    flex: 1,
    borderWidth: 0.5,
    borderRadius: 15,
    marginHorizontal: 0.1,
    borderColor: "#808080",
  },
  sortName: {
    fontSize: scale(20),
    textAlign: "center",
    fontFamily: "OpenSans",
    paddingVertical: scale(10),
  },
});

export default withNavigation(BusinessFoodCountdownProduct);
