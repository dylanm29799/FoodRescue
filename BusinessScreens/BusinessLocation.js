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
 * @reference : https://docs.expo.io/versions/latest/sdk/location/#usage
 *
 *
 */
import React from "react";
import { Text, View, StyleSheet } from "react-native";

import Colour from "../constants/Colour";
import { scale } from "../components/ResponsiveText";
import BusinessMap from "../components/businessMap";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "firebase";
import "firebase/firestore";

const BusinessLocation = (props) => {
  //getting user id and firebase connection
  const dbconnection = firebase.firestore();
  var user = firebase.auth().currentUser;
  var uid = " ";
  try {
    uid = user.uid;
  } catch (err) {
    console.log(err);
  }
  var docRef = dbconnection.collection("businessDetails").doc(uid);
  //Getting user longitude and latitude from App.js
  let longitude = null;
  let latitude = null;
  [(longitude = global.longitude)];
  [(latitude = global.latitude)];
  [console.log(global.latitude, global.longitude)];
  const long = longitude;
  const lat = latitude;
  console.log(long, lat);

  correctLocation = () => {
    //Updating longitude and latitude based on users location
    docRef.get().then(function (doc) {
      if (doc.exists) {
        console.log("Your details have been updated.");
        return docRef
          .update({
            longitude: longitude,
            latitude: latitude,
          })
          .then(function () {
            console.log("Document successfully updated!");
            props.navigation.navigate({ routeName: "BusinessHome" });
          })
          .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
      }
    });
  };

  return (
    //Choose either location is correct or that the location is not correct
    <View style={styles.container}>
      <BusinessMap style={styles.Map} />

      <View style={styles.textOverMap}>
        <TouchableOpacity style={styles.touchable} onPress={correctLocation}>
          <Text style={styles.text}>This is Your Location?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() =>
            props.navigation.navigate({ routeName: "CorrectLocation" })
          }
        >
          <Text style={styles.text}>This is Not your Location?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
//Stylesheet for styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  paragraph: {
    flex: 1,
  },

  Map: {
    width: "100%",
    height: "100%",
  },
  textOverMap: {
    position: "absolute",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",

    marginTop: scale(20),
  },
  touch: { flex: 1, marginHorizontal: scale(5) },
  text: {
    fontSize: scale(20),
    borderColor: Colour.primaryColour,
    borderWidth: scale(2),
    width: scale(150),
    backgroundColor: "#fff",
    borderRadius: scale(50),
    height: scale(100),
    textAlign: "center",
    paddingTop: scale(30),
    marginHorizontal: scale(5),
  },
});

export default BusinessLocation;
