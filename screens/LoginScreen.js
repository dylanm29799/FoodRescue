import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Alert,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ColorPropType,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Colour from "../constants/Colour";

import { scale } from "../components/ResponsiveText";
import * as firebase from "firebase";
import { AntDesign } from "@expo/vector-icons";
import ButtonCustom from "../constants/ButtonCustom";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import "firebase/firestore";
import * as GoogleSignIn from "expo-google-sign-in";
import Expo from "expo";
import { BlurView } from "expo-blur";
import Footer from "../components/Footer";
const LoginScreen = (props) => {
  let validation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const [signedIn, setSignedIn] = useState("false");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorColorEmail, setErrorColorEmail] = useState("logotextinput");
  const [errorColorPassword, setErrorColorPassword] = useState("logotextinput");
  const SCREEN_WIDTH = Dimensions.get("window").width;

  signIn = () => {
    if (!email.trim() || validation.test(email) === false) {
      alert("Please Enter a valid Email");
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
      <ImageBackground
        source={require("../assets/BackGround2.png")}
        style={styles.backGround}
      >
        {/*<ActivityIndicator
          size="large"
          color="#00ff00"
          style={styles.loading}
        />*/}
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
              fontFamily: "OpenSans",
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
          {/*<Button color={Colour.primaryColour} title="Login" onPress={signIn} />*/}
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
    fontFamily: "OpenSans",
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
    fontSize: scale(12),
    fontFamily: "OpenSans",
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
