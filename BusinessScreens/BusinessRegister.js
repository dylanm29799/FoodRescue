import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  Alert,
  Linking,
  ImageBackground,
} from "react-native";
import Colour from "../constants/Colour";
import { scale } from "../components/ResponsiveText";
import * as firebase from "firebase";
import "firebase/firestore";
import { ScrollView } from "react-native-gesture-handler";
import ButtonCustom from "../constants/ButtonCustom";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Footer from "../components/Footer";

const BusinessRegister = (props) => {
  const dbconnection = firebase.firestore();
  //validation is used for validation of emails
  let validation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [number, setNumber] = useState("");
  const [publicNumber, setPublicNumber] = useState("");
  const [id, setID] = useState("");
  const [privateID, setPrivateID] = useState("");

  const [errorColorID, setErrorColorID] = useState("logotextinput");
  const [errorColorName, setErrorColorName] = useState("logotextinput");

  const [errorColorPassword, setErrorColorPassword] = useState("logotextinput");
  const [errorColorConfPassword, setErrorColorConfPassword] = useState(
    "logotextinput"
  );
  const [errorColorNumber, setErrorColorNumber] = useState("logotextinput");
  const [errorColorEmail, setErrorColorEmail] = useState("logotextinput");

  var businessIDRef = dbconnection.collection("BusinessID").doc("ESSENTIALID");

  businessIDRef
    .get()
    .then(function (doc) {
      if (doc.exists) {
        setPrivateID(doc.get("ID"));
        console.log("Worked!");
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });

  signUp = () => {
    //Check for the Name firstName
    if (!name.trim() || name.length < 3) {
      Alert.alert("Error", "Your business name must be longer than 3 letters");
      setErrorColorName("logotextinputerror");
      return;
    } else {
      setErrorColorName("logotextinput");
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
    if (id != privateID) {
      Alert.alert(
        "Error",
        "Please Enter the ID given to you either over the phone or through email"
      );
      setErrorColorID("logotextinputerror");
      return;
    } else {
      setErrorColorID("logotextinput");
    }
    if (confPassword != password) {
      Alert.alert("Error", "Please make sure your passwords match");
    }
    //Checked Successfully
    console.log(password, email, name, number, publicNumber);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("Signed Up");
        dbconnection.collection("businessDetails").doc(user.uid).set({
          name: name,
          email: email,
          number: number,
          longitude: "",
          latitude: "",
        });
        dbconnection.collection("accountDetails").doc(user.uid).set({
          accountType: "Business",
        });
        props.navigation.navigate({ routeName: "BusinessLocation" });
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Not Signed Up", errorCode, errorMessage);
        Alert.alert("Error", errorMessage);
        // ..
      });
  };

  return (
    <View style={styles.screen}>
      <ImageBackground
        source={require("../assets/BackGround.png")}
        style={styles.backGround}
      >
        <Text style={{ paddingTop: scale(210) }} />
        <View style={styles[errorColorName]}>
          <AntDesign name="user" size={30} color={Colour.primaryColour} />
          <TextInput
            style={styles.input}
            onChangeText={(name) => setName(name)}
            placeholder={"Business Name"}
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
            placeholder="Contact Number"
            keyboardType={"numeric"}
            onChangeText={(number) => setNumber(number)}
          />
        </View>

        <View style={styles[errorColorID]}>
          <AntDesign name="phone" size={30} color={Colour.primaryColour} />
          <TextInput
            style={styles.input}
            placeholder="Registration Code"
            keyboardType={"numeric"}
            onChangeText={(id) => setID(id)}
          />
        </View>

        <Text style={styles.all}>
          1st time registration code - Get in contact through
          <Text
            style={{ color: "blue" }}
            onPress={() =>
              Linking.openURL("mailto: foodrescueireland@gmail.com")
            }
          >
            {" "}
            email
          </Text>{" "}
          or{" "}
          <Text
            style={{ color: "blue" }}
            onPress={() => Linking.openURL("tel: ")}
          >
            over the phone
          </Text>
        </Text>
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
    alignContent: "center",
    width: "100%",
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

  all: {
    padding: 20,
    alignItems: "center",
  },
  Logo: {
    paddingTop: 40,
    paddingBottom: 40,
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
});

export default BusinessRegister;
