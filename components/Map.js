/*
 *
 * ComponentName: Map.js
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
 *
 */
import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import * as firebase from "firebase";
import MapView, { Marker } from "react-native-maps";
import Colour from "../constants/Colour";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

Map = () => {
  //Setting business Location state
  const [businessLoc, setBusinessLoc] = useState([]);
  //Connection to firebase
  const dbconnection = firebase.firestore();
  useEffect(() => {
    //Getting business locations
    //prettier-ignore
    dbconnection.collection('businessDetails').onSnapshot((querySnapshot) => {
    //creating array
      const businessLoc = [];
//pushing each business location to the array
    querySnapshot.forEach((doc) => {
      businessLoc.push({
        ...doc.data(),
        key: doc.data().email,
      });
     
    });
    //pushing this array to an object
    setBusinessLoc(businessLoc);
  });
  }, []);
  //Predefined longitude and latitude
  let long = -6.243367195129395;
  let lat = 53.34900146651947;
  //User longitude and latitude
  [(long = global.longitude)];
  [(lat = global.latitude)];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.Map}
        region={{
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.02,
          longitudeDelta: 0.0,
        }}
      >
        <Marker
          coordinate={{ latitude: lat, longitude: long }}
          title={"You"}
          description={"Your Location"}
        >
          <MaterialCommunityIcons
            name="home-map-marker"
            size={50}
            color={Colour.primaryColour}
          />
        </Marker>

        {businessLoc.map((marker) => (
          //Mapping each location to a marker in the mapview
          <Marker
            key={marker.email}
            coordinate={{
              latitude: parseFloat(marker.latitude),
              longitude: parseFloat(marker.longitude),
            }}
            title={marker.name}
          >
            <Feather name="map-pin" size={40} color="green" />
          </Marker>
        ))}
      </MapView>
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
});

export default function Map() {}
