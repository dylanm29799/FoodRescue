import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import * as firebase from "firebase";
import MapView, { Marker } from "react-native-maps";
import Colour from "../constants/Colour";
import { scale } from "./ResponsiveText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

Map = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [businessLoc, setBusinessLoc] = useState([]);
  const dbconnection = firebase.firestore();
  useEffect(() => {
    //prettier-ignore
    dbconnection.collection('businessDetails').onSnapshot((querySnapshot) => {
    const businessLoc = [];

    querySnapshot.forEach((doc) => {
      businessLoc.push({
        ...doc.data(),
        key: doc.data().email,
      });
     
    });
    
    setBusinessLoc(businessLoc);
  });
  }, []);

  let long = -6.243367195129395;
  let lat = 53.34900146651947;

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
