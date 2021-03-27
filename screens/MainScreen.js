import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import Colour from "../constants/Colour";
import MapView, { Marker } from "react-native-maps";
import * as firebase from "firebase";

import {
  scale,
  verticalScale,
  moderateScale,
} from "../components/ResponsiveText";

import Map from "../components/Map";
import { ScrollView } from "react-native-gesture-handler";
import haversine from "haversine";

const MainScreen = (props) => {
  const dbconnection = firebase.firestore();
  const [businessLoc, setBusinessLoc] = useState({});

  var newSize;
  var longitude;
  var latitude;
  [(longitude = global.longitude)];
  [(latitude = global.latitude)];
  useEffect(() => {
    const haversine = require("haversine");

    const userLoc = {
      longitude: longitude,
      latitude: latitude,
    };

    dbconnection
      .collection("businessDetails")
      .where("quantity", ">", 0)
      .onSnapshot((querySnapshot) => {
        var businessLoc = [];

        querySnapshot.forEach(function (doc) {
          const BusinessLocation = {
            longitude: parseFloat(doc.data().longitude),
            latitude: parseFloat(doc.data().latitude),
          };

          const distance = haversine(userLoc, BusinessLocation).toFixed(2);

          businessLoc.push({
            ...doc.data(),
            key: doc.id,
            distance: distance,
          });
        });

        businessLoc = businessLoc.sort((a, b) => a.distance - b.distance);
        console.log(businessLoc);
        setBusinessLoc(businessLoc);
      });
  }, []);

  const renderCategory = (itemData) => {
    return (
      <TouchableOpacity
        style={styles.Categories}
        onPress={() => {
          props.navigation.navigate({
            routeName: "BusinessList",
            params: {
              BusinessName: itemData.item.name,
              ID: itemData.item.key,
              busLong: parseFloat(itemData.item.longitude),
              busLat: parseFloat(itemData.item.latitude),
            },
          });
        }}
      >
        <View style={styles.item}>
          <View
            style={{
              height: "100%",
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              borderColor: Colour.primaryColour,
              borderWidth: 2,
              borderRadius: 5,
            }}
          >
            <Image
              style={{
                height: "90%",
                width: "90%",
                backgroundColor: "transparent",
              }}
              source={{ uri: itemData.item.image }}
            />
          </View>
          <View style={{ height: "90%", paddingLeft: "2%" }}>
            <Text style={styles.text1}>{itemData.item.name} </Text>
            <Text style={styles.text2}>{itemData.item.quantity} Items</Text>
            <Text style={styles.text3}>{itemData.item.distance} km</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ width: "100%", justifyContent: "flex-end" }}>
      <View style={styles.MapBorder}>
        <Map style={styles.Map} />
      </View>

      <View
        style={{
          alignItems: "center",
          position: "absolute",
          width: "100%",
          height: "40%",
        }}
      >
        <FlatList
          style={{ width: "90%" }}
          data={businessLoc}
          renderItem={renderCategory}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },

  Map: {
    height: "100%",
    width: "100%",
  },

  MapBorder: {
    borderWidth: scale(2),
    borderColor: Colour.primaryColour,
    height: "100%",
  },
  item: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  heading: { justifyContent: "space-evenly", padding: 10 },
  text1: {
    fontFamily: "OpenSans",
    fontSize: scale(20),
    height: "33%",
    color: "white",
  },
  text2: {
    fontFamily: "OpenSans",
    height: "33%",
    color: "white",
    paddingTop: scale(10),
  },

  text3: { fontFamily: "OpenSans", height: "33%", color: "white" },

  sortName: {
    fontSize: scale(30),
    textAlign: "center",
    fontFamily: "OpenSans",
    paddingVertical: scale(10),
  },
  Categories: {
    width: "100%",

    height: scale(80),
    textAlign: "center",
    justifyContent: "flex-end",
    borderWidth: scale(2),
    borderColor: "white",
    borderRadius: 5,
    marginBottom: scale(22),
    backgroundColor: Colour.primaryColour,
    flexDirection: "row",
    elevation: 20,
  },
});

export default MainScreen;
