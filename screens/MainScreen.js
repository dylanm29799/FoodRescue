import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { CATEGORIES } from "../Data/SortDataExample";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Colour from "../constants/Colour";
import MapView from "react-native-maps";
import Raleway from "../assets/fonts/Raleway-VariableFont_wght.ttf";
import { BUSINESS } from "../Data/BusinessDataExample";
const renderCategory = (itemData) => {
  return (
    <TouchableOpacity
      style={styles.Categories}
      onPress={() => {
        props.navigation.navigate({
          routeName: "Main",
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
        <Text style={styles.text3}>{itemData.item.distance}</Text>
      </View>
    </TouchableOpacity>
  );
};

const MainScreen = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.Icons}>
        <MaterialIcons
          style={styles.sort}
          name="sort"
          size={50}
          color="black"
        />
        <Image source={require("../assets/Logo.png")} />
        <AntDesign style={styles.profile} name="user" size={50} color="black" />
      </View>
      <View style={{ borderWidth: 2, borderColor: Colour.primaryColour }}>
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

      <View>
        <Text
          style={{
            fontSize: 40,
            textAlign: "center",
            fontFamily: "Raleway",
            paddingBottom: 10,
          }}
        >
          Close To You
        </Text>

        <FlatList data={BUSINESS} renderItem={renderCategory} numColumns={1} />
      </View>
    </View>
  );
};
//<Text>{selectedCategory.title}</Text>
//const SortID = props.navigation.getParam("SortID");
//const selectedCategory = CATEGORIES.find((sort) => sort.id === SortID);
const styles = StyleSheet.create({
  screen: {
    flexDirection: "column",
    justifyContent: "space-around",
  },
  Icons: {
    flexDirection: "row",
    alignContent: "center",
  },

  sort: {
    flex: 1,
    justifyContent: "space-around",
  },

  profile: {
    textAlign: "right",
    flex: 1,
    justifyContent: "space-around",
  },
  Map: {
    height: 200,
    width: "100%",
  },
  item: {
    flex: 1,

    marginBottom: 30,
    borderWidth: 3,
    borderColor: Colour.primaryColour,
    padding: 5,
  },
  heading: {
    flexDirection: "row",
  },
  text1: {
    flex: 1,
    width: "50%",
    paddingLeft: "5%",
    fontSize: 20,
  },
  text2: { width: "50%", textAlign: "right", paddingRight: "5%", fontSize: 20 },

  text3: {
    paddingLeft: "5%",
    fontSize: 20,
  },
});

export default MainScreen;
