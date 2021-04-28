/*
 *
 * ClassName: forgotPassword.js
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

import React, { useState } from "react";
import { View, TextInput, Text, Button, StyleSheet, Alert } from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import Colour from "../constants/Colour";
import { scale } from "../components/ResponsiveText";

const forgotPassword = (props) => {
  //Setting state
  const [email, setEmail] = useState("");
  var auth = firebase.auth();

  function forgot() {
    //Forget password logic - Send password reset email to users email then navigate them to main screen
    auth
      .sendPasswordResetEmail(email)
      .then(function () {
        alert("Please check your email...");
        props.navigation.navigate({ routeName: "Login" });
        // Email sent.
        console.log("Worked");
      })
      .catch(function (error) {
        console.log(error);
        console.log("Didn't work");
        Alert.alert("Error", "Please provide a valid email");
        // An error happened.
      });
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Enter Your Email</Text>

      <TextInput
        style={styles.logotextinput}
        placeholder={"JohnDoe@gmail.com"}
        onChangeText={(email) => setEmail(email)}
      />

      <Button
        color={Colour.primaryColour}
        title="Reset Email"
        onPress={forgot}
      />
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
  input: {
    borderWidth: 2,
    borderColor: "transparent",
    borderBottomColor: Colour.primaryColour,
    width: "80%",
    paddingVertical: scale(3),
    paddingHorizontal: scale(10),
    textAlign: "center",
  },
  logotextinput: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: Colour.primaryColour,
    height: scale(30),
    width: scale(250),

    margin: 10,
    borderRadius: 15,
    alignContent: "center",
    textAlign: "center",
  },
  text: {
    textAlign: "center",
    alignSelf: "center",
    fontFamily: "MonM",
    fontSize: scale(12),
    paddingBottom: 10,
  },
});

export default forgotPassword;
