import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Colour from "../constants/Colour";
import haversine from "haversine";
import * as firebase from "firebase";

import { scale } from "../components/ResponsiveText";

import Map from "../components/Map";

const MainScreen = (props) => {
  const dbconnection = firebase.firestore();
  const [businessLoc, setBusinessLoc] = useState({});
  var sort = "";

  try {
    sort = props.navigation.getParam("SortID");
  } catch (err) {
    console.log(err);
  }
  var longitude;
  var latitude;
  const [message, setMessage] = useState(
    "Nothing Found, Please try another category"
  );

  [(longitude = global.longitude)];
  [(latitude = global.latitude)];
  useEffect(() => {
    const userLoc = {
      longitude: longitude,
      latitude: latitude,
    };

    dbconnection.collection("businessDetails").onSnapshot((querySnapshot) => {
      var businessLoc = [];

      querySnapshot.forEach(function (doc) {
        const BusinessLocation = {
          longitude: parseFloat(doc.data().longitude),
          latitude: parseFloat(doc.data().latitude),
        };

        var distance = haversine(userLoc, BusinessLocation) - 29;
        distance = distance.toFixed(2);

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
    if (itemData.item.Status == true) {
      if (sort == "" || sort == itemData.item.sortName || sort == undefined) {
        setMessage("");
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

                <Text style={styles.text3}>{itemData.item.distance} km</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      } else {
        setMessage("Nothing Found, Please try another category");
      }
    }
  };

  const EmptyListMessage = () => {
    return (
      // Flat List Item
      <Text style={styles.emptyListStyle}>No Data Found</Text>
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
        <Text style={styles.sortName}>{sort} </Text>
        <FlatList
          style={{ width: "90%" }}
          data={businessLoc}
          ListEmptyComponent={EmptyListMessage}
          renderItem={renderCategory}
        />
        <Text style={styles.missing}>{message}</Text>
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
    fontFamily: "MonM",
    fontSize: scale(20),
    height: "33%",
    color: "white",
  },
  text2: {
    fontFamily: "MonM",
    height: "33%",
    color: "white",
    paddingTop: scale(10),
  },

  text3: { fontFamily: "MonM", height: "33%", color: "white" },

  sortName: {
    fontSize: scale(20),
    textAlign: "center",
    fontFamily: "MonL",
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
  missing: {
    fontSize: scale(25),
    fontFamily: "MonM",
    textAlign: "center",
    position: "absolute",
    paddingTop: 100,
  },
});

export default MainScreen;
