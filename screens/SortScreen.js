import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Image,
} from "react-native";
import { scale } from "../components/ResponsiveText";
import { CATEGORIES } from "../Data/SortDataExample";
import Colours from "../constants/Colour";

const SortScreen = (props) => {
  const renderCategory = (itemData) => {
    console.log(itemData.item.image);
    return (
      <TouchableOpacity
        style={styles.Categories}
        onPress={() => {
          props.navigation.navigate({
            routeName: "Main",
            params: {
              SortID: itemData.item.title,
            },
          });
        }}
      >
        <Image
          style={{ width: "100%", height: scale(150) }}
          source={itemData.item.image}
        />
        <Text
          style={{
            fontFamily: "MonM",
            fontSize: scale(20),
            textAlign: "center",
            color: "",
          }}
        >
          {itemData.item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      <TouchableOpacity
        style={styles.anyCategory}
        onPress={() => {
          props.navigation.navigate({
            routeName: "Main",
            params: {
              SortID: "",
            },
          });
        }}
      >
        <Text
          style={{
            fontFamily: "MonB",
            fontSize: scale(20),
            textAlign: "center",
            color: "black",
          }}
        >
          Show Everything
        </Text>
      </TouchableOpacity>
      <FlatList
        data={CATEGORIES}
        renderItem={renderCategory}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { height: "100%" },
  Categories: {
    justifyContent: "space-evenly",

    height: scale(200),
    borderWidth: 2,
    backgroundColor: "#ffecd2",
  },

  anyCategory: {
    justifyContent: "space-evenly",
    width: "100%",
    height: scale(80),

    backgroundColor: "#ffecd2",
    color: "white",
  },
});

export default SortScreen;
