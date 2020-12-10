import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { CATEGORIES } from "../Data/SortDataExample";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Colour from "../constants/Colour";
import MapView from "react-native-maps";
import Raleway from "../assets/fonts/Raleway-VariableFont_wght.ttf";

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
      <View>
        <MapView
          style={{
            height: 200,
            width: "100%",
            borderWidth: 3,
            borderColor: Colour.secondaryColour,
          }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>

      <View>
        <Text
          style={{ fontSize: 40, textAlign: "center", fontFamily: "Raleway" }}
        >
          {"\n"}Close To You
        </Text>
        <FlatList></FlatList>
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
  Map: {},
});

export default MainScreen;
