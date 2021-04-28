/*
 *
 * ClassName: BusinessCurrentProduct.js
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
 *
 */
import React from "react";
import { StyleSheet } from "react-native";

import BusinessFoodCountdownProduct from "..//components/BusinessFoodCountdownProduct";
import BusinessNormalProduct from "..//components/BusinessNormalProduct";
import { ScrollView } from "react-native-gesture-handler";

const BusinessCurrentProduct = (props) => {
  //Displaying each component
  return (
    <ScrollView style={styles.screen}>
      <BusinessNormalProduct />

      <BusinessFoodCountdownProduct />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ffecd2",
  },
});

export default BusinessCurrentProduct;
