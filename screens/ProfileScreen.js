import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Colour from "../constants/Colour";
import ButtonCustom from "../constants/ButtonCustom";
import * as firebase from "firebase";
import { scale } from "../components/ResponsiveText";
import Dialog from "react-native-dialog";
import { AntDesign } from "@expo/vector-icons";
const ProfileScreen = (props) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [password, setPassword] = useState("");

  const dbconnection = firebase.firestore();
  var user = firebase.auth().currentUser;
  const [uid, setUid] = useState("");
  try {
    setUid(user.uid);
    var docRef = dbconnection.collection("userDetails").doc(uid);
  } catch (err) {
    console.log(err);
  }

  let validation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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
  useEffect(() => {
    if (user) {
      // User is signed in.

      console.log(user.uid);
      docRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            setEmail(doc.data().email);
            setFirstName(doc.data().firstName);
            setLastName(doc.data().lastName);
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
    setConfirm(false);
    // The user has pressed the "Submit" button
    docRef.get().then(function (doc) {
      if (doc.exists) {
        Alert.alert("Worked", "Your details have been updated.");
        console.log(email, firstName, lastName, number, password);
        return docRef
          .update({
            firstName: firstName,
            lastName: lastName,
            email: email,
            number: number,
          })
          .then(function () {
            console.log("Document successfully updated!");

            firebase
              .auth()
              .signInWithEmailAndPassword(doc.data().email, password)
              .then(function (userCredential) {
                userCredential.user.updateEmail(email);
              });
          })
          .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
      }
    });
  };

  onButtonPress = () => {
    if (!email.trim() || validation.test(email) === false) {
      alert("Please Enter a valid Email");
      return;
    } else if (number.length != 10) {
      Alert.alert("Error", "Please Enter a valid Irish Number");
    } else if (!firstName.trim() || firstName.length < 3) {
      Alert.alert("Error", "Your first name must be longer than 3 letters");
    }
    if (!lastName.trim() || firstName.length < 3) {
      alert("Your Last name must be longer than 3 letters");
    } else {
      setConfirm(true);
    }
  };
  deleteProfile = () => {
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
                dbconnection
                  .collection("userDetails")
                  .doc(user.uid)
                  .delete()
                  .then(function () {
                    console.log("Document successfully deleted!");
                  })
                  .catch(function (error) {
                    console.error("Error removing document: ", error);
                  });
                props.navigation.navigate({ routeName: "Login" });
              })
              .catch(function (error) {
                // An error happened.
                console.log("Error Happened", error);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.screen}>
      <View
        style={{
          width: "100%",
          justifyContent: "center",

          paddingBottom: scale(30),
        }}
      >
        <Text style={styles.all}> First Name:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(firstName) => setFirstName(firstName)}
        >
          {firstName}
        </TextInput>
        <Text style={styles.all}> Last Name:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(lastName) => setLastName(lastName)}
        >
          {lastName}
        </TextInput>

        <Text style={styles.all}> Your Phone Number:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(number) => setNumber(number)}
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
      </View>
      <ButtonCustom title="Submit" onPress={onButtonPress} />
      <View style={styles.logout} onPress={onSignOut}>
        <AntDesign name="logout" size={30} color="black" onPress={onSignOut} />
        <Text onPress={onSignOut} style={styles.signOut}>
          Log Out
        </Text>
      </View>
      <Text onPress={deleteProfile} style={styles.delete}>
        Delete Account
      </Text>

      <View>
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
    </View>
  );
};

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
