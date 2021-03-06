/*
 *
 * ClassName: CartScreen.js
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

import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { scale } from "../components/ResponsiveText";
import Colour from "../constants/Colour";

const CartScreen = (props) => {
  //Initializing variables
  var title = "";
  var quantity = "";
  var initialPrice = "";
  var price = "";

  //Getting the savings between the new price and usual price + Getting total quantity
  const newPrice = price * quantity;
  const newInitial = initialPrice * quantity;
  const savings = newInitial - newPrice;
  const newSavings = Math.round(savings * 100) / 100;
  //GettingParams
  try {
    title = props.navigation.getParam("Title");
    quantity = props.navigation.getParam("quantity");
    initialPrice = props.navigation.getParam("initialPrice");
    price = props.navigation.getParam("price");
  } catch (error) {
    console.log(error);
  }

  return (
    <View style={styles.screen}>
      <View style={{ borderWidth: 1, width: "80%" }}>
        <View style={{}}>
          <Text style={styles.title}>You are Buying: </Text>

          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.quantity}>Qunatity: {quantity}</Text>
        <Text style={styles.price}>Total Price: €{newPrice}</Text>
        <Text style={styles.initialPrice}>You are saving: €{newSavings}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate({
              routeName: "Cart",
            });
          }}
          style={styles.touchable}
        >
          <Text style={styles.touchableText}>Pay With Cash</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate({
              routeName: "Cart",
            });
          }}
          style={styles.touchable}
        >
          <Text style={styles.touchableText}>Pay With Card</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
//Stylesheet for styling
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    textAlign: "center",
    fontSize: scale(20),
    marginTop: scale(10),
  },
  quantity: {
    textAlign: "center",
    fontSize: scale(20),
    marginTop: scale(10),
  },
  initialPrice: {
    textAlign: "center",
    fontSize: scale(20),
    marginTop: scale(10),
  },
  price: {
    textAlign: "center",
    fontSize: scale(20),
    marginTop: scale(10),
  },
  touchable: {
    height: scale(30),
    width: scale(70),
    backgroundColor: Colour.primaryColour,
    justifyContent: "center",
    marginTop: scale(30),
    marginHorizontal: scale(10),
  },
  touchableText: {
    color: "#fff",
    textAlign: "center",
    fontSize: scale(12),
  },
});

export default CartScreen;
