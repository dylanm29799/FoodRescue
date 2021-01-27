import React, { useState } from "react";
import { View, TextInput, Text, Button, StyleSheet, Alert } from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import Colour from "../constants/Colour";
import { scale } from "../components/ResponsiveText";

const forgotPassword = (props) => {
  const [email, setEmail] = useState("");
  var auth = firebase.auth();

  function forgot() {
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
        style={styles.input}
        placeholder={"JohnDoe@gmail.com"}
        onChangeText={(email) => setEmail(email)}
      />
      <Text />
      <Button
        color={Colour.primaryColour}
        title="Reset Email"
        onPress={forgot}
      />
    </View>
  );
};

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
});

export default forgotPassword;
