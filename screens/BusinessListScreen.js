import React from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import {
  scale,
  verticalScale,
  moderateScale,
} from "../components/ResponsiveText";
import Colour from "../constants/Colour";
import MapView from "react-native-maps";

const BusinessListScreen = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.MapBorder}>
        <MapView
          style={styles.Map}
          initialRegion={{
            latitude: 53.34900146651947,
            longitude: -6.243367195129395,
            latitudeDelta: 0,
            longitudeDelta: 0.05,
          }}
        />
      </View>

      <View style={{ paddingTop: "15%" }}>
        <FlatList
          style={{ overflow: "scroll" }}
          data={BUSINESS}
          renderItem={renderCategory}
          numColumns={1}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexDirection: "column",
    justifyContent: "space-around",
  },

  Map: {
    height: "100%",
    width: "100%",
  },

  MapBorder: {
    borderWidth: scale(2),
    borderColor: Colour.primaryColour,
    position: "relative",
    height: scale(330),
  },
  item: {
    marginBottom: scale(20),
    borderWidth: scale(2),
    borderColor: Colour.primaryColour,
    padding: scale(2),
    overflow: "scroll",
  },
  heading: {
    flexDirection: "row",
    overflow: "scroll",
  },
  text1: {
    width: "50%",
    paddingLeft: "5%",
    fontSize: scale(15),
  },
  text2: {
    width: "50%",
    textAlign: "right",
    paddingRight: "5%",
    fontSize: scale(15),
  },

  text3: {
    paddingLeft: "5%",
    fontSize: scale(15),
  },

  sortName: {
    fontSize: scale(30),
    textAlign: "center",
    fontFamily: "Raleway",
    paddingVertical: scale(10),
  },
});

export default BusinessListScreen;
