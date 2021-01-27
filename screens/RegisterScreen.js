import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Button, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Colour from "../constants/Colour";
import Raleway from "../assets/fonts/Raleway-VariableFont_wght.ttf";
import { scale } from "../components/ResponsiveText";
import * as firebase from "firebase";
import "firebase/firestore";

const RegisterScreen = (props) => {
  const dbconnection = firebase.firestore();
  //validation is used for validation of emails
  let validation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [errorColorFirstName, setErrorColorFirstName] = useState("input");
  const [errorColorLastName, setErrorColorLastName] = useState("input");
  const [errorColorPassword, setErrorColorPassword] = useState("input");
  const [errorColorConfPassword, setErrorColorConfPassword] = useState("input");
  const [errorColorNumber, setErrorColorNumber] = useState("input");
  const [errorColorEmail, setErrorColorEmail] = useState("input");

  signUp = () => {
    //Check for the Name firstName
    if (!firstName.trim() || firstName.length < 3) {
      Alert.alert("Error", "Your first name must be longer than 3 letters");
      setErrorColorFirstName("inputError");
      return;
    } else {
      setErrorColorFirstName("input");
    }
    if (!lastName.trim() || firstName.length < 3) {
      alert("Your ast name must be longer than 3 letters");
      setErrorColorLastName("inputError");
      return;
    } else {
      setErrorColorLastName("input");
    }
    //Check for the Email TextInput
    if (!email.trim() || validation.test(email) === false) {
      Alert.alert("Error", "Please Enter a valid Email");
      setErrorColorEmail("inputError");
      return;
    } else {
      setErrorColorEmail("input");
    }
    if (!password.trim() || password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 digits");
      setErrorColorPassword("inputError");
      return;
    } else {
      setErrorColorPassword("input");
    }
    if (!confPassword.trim() || confPassword.length < 6) {
      Alert.alert("Error", "Please Confirm your password");
      setErrorColorConfPassword("inputError");
      return;
    } else {
      setErrorColorConfPassword("input");
    }
    if (number.length != 10) {
      Alert.alert("Error", "Please Enter a valid Irish Number");
      setErrorColorNumber("inputError");
      return;
    } else {
      setErrorColorNumber("input");
    }
    if (confPassword != password) {
      Alert.alert("Error", "Please Confirm your Password");
    }
    //Checked Successfully
    console.log(password, email, firstName, lastName, number);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("Signed Up");

        dbconnection.collection("userDetails").doc(user.uid).set({
          firstName: firstName,
          lastName: lastName,
          number: number,
          email: email,
        });
        props.navigation.navigate({ routeName: "Main" });
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Not Signed Up", errorCode, errorMessage);
        // ..
      });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.Logo}>
        <Image source={require("../assets/Logo.png")} />
      </View>
      <Text style={styles.all}>First Name</Text>
      <TextInput
        onChangeText={(firstName) => setFirstName(firstName)}
        style={styles[errorColorFirstName]}
        placeholder="John"
      />

      <Text style={styles.all}>Last Name</Text>
      <TextInput
        onChangeText={(lastName) => setLastName(lastName)}
        style={styles[errorColorLastName]}
        placeholder="Doe"
      />

      <Text style={styles.all}>Email</Text>
      <TextInput
        onChangeText={(email) => setEmail(email)}
        style={styles[errorColorEmail]}
        placeholder="JohnDoe@gmail.com"
      />

      <Text style={styles.all}>Password</Text>
      <TextInput
        onChangeText={(password) => setPassword(password)}
        style={styles[errorColorPassword]}
        secureTextEntry={true}
      />

      <Text style={styles.all}>Repeat Password</Text>
      <TextInput
        style={styles[errorColorConfPassword]}
        secureTextEntry={true}
        onChangeText={(confPassword) => setConfPassword(confPassword)}
      />

      <Text style={styles.all}>Phone Number</Text>
      <TextInput
        onChangeText={(number) => setNumber(number)}
        style={styles[errorColorNumber]}
        placeholder="0832122122"
        keyboardType={"numeric"}
      />

      <Text>{"\n"}</Text>

      <Button color={Colour.primaryColour} title="Register" onPress={signUp} />
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

export default RegisterScreen;
