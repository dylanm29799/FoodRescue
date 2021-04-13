import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Alert,
  ImageBackground,
  TextInput,
} from "react-native";

import Colour from "../constants/Colour";

import { scale } from "../components/ResponsiveText";
import * as firebase from "firebase";
import "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";
import ButtonCustom from "../constants/ButtonCustom";
import Footer from "../components/Footer";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
  const [errorColorFirstName, setErrorColorFirstName] = useState(
    "logotextinput"
  );
  const [errorColorLastName, setErrorColorLastName] = useState("logotextinput");
  const [errorColorPassword, setErrorColorPassword] = useState("logotextinput");
  const [errorColorConfPassword, setErrorColorConfPassword] = useState(
    "logotextinput"
  );
  const [errorColorNumber, setErrorColorNumber] = useState("logotextinput");
  const [errorColorEmail, setErrorColorEmail] = useState("logotextinput");

  signUp = () => {
    //Check for the Name firstName
    if (!firstName.trim() || firstName.length < 3) {
      Alert.alert("Error", "Your first name must be longer than 3 letters");
      setErrorColorFirstName("logotextinputerror");
      return;
    } else {
      setErrorColorFirstName("logotextinput");
    }
    if (!lastName.trim() || firstName.length < 3) {
      alert("Your Last name must be longer than 3 letters");
      setErrorColorLastName("logotextinputerror");
      return;
    } else {
      setErrorColorLastName("logotextinput");
    }
    //Check for the Email TextInput
    if (!email.trim() || validation.test(email) === false) {
      Alert.alert("Error", "Please Enter a valid Email");
      setErrorColorEmail("logotextinputerror");
      return;
    } else {
      setErrorColorEmail("logotextinput");
    }
    if (!password.trim() || password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 digits");
      setErrorColorPassword("logotextinputerror");
      return;
    } else {
      setErrorColorPassword("logotextinput");
    }
    if (!confPassword.trim() || confPassword.length < 6) {
      Alert.alert("Error", "Please Confirm your password");
      setErrorColorConfPassword("logotextinputerror");
      return;
    } else {
      setErrorColorConfPassword("logotextinput");
    }
    if (number.length != 10) {
      Alert.alert("Error", "Please Enter a valid Irish Number");
      setErrorColorNumber("logotextinputerror");
      return;
    } else {
      setErrorColorNumber("logotextinput");
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
        dbconnection.collection("accountDetails").doc(user.uid).set({
          accountType: "User",
        });
        props.navigation.navigate({ routeName: "Main" });
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Not Signed Up", errorCode, errorMessage);
        if (errorCode === "auth/email-already-in-use") {
          Alert.alert(
            "Existing Email",
            "This email already exists, Please Login."
          );
        }
        // ..
      });
  };

  return (
    <View style={styles.screen}>
      <ImageBackground
        source={require("../assets/BackGround.png")}
        style={styles.backGround}
      >
        <Text style={{ paddingTop: scale(200) }} />
        <View style={styles[errorColorFirstName]}>
          <AntDesign name="user" size={30} color={Colour.primaryColour} />
          <TextInput
            style={styles.input}
            onChangeText={(firstName) => setFirstName(firstName)}
            placeholder={"First Name"}
          />
        </View>

        <View style={styles[errorColorLastName]}>
          <AntDesign name="user" size={30} color={Colour.primaryColour} />
          <TextInput
            style={styles.input}
            onChangeText={(lastName) => setLastName(lastName)}
            placeholder={"Last Name"}
          />
        </View>

        <View style={styles[errorColorEmail]}>
          <MaterialCommunityIcons
            name="email-outline"
            size={30}
            color={Colour.primaryColour}
          />
          <TextInput
            style={styles.input}
            onChangeText={(email) => setEmail(email)}
            placeholder={"Email"}
            autoCompleteType={"email"}
            keyboardType={"email-address"}
          />
        </View>

        <View style={styles[errorColorPassword]}>
          <AntDesign name="lock1" size={30} color={Colour.primaryColour} />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder={"Password"}
            onChangeText={(password) => setPassword(password)}
          />
        </View>

        <View style={styles[errorColorConfPassword]}>
          <AntDesign name="lock1" size={30} color={Colour.primaryColour} />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder={"Confirm Your Password"}
            onChangeText={(confPassword) => setConfPassword(confPassword)}
          />
        </View>

        <View style={styles[errorColorNumber]}>
          <AntDesign name="phone" size={30} color={Colour.primaryColour} />
          <TextInput
            style={styles.input}
            placeholder="Your Personal Phone Number"
            keyboardType={"numeric"}
            onChangeText={(number) => setNumber(number)}
          />
        </View>

        <Text>{"\n"}</Text>

        <ButtonCustom title="Register" onPress={signUp} />
        <Footer footerColor={Colour.primaryColour} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,

    alignItems: "center",
  },
  backGround: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderRadius: 20,
    width: "75%",
    fontSize: scale(15),
    paddingVertical: scale(5),
    paddingHorizontal: scale(10),
    textAlign: "center",
    marginRight: scale(10),
    paddingRight: scale(2),
  },
  logotextinput: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: Colour.primaryColour,
    height: 45,
    paddingRight: scale(20),
    margin: 10,
    borderRadius: 15,
  },

  logotextinputerror: {
    borderColor: "red",
    borderWidth: 3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 45,
    paddingRight: scale(20),
    margin: 10,
    borderRadius: 15,
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
