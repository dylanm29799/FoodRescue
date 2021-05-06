/*
 *
 * ComponentName: BusinessNormalProduct.js
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
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { scale } from "../components/ResponsiveText";

import * as firebase from "firebase";
import { withNavigation } from "react-navigation";

const BusinessNormalProduct = (props) => {
  //Setting product state
  const [product, setProduct] = useState([]);
  //getting Firebase and User ID
  const dbconnection = firebase.firestore();
  var user = firebase.auth().currentUser;

  // User is signed in.
  useEffect(() => {
    //get products that are related to the user and that aren't food countdown products
    dbconnection
      .collection("Products")
      .where("businessID", "==", user.uid)
      .where("foodCountdown", "==", "No")
      .onSnapshot((querySnapshot) => {
        //create array
        const product = [];
        //push each product into the array
        querySnapshot.forEach((doc) => {
          product.push({
            ...doc.data(),
            key: doc.id,
          });
          console.log(product);
        });
        //set the array in our object
        setProduct(product);
      });
  }, []);

  const renderCategory = (itemData) => {
    return (
      <TouchableOpacity
        style={styles.Categories}
        onPress={() => {
          props.navigation.navigate({
            //Navigate to the business edit screen with the item key as a param
            routeName: "BusinessEdit",
            params: {
              productKey: itemData.item.key,
            },
          });
        }}
      >
        <View style={styles.item}>
          <Image
            style={{ height: "75%", width: "100%", borderRadius: 15 }}
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
            <Text style={styles.text4}> €{itemData.item.newPrice}</Text>
          </View>

          <View style={styles.heading}>
            <Text numberOfLines={1} style={styles.text1}>
              {itemData.item.itemName}
            </Text>
            <Text style={styles.text2}>
              {itemData.item.quantity} Items left!
            </Text>
          </View>
        </View>
        <Text style={styles.text3}>Price was €{itemData.item.usualPrice}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ alignItems: "center", flex: 1, width: "100%" }}>
      <Text style={styles.sortName}>Ordinary Products</Text>

      <FlatList
        style={{ flex: 1, width: "95%" }}
        data={product}
        renderItem={renderCategory}
        keyExtractor={(item) => item.docId}
        horizontal={true}
      />
    </View>
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
    fontSize: scale(12),
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
  },
  sortName: {
    fontSize: scale(20),
    textAlign: "center",
    fontFamily: "MonM",
    paddingVertical: scale(10),
  },
});
//WithNavigation to navigate in a component
export default withNavigation(BusinessNormalProduct);
