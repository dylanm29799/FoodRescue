import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Colour from "../constants/Colour";
import Raleway from "../assets/fonts/Raleway-VariableFont_wght.ttf";
import { scale } from "../components/ResponsiveText";
import * as firebase from "firebase";
import "firebase/firestore";

const RegisterScreen = (props) => {
  const dbconnection = firebase.firestore();

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
    if (!firstName.trim()) {
      alert("Please Enter Name");
      setErrorColorFirstName("inputError");
      return;
    } else {
      setErrorColorFirstName("input");
    }
    if (!lastName.trim()) {
      alert("Please Enter Last Name");
      setErrorColorLastName("inputError");
      return;
    } else {
      setErrorColorLastName("input");
    }
    //Check for the Email TextInput
    if (!email.trim()) {
      alert("Please Enter Email");
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
    }
    if (!confPassword.trim()) {
      alert("Please Enter Password");
      setErrorColorConfPassword("inputError");
      return;
    } else {
      setErrorColorConfPassword("input");
    }
    if (!number.trim()) {
      alert("Please Enter Number");
      setErrorColorNumber("inputError");
      return;
    } else {
      setErrorColorNumber("input");
    }
    if (confPassword != password) {
      alert("Please Confirm your Password");
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
