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
} from "react-native";
import Colour from "../constants/Colour";
import { scale } from "../components/ResponsiveText";
import * as firebase from "firebase";
import "firebase/firestore";
import { ScrollView } from "react-native-gesture-handler";

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

  const [errorColorID, setErrorColorID] = useState("input");
  const [errorColorName, setErrorColorName] = useState("input");
  const [errorColorPublicNumber, setErrorColorPublicNumber] = useState("input");
  const [errorColorPassword, setErrorColorPassword] = useState("input");
  const [errorColorConfPassword, setErrorColorConfPassword] = useState("input");
  const [errorColorNumber, setErrorColorNumber] = useState("input");
  const [errorColorEmail, setErrorColorEmail] = useState("input");

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
      setErrorColorName("inputError");
      return;
    } else {
      setErrorColorName("input");
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
    if (publicNumber.length != 10) {
      Alert.alert("Error", "Please Enter a valid Irish Number");
      setErrorColorPublicNumber("inputError");
      return;
    } else {
      setErrorColorPublicNumber("input");
    }
    if (id != privateID) {
      Alert.alert(
        "Error",
        "Please Enter the ID given to you either over the phone or through email"
      );
      setErrorColorID("inputError");
      return;
    } else {
      setErrorColorPublicNumber("input");
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
          publicNumber: publicNumber,
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
      <ScrollView>
        <View style={styles.Logo}>
          <Image source={require("../assets/Logo.png")} />
        </View>
        <Text style={styles.all}>Business Name </Text>
        <TextInput
          style={styles[errorColorName]}
          placeholder="John's Delights"
          onChangeText={(name) => setName(name)}
        />

        <Text style={styles.all}>Business Email</Text>
        <TextInput
          onChangeText={(email) => setEmail(email)}
          style={styles[errorColorEmail]}
          placeholder="JohnDoeBusiness@gmail.com"
        />

        <Text style={styles.all}>Password</Text>
        <TextInput
          style={styles[errorColorPassword]}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        />

        <Text style={styles.all}>Repeat Password</Text>
        <TextInput
          style={styles[errorColorConfPassword]}
          onChangeText={(confPassword) => setConfPassword(confPassword)}
        />

        <Text style={styles.all}>Contact Phone </Text>
        <TextInput
          style={styles[errorColorNumber]}
          keyboardType="numeric"
          placeholder="0890823212"
          onChangeText={(number) => setNumber(number)}
        />

        <Text style={styles.all}>Public Phone Number for Customers</Text>
        <TextInput
          style={styles[errorColorPublicNumber]}
          keyboardType="numeric"
          placeholder="0890823212"
          onChangeText={(publicNumber) => setPublicNumber(publicNumber)}
        />
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
            onPress={() => Linking.openURL("tel: 08709090909")}
          >
            over the phone
          </Text>
        </Text>
        <TextInput
          style={styles[errorColorID]}
          keyboardType="numeric"
          placeholder="12121212121212"
          onChangeText={(id) => setID(id)}
        />
        <Text>{"\n"}</Text>

        <Button
          color={Colour.primaryColour}
          title="Register"
          onPress={signUp}
          style={{ marginBottom: scale(20) }}
        />
      </ScrollView>
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

  input: {
    borderWidth: 2,
    borderColor: "transparent",
    borderBottomColor: Colour.primaryColour,

    paddingVertical: scale(3),
    paddingHorizontal: scale(10),
    textAlign: "center",
  },

  inputError: {
    paddingVertical: scale(3),
    paddingHorizontal: scale(10),
    textAlign: "center",
    borderColor: "red",
    borderWidth: 3,
  },

  all: {
    padding: 20,
    alignItems: "center",
    textAlign: "center",
  },
  Logo: {
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: "center",
  },
});

export default BusinessRegister;
