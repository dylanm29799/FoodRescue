import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Image, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Colour from "../constants/Colour";
import Raleway from "../assets/fonts/Raleway-VariableFont_wght.ttf";
import { scale } from "../components/ResponsiveText";
import * as firebase from "firebase";

import "firebase/firestore";
import * as GoogleSignIn from "expo-google-sign-in";
import Expo from "expo";

const LoginScreen = (props) => {
  let validation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const [signedIn, setSignedIn] = useState("false");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorColorEmail, setErrorColorEmail] = useState("input");
  const [errorColorPassword, setErrorColorPassword] = useState("input");

  signIn = () => {
    if (!email.trim() || validation.test(email) === false) {
      alert("Please Enter a valid Email");
      setErrorColorEmail("inputError");
      return;
    } else {
      setErrorColorEmail("input");
    }

    if (!password.trim()) {
      alert("Please Enter Password");
      setErrorColorPassword("inputError");
      return;
    } else {
      setErrorColorPassword("input");
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          console.log("Logged In");
          setSignedIn("true");
          console.log(email, password, signedIn);
          props.navigation.navigate({ routeName: "Main" });
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("Not Logged In", errorCode, errorMessage);
          Alert.alert("Error", "This email and password does not exist");
          // ..
        });
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.Logo}>
        <Image source={require("../assets/Logo.png")} />
      </View>
      <Text style={styles.all}>Email</Text>
      <TextInput
        style={styles[errorColorEmail]}
        onChangeText={(email) => setEmail(email)}
      />
      <Text style={styles.all}>Password</Text>
      <TextInput
        style={styles[errorColorPassword]}
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Text>{"\n"}</Text>
      <Button color={Colour.primaryColour} title="Login" onPress={signIn} />

      <Text
        style={styles.all}
        onPress={() => {
          props.navigation.navigate({ routeName: "forgotPassword" });
        }}
      >
        Forgotten Your Password?
      </Text>

      <Text
        style={styles.all}
        onPress={() => {
          props.navigation.navigate({ routeName: "Register" });
        }}
      >
        New to Food Rescue?
      </Text>

      <Text
        style={styles.all}
        onPress={() => {
          props.navigation.navigate({ routeName: "BusinessRegister" });
        }}
      >
        Click Here to register your business!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
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

  inputError: {
    width: "80%",
    paddingVertical: scale(3),
    paddingHorizontal: scale(10),
    textAlign: "center",
    borderColor: "red",
    borderWidth: 3,
  },

  all: {
    padding: 20,
  },
  Logo: {
    paddingTop: 40,
    paddingBottom: 40,
  },
});

export default LoginScreen;
