import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { scale } from "../components/ResponsiveText";
import Colour from "../constants/Colour";
import { AntDesign } from "@expo/vector-icons";

const BusinessHome = (props) => {
  onSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        props.navigation.navigate({ routeName: "Login" });
      })
      .catch((error) => {
        // An error happened.
      });
  };
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
      <View style={styles.logout} onPress={onSignOut}>
        <AntDesign name="logout" size={30} color="black" onPress={onSignOut} />
        <Text onPress={onSignOut} style={styles.signOut}>
          Log Out
        </Text>
      </View>
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

  logout: {
    justifyContent: "center",
    flexDirection: "row",
    padding: scale(10),
    marginTop: scale(20),
    alignItems: "center",
    textAlign: "center",
    borderColor: "black",
    borderWidth: 1,
    fontFamily: "OpenSans",
  },
  signOut: {
    paddingLeft: scale(10),
  },
});

export default BusinessHome;
