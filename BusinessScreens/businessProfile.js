import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  KeyboardAvoidingView,
  Touchable,
  TouchableOpacity,
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
  const [name, setName] = useState("");

  const [number, setNumber] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [password, setPassword] = useState("");

  const [textName, setTextName] = useState("Name");
  const dbconnection = firebase.firestore();
  var user = firebase.auth().currentUser;
  var uid = user.uid;
  var docRef;
  let validation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  useEffect(() => {
    if (user) {
      // User is signed in.
      docRef = dbconnection.collection("businessDetails").doc(uid);

      docRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            setTextName("First Name");
            setEmail(doc.data().email);
            setName(doc.data().name);

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
        console.log(collectionName);

        Alert.alert("Worked", "Your details have been updated.");
        console.log(email, name, number, password);
        docRef.update({
          name: name,
          email: email,
          number: number,
        });
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        Alert.alert("Error", "Your Password is incorrect, please try again");
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
                  .collection("businessDetails")
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.screen}
    >
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
    fontFamily: "OpenSans",
    fontSize: scale(15),
  },
  textInputAlert: {
    borderBottomColor: Colour.primaryColour,
    textAlign: "center",
    borderBottomWidth: 2,
    width: "70%",
    alignSelf: "center",
    fontFamily: "OpenSans",
    fontSize: scale(15),
  },
  all: {
    padding: scale(3),
    fontFamily: "OpenSans",
    fontSize: scale(12),
  },
  delete: {
    fontFamily: "OpenSans",
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
    fontFamily: "OpenSans",
  },
  signOut: {
    paddingLeft: scale(10),
  },
});

export default ProfileScreen;
