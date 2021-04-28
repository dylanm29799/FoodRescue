/*
 *
 * ClassName: BusinessLocation.js
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
 * @reference : https://www.npmjs.com/package/react-native-dropdown-picker
 * @reference : https://stackoverflow.com/questions/15017052/understanding-email-validation-using-javascript
 * @reference : https://www.npmjs.com/package/react-native-dialog
 *
 */
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";

import Colour from "../constants/Colour";
import ButtonCustom from "../constants/ButtonCustom";
import * as firebase from "firebase";
import { scale } from "../components/ResponsiveText";
import Dialog from "react-native-dialog";
import { AntDesign } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";

const ProfileScreen = (props) => {
  //Setting states
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [number, setNumber] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [password, setPassword] = useState("");
  //Sort is for the category of the business
  const [sort, setSort] = useState("");

  const [textName, setTextName] = useState("Name");
  //Getting user id and firebase connection details
  const dbconnection = firebase.firestore();
  var user = firebase.auth().currentUser;
  var uid = " ";
  try {
    uid = user.uid;
  } catch (err) {
    console.log(err);
  }
  var docRef;
  //Using regex for email validation
  let validation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  useEffect(() => {
    if (user) {
      // User is signed in.
      docRef = dbconnection.collection("businessDetails").doc(uid);

      docRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            //Getting data from firebase
            setTextName("First Name");
            setEmail(doc.data().email);
            setName(doc.data().name);
            setSort(doc.data().sortName);
            setNumber(doc.data().number);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })

        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    } else {
      // No user is signed in.
      console.log("No User Logged In");
    }
  }, []);

  const handleCancel = () => {
    // The user has pressed the "Cancel" button
    setConfirm(false);
  };

  const handleSubmit = () => {
    //Updating the user email
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function (userCredential) {
        userCredential.user.updateEmail(email);
      })

      .then(function () {
        // The user has pressed the "Submit" button

        docRef = dbconnection.collection("businessDetails").doc(uid);
        setConfirm(false);

        Alert.alert("Worked", "Your details have been updated.");
        console.log(email, name, number, password);
        docRef.update({
          name: name,
          email: email,
          number: number,
          sortName: sort,
        });

        props.navigation.navigate({ routeName: "BusinessHome" });
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        Alert.alert("Error", "Your Password is incorrect, please try again");
        console.log(error);
      });
  };

  const onSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        props.navigation.navigate({ routeName: "Login" });
      })
      .catch((error) => {
        // An error happened.
      });
  };
  onButtonPress = () => {
    //Input logic
    if (!email.trim() || validation.test(email) === false) {
      alert("Please Enter a valid Email");
      return;
    } else if (number.length != 10) {
      Alert.alert("Error", "Please Enter a valid Irish Number");
    } else if (!name.trim() || name.length < 3) {
      Alert.alert("Error", "Name must be longer than 3 letters");
    } else {
      setConfirm(true);
    }
  };
  deleteProfile = () => {
    //When a user wants to delete their account
    Alert.alert(
      "Second Chance!",
      "Are you sure you would like to delete your profile? This cannot be undone!",
      [
        {
          text: "I Wont Go",
          onPress: () => {
            console.log("Not Pressed");
          },
        },
        {
          text: "GoodBye Forever",
          onPress: () => {
            user
              .delete()
              .then(function () {
                // User deleted.
                console.log("User Deleted");
                //Deleted
                dbconnection
                  .collection("businessDetails")
                  .doc(user.uid)
                  .delete()
                  .then(function () {
                    console.log("Document successfully deleted!");
                  })
                  .catch(function (error) {
                    console.error("Error removing document: ", error);
                  });
                //Navigating to the login page
                props.navigation.navigate({ routeName: "Login" });
              })
              .catch(function (error) {
                // An error happened.
                console.log("Error Happened", error);
              });
          },
        },
      ],
      //Enforcing that it is not cancelable if clicked off the screen
      { cancelable: false }
    );
  };

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          paddingBottom: scale(30),
        }}
      >
        <Text style={styles.all}> Business Name</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(name) => setName(name)}
        >
          {name}
        </TextInput>

        <Text style={styles.all}> Your Phone Number:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(number) => setNumber(number)}
          keyboardType="numeric"
        >
          {number}
        </TextInput>

        <Text style={styles.all}> Email:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(email) => setEmail(email)}
        >
          {email}
        </TextInput>
        <Text style={styles.all}>What's your category?</Text>
        <DropDownPicker
          //Predefined options for a business to have
          items={[
            {
              label: "",
              value: "",
            },
            {
              label: "Italian",
              value: "Italian",
            },
            {
              label: "Asian",
              value: "Asian",
            },
            {
              label: "Chipper",
              value: "Chipper",
            },
            {
              label: "Chinese",
              value: "Chinese",
            },
            {
              label: "American",
              value: "American",
            },
            {
              label: "Bakery",
              value: "Bakery",
            },
            {
              label: "Breakfast",
              value: "Breakfast",
            },
            {
              label: "Mexican",
              value: "Mexican",
            },
          ]}
          defaultValue={""}
          containerStyle={{ height: 40, width: "100%" }}
          style={{ backgroundColor: "#fafafa" }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={(item) => setSort(item.value)}
        />
      </View>

      <ButtonCustom title="Submit" onPress={onButtonPress} />
      <TouchableOpacity style={styles.logout} onPress={onSignOut}>
        <AntDesign name="logout" size={30} color="black" onPress={onSignOut} />
        <Text onPress={onSignOut} style={styles.signOut}>
          Log Out
        </Text>
      </TouchableOpacity>
      <Text onPress={deleteProfile} style={styles.delete}>
        Delete Account
      </Text>

      <View>
        {/* Input password before being able to update information*/}
        <Dialog.Container visible={confirm}>
          <Dialog.Title>Enter Password</Dialog.Title>
          <Dialog.Description>
            To update information, Please enter you're password.
          </Dialog.Description>
          <Dialog.Input
            style={styles.textInputAlert}
            onChangeText={(password) => setPassword(password)}
            secureTextEntry={true}
          ></Dialog.Input>
          <Dialog.Button label="Cancel" onPress={handleCancel} />
          <Dialog.Button label="Submit" onPress={handleSubmit} />
        </Dialog.Container>
      </View>
    </KeyboardAvoidingView>
  );
};
//Stylesheet for styling
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    alignSelf: "center",
  },

  textInput: {
    borderColor: Colour.primaryColour,
    paddingLeft: 15,
    borderRadius: 5,
    borderWidth: 2,
    justifyContent: "center",
    padding: scale(3),
    fontFamily: "MonM",
    fontSize: scale(15),
  },
  textInputAlert: {
    borderBottomColor: Colour.primaryColour,
    textAlign: "center",
    borderBottomWidth: 2,
    width: "70%",
    alignSelf: "center",
    fontFamily: "MonM",
    fontSize: scale(15),
  },
  all: {
    padding: scale(3),
    fontFamily: "MonM",
    fontSize: scale(12),
    paddingTop: scale(10),
  },
  delete: {
    fontFamily: "MonM",
    fontSize: scale(14),
    color: "red",
    justifyContent: "flex-end",
    bottom: 0,
    position: "absolute",
    marginBottom: scale(40),
  },
  logout: {
    justifyContent: "center",
    flexDirection: "row",
    padding: scale(10),
    marginTop: scale(20),
    alignItems: "center",
    textAlign: "center",
    borderColor: "black",
    borderWidth: 1,
    fontFamily: "MonM",
  },
  signOut: {
    paddingLeft: scale(10),
  },
});

export default ProfileScreen;
