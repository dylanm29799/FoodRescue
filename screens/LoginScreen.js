/*
 *
 * ClassName: LoginScreen.js
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
 * @reference : https://stackoverflow.com/questions/15017052/understanding-email-validation-using-javascript
 *
 */

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from "react-native";

import Colour from "../constants/Colour";

import { scale } from "../components/ResponsiveText";
import * as firebase from "firebase";
import { AntDesign } from "@expo/vector-icons";
import ButtonCustom from "../constants/ButtonCustom";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import "firebase/firestore";

import Footer from "../components/Footer";

const LoginScreen = (props) => {
  //Using Regex to validate email
  let validation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //Setting state
  const [signedIn, setSignedIn] = useState("false");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorColorEmail, setErrorColorEmail] = useState("logotextinput");
  const [errorColorPassword, setErrorColorPassword] = useState("logotextinput");

  var userid;
  var user1;

  signIn = () => {
    //Login Validation
    if (!email.trim() || validation.test(email) === false) {
      alert("Please Enter a valid Email");
      //Changing the styling based on whether
      setErrorColorEmail("logotextinputerror");
      return;
    } else {
      setErrorColorEmail("logotextinput");
    }

    if (!password.trim()) {
      alert("Please Enter Password");
      setErrorColorPassword("logotextinputerror");
      return;
    } else {
      setErrorColorPassword("logotextinput");

      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          //Sign in user and get their UID
          user1 = userCredential.user;
          userid = user1.uid;
          console.log(userid);
          console.log("Logged In");
          setSignedIn("true");
          console.log(email, password, signedIn);
        })
        .then(function () {
          //Logging user into the business or user side depending on their account
          const dbconnection = firebase.firestore();
          var docRef = dbconnection.collection("accountDetails").doc(userid);
          docRef
            .get()
            .then(function (doc) {
              if (doc.exists) {
                console.log(doc.data().accountType);
                console.log("worked", userid);
              }
              if (doc.data().accountType === "Business") {
                props.navigation.navigate({ routeName: "BusinessHome" });
                console.log("business");
              } else if (doc.data().accountType === "User") {
                console.log("user");
                props.navigation.navigate({ routeName: "Main" });
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
            })

            .catch(function (error) {
              // The document probably doesn't exist.
              console.error("Error With document: ", error);
            });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("Not Logged In", errorCode, errorMessage);
          Alert.alert("Error", "This email and password does not exist");
        });
    }
  };

  return (
    <View style={styles.screen}>
      <ImageBackground
        source={require("../assets/BackGround2.png")}
        style={styles.backGround}
      >
        <View style={styles.content}>
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
          <Text
            style={{
              textAlign: "right",
              alignSelf: "stretch",
              fontFamily: "MonM",
              fontSize: scale(12),
              paddingBottom: 10,
            }}
            onPress={() => {
              props.navigation.navigate({ routeName: "forgotPassword" });
            }}
          >
            Forgotten Your Password?
          </Text>
          <ButtonCustom onPress={signIn} title="Submit" />

          <Text style={styles.signUp}>Or Sign Up</Text>
          <View style={styles.options}>
            <TouchableOpacity
              style={styles.footer}
              onPress={() => {
                props.navigation.navigate({ routeName: "Register" });
              }}
            >
              <Text style={styles.all}>New to Food Rescue?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.footer}
              onPress={() => {
                props.navigation.navigate({ routeName: "BusinessRegister" });
              }}
            >
              <Text style={styles.all}>Register Your Business!</Text>
            </TouchableOpacity>
          </View>
          <Footer footerColor={"white"} />
        </View>
      </ImageBackground>
    </View>
  );
};
//Stylesheet for styling
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
  signUp: {
    fontFamily: "MonM",
    fontSize: scale(10),
    borderBottomWidth: 1,
    width: scale(100),
    textAlign: "center",
    paddingTop: scale(70),
    color: "#fff",
    borderBottomColor: "#fff",
    marginBottom: scale(20),
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: scale(220),
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
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
  imageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center",
  },
  inputError: {
    width: "80%",
    paddingVertical: scale(3),
    paddingHorizontal: scale(10),
    textAlign: "center",
  },
  options: {
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  all: {
    fontSize: scale(11),
    fontFamily: "MonM",
    color: "white",
    width: scale(100),
    padding: 10,
    justifyContent: "center",
  },
  Logo: {
    paddingTop: 40,
    paddingBottom: 40,
  },

  footer: {
    height: scale(60),
    width: scale(85),
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 20,
    justifyContent: "center",
    marginHorizontal: scale(20),
  },
});

export default LoginScreen;
