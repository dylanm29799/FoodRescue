import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { CATEGORIES } from "../Data/SortDataExample";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Colour from "../constants/Colour";

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
        <Image
          resizeMode={"cover"}
          style={{
            width: "100%",
            height: 300,
            borderWidth: 2,
            borderColor: Colour.secondaryColour,
          }}
          source={require("../assets/Map.png")}
        />
        <Text style={{ fontSize: 40, textAlign: "center" }}>
          {"\n"}Close To You
        </Text>
      </View>

      <View>
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
