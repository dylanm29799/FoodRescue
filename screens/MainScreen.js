import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CATEGORIES } from "../Data/SortDataExample";

const MainScreen = (props) => {
  const SortID = props.navigation.getParam("SortID");

  const selectedCategory = CATEGORIES.find((sort) => sort.id === SortID);
  return (
    <View style={styles.screen}>
      <Text>The Main Screen</Text>
    </View>
  );
};
//<Text>{selectedCategory.title}</Text>
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MainScreen;
