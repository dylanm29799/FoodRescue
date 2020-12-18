import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { scale } from "../components/ResponsiveText";
import Raleway from "../assets/fonts/Raleway-VariableFont_wght.ttf";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Colour from "../constants/Colour";

//Getting All Params

const ItemDetailScreen = (props) => {
  const time = () => {
    if (props.navigation.getParam("Time") === undefined) {
      return;
    } else {
      return props.navigation.getParam("Time") + " hours left!";
    }
  };

  const image = props.navigation.getParam("Image");
  const title = props.navigation.getParam("Title");
  const quantity = props.navigation.getParam("Quantity");
  const initialPrice = props.navigation.getParam("InitialPrice");
  const price = props.navigation.getParam("Price");
  const newTime = time();

  return (
    <View style={styles.screen}>
      <View style={styles.combined}>
        <View style={styles.shadow}>
          <Image
            style={{
              alignSelf: "center",
              height: "100%",
              width: "100%",
              borderWidth: 1,

              flex: 1,
            }}
            source={{ uri: image }}
            resizeMode="stretch"
          />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.quantity}>There are only {quantity} left!</Text>
      <View style={styles.icons}>
        <Entypo name="minus" size={scale(30)} color={Colour.primaryColour} />
        <TextInput
          style={{
            width: "12%",
            textAlign: "center",
            fontSize: scale(20),
            borderBottomWidth: 1,
            borderColor: Colour.primaryColour,
            paddingTop: scale(1),
          }}
          keyboardType="numeric"
        >
          0
        </TextInput>
        <MaterialCommunityIcons
          name="plus-outline"
          size={scale(30)}
          color={Colour.primaryColour}
        />
      </View>
      <TouchableOpacity
        style={{
          height: scale(20),
          width: scale(60),
          backgroundColor: Colour.primaryColour,
          justifyContent: "center",
          marginTop: scale(30),
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontFamily: "Raleway",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Add to Cart
        </Text>
      </TouchableOpacity>
      <Text style={styles.time}>{newTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,

    alignItems: "center",
  },
  shadow: {
    elevation: 20,
    shadowColor: Colour.primaryColour,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    height: scale(220),
    width: scale(250),
    borderWidth: 2,
    borderColor: Colour.primaryColour,
  },
  combined: {
    textAlign: "center",
    marginTop: scale(30),
  },

  title: {
    fontFamily: "Raleway",
    fontWeight: "600",
    textAlign: "center",
    fontSize: scale(20),
    marginTop: scale(30),
  },

  quantity: {
    fontFamily: "Raleway",
    fontWeight: "600",
    textAlign: "center",
    fontSize: scale(25),
    marginTop: scale(30),
  },
  initialPrice: {
    fontFamily: "Raleway",
    fontWeight: "600",
    textAlign: "center",
    fontSize: scale(25),
  },

  price: {
    fontFamily: "Raleway",
    fontWeight: "600",
    textAlign: "center",
    fontSize: scale(25),
  },

  icons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: scale(30),
  },

  time: {
    fontFamily: "Raleway",
    fontWeight: "600",
    textAlign: "center",
    fontSize: scale(25),
    marginTop: scale(30),
  },
});

export default ItemDetailScreen;
