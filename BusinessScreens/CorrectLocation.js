/*
 *
 * ClassName: CorrectLocation.js
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
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { scale } from "../components/ResponsiveText";
import Colour from "../constants/Colour";
import Geocoder from "react-native-geocoding";
import MapView, { Marker } from "react-native-maps";
import * as firebase from "firebase";
import "firebase/firestore";

const CorrectLocation = (props) => {
  //Firebase link
  const dbconnection = firebase.firestore();
  //Geocoder API Key
  Geocoder.init("AIzaSyAZHSAnfYc7nm3UbyJtJr_NgLIKmZf-Tfk", { language: "en" });
  //User details
  var user = firebase.auth().currentUser;
  //State for geocode location
  const [geoCode, setGeoCode] = useState("");
  //Example location for map
  const [lng, setLng] = useState(-6.2603);
  const [lat, setLat] = useState(53.3498);
  //Geocoder - Take location from state and set the longitude and latitude of the area that matches the best with the geocode provided
  const runGeocode = () => {
    Geocoder.from(geoCode)
      .then((json) => {
        var location = json.results[0].geometry.location;
        console.log(location);
        setLat(location.lat);
        setLng(location.lng);
      })
      .catch((error) => console.warn(error));
  };

  const runUpdate = () => {
    //Update the location in firebase
    dbconnection
      .collection("businessDetails")
      .doc(user.uid)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Success");
          return dbconnection
            .collection("businessDetails")
            .doc(user.uid)
            .update({ longitude: lng, latitude: lat });
        }
      })
      .then(function () {
        console.log("Navigating");
        //Navigate to the business home
        props.navigation.navigate({ routeName: "BusinessHome" });
      });
  };

  return (
    <View style={styles.Screen}>
      <Text style={styles.text}>Please enter your address here:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="18 City Quay, Dublin"
        onChangeText={setGeoCode}
      ></TextInput>

      <TouchableOpacity onPress={runGeocode} style={styles.touchable}>
        <Text style={styles.touchableText}>Check</Text>
      </TouchableOpacity>

      <MapView
        style={{ width: "80%", height: "30%" }}
        region={{
          longitude: lng,
          latitude: lat,
          latitudeDelta: 0.02,
          longitudeDelta: 0.0,
        }}
      >
        <Marker
          coordinate={{ latitude: lat, longitude: lng }}
          pinColor={Colour.primaryColour}
          title={"Business Name"}
        />
      </MapView>
      <Text style={styles.text}>
        Once you're happy with your address, click Submit
      </Text>
      <Text style={{ paddingVertical: scale(2) }}></Text>
      <TouchableOpacity onPress={runUpdate} style={styles.touchable}>
        <Text style={styles.touchableText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};
//Stylesheet for styling
const styles = StyleSheet.create({
  Screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: scale(16),
    fontFamily: "MonM",
    textAlign: "center",
    maxWidth: "80%",
    paddingTop: scale(30),
  },
  textInput: {
    borderBottomColor: Colour.primaryColour,
    borderBottomWidth: 2,
    width: "80%",
    marginVertical: scale(10),
    paddingTop: scale(10),
    textAlign: "center",
    fontFamily: "MonM",
  },
  touchable: {
    height: scale(30),
    width: scale(70),
    backgroundColor: Colour.primaryColour,
    justifyContent: "center",
    marginBottom: scale(15),
    marginHorizontal: scale(10),
  },
  touchableText: {
    color: "#fff",
    fontFamily: "MonB",

    textAlign: "center",
    fontSize: scale(12),
  },
});

export default CorrectLocation;
