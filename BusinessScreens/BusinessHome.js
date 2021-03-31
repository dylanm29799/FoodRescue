import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { scale } from "../components/ResponsiveText";
import Colour from "../constants/Colour";
import * as firebase from "firebase";
import { Fontisto } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
const BusinessHome = (props) => {
  return (
    <View style={styles.Screen}>
      <View
        style={[
          styles.items2,
          {
            borderBottomWidth: 4,
            borderBottomColor: Colour.primaryColour,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate({
              routeName: "BusinessAddProduct",
            });
          }}
          style={styles.touchable}
        >
          <Fontisto
            name="shopping-basket-add"
            size={scale(100)}
            style={styles.icon}
          />
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
          <Fontisto
            name="shopping-bag-1"
            size={scale(100)}
            style={styles.icon}
          />
          <Text style={styles.touchableText}>View Your Current Products</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.items2}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate({
              routeName: "BusinessManage",
            });
          }}
          style={styles.touchable}
        >
          <Feather name="users" size={100} style={styles.icon} />
          <Text style={styles.touchableText}>View Your Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate({
              routeName: "BusinessProfile",
            });
          }}
          style={styles.touchable}
        >
          <AntDesign name="profile" size={100} style={styles.icon} />
          <Text style={styles.touchableText}>Manage Your Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffecd2",
  },
  items2: { height: "50%", flexDirection: "row" },
  text: {
    fontSize: scale(15),

    textAlign: "center",
  },

  touchable: {
    width: "50%",
    height: "100%",
    borderColor: Colour.primaryColour,

    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  touchableText: {
    color: "black",
    textAlign: "center",
    maxWidth: "80%",
    marginTop: scale(50),
    fontSize: scale(14),
    fontFamily: "MonM",
  },
  icon: {
    color: Colour.primaryColour,
    alignSelf: "center",
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
    fontFamily: "MonM",
  },
  signOut: {
    paddingLeft: scale(10),
  },
});

export default BusinessHome;
