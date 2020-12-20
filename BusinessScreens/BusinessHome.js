import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { scale } from "../components/ResponsiveText";
import Colour from "../constants/Colour";

const BusinessHome = (props) => {
  return (
    <View style={styles.Screen}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate({
            routeName: "BusinessAddProduct",
          });
        }}
        style={styles.touchable}
      >
        <Text style={styles.touchableText}>Add a Product</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate({
            routeName: "BusinessCurrentProduct",
          });
        }}
        style={styles.touchable}
      >
        <Text style={styles.touchableText}>View Your Current Products</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate({
            routeName: "BusinessManage",
          });
        }}
        style={styles.touchable}
      >
        <Text style={styles.touchableText}>Manage Your Products</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  Screen: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  text: {
    fontSize: scale(15),
    borderBottomColor: Colour.primaryColour,
    borderBottomWidth: scale(2),
    width: "60%",
    textAlign: "center",
  },

  touchable: {
    height: scale(30),
    width: scale(200),
    borderBottomWidth: 2,
    borderBottomColor: Colour.primaryColour,
    justifyContent: "center",
    marginTop: scale(30),
    marginHorizontal: scale(10),
  },
  touchableText: {
    color: "#000",
    textAlign: "center",
    fontSize: scale(14),
  },
});

export default BusinessHome;
