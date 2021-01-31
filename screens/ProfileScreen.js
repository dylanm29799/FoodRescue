import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Colour from "../constants/Colour";
import ButtonCustom from "../constants/ButtonCustom";
import * as firebase from "firebase";

const ProfileScreen = (props) => {
  const dbconnection = firebase.firestore();
  var user = firebase.auth().currentUser;
  changeProfile = () => {
    if (user) {
      // User is signed in.
      let docref = dbconnection.collection("userDetails").doc(user.uid);
    } else {
      // No user is signed in.
      console.log("No User Logged In");
    }
  };
  return (
    <View style={styles.screen}>
      <ButtonCustom title="Submit" onPress={changeProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  item: {
    paddingVertical: 20,
  },

  title: {
    borderBottomWidth: 1,
    borderBottomColor: Colour.primaryColour,
  },

  flat: { width: "80%", paddingVertical: 20, height: "50%" },
});

export default ProfileScreen;
