import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { CATEGORIES } from "../Data/SortDataExample";
import Colours from "../constants/Colour";

const SortScreen = (props) => {
  const renderCategory = (itemData) => {
    return (
      <TouchableOpacity
        style={styles.Categories}
        onPress={() => {
          props.navigation.navigate({
            routeName: "Main",
            params: {
              SortID: itemData.item.id,
            },
          });
        }}
      >
        <View>
          <Text>{itemData.item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList data={CATEGORIES} renderItem={renderCategory} numColumns={2} />
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Categories: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: 30,
  },
});

export default SortScreen;
