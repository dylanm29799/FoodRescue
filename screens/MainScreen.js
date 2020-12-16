import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Colour from "../constants/Colour";
import MapView from "react-native-maps";
import Raleway from "../assets/fonts/Raleway-VariableFont_wght.ttf";
import { BUSINESS } from "../Data/BusinessDataExample";
import { CATEGORIES } from "../Data/SortDataExample";
import {
  scale,
  verticalScale,
  moderateScale,
} from "../components/ResponsiveText";

const MainScreen = (props) => {
  const renderCategory = (itemData) => {
    return (
      <TouchableOpacity
        style={styles.Categories}
        onPress={() => {
          props.navigation.navigate({
            routeName: "BusinessList",
            params: {
              BusinessID: itemData.item.id,
            },
          });
        }}
      >
        <View style={styles.item}>
          <View style={styles.heading}>
            <Text style={styles.text1}>{itemData.item.title}</Text>
            <Text style={styles.text2}>
              {itemData.item.items} <Text> Items</Text>
            </Text>
          </View>
          <Text style={styles.text3}>{itemData.item.distance};</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const SortID = props.navigation.getParam("SortID");
  //prettier-ignore
  const selectedCategory = CATEGORIES.find(sort => sort.id === SortID);

  const displayMessage = () => {
    if (selectedCategory === undefined) {
      return <Text style={styles.sortName}>Close to you</Text>;
    } else {
      return <Text style={styles.sortName}>{selectedCategory.title}</Text>;
    }
  };
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
        {displayMessage()}
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

export default MainScreen;
