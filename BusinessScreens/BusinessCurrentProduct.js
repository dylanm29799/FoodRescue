import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { scale } from "../components/ResponsiveText";
import Colour from "../constants/Colour";
import BusinessFoodCountdownProduct from "..//components/BusinessFoodCountdownProduct";
import BusinessNormalProduct from "..//components/BusinessNormalProduct";
import { ScrollView } from "react-native-gesture-handler";

const BusinessCurrentProduct = (props) => {
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
