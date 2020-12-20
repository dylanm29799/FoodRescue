import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { scale } from "../components/ResponsiveText";
import Colour from "../constants/Colour";

const CorrectLocation = (props) => {
  return (
    <View style={styles.Screen}>
      <Text style={styles.text}>Please Input your Longitude and Latitude</Text>
      <Text
        style={styles.text}
        onPress={() => Linking.openURL("https://www.latlong.net/")}
      >
        You can find your Longitude and Latitude{" "}
        <Text
          style={{
            textDecorationLine: "underline",
            color: Colour.primaryColour,
          }}
        >
          here
        </Text>
      </Text>
      <TextInput style={styles.textInput} placeholder="Longitude"></TextInput>
      <TextInput style={styles.textInput} placeholder="Latitude"></TextInput>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate({
            routeName: "BusinessHome",
          });
        }}
        style={styles.touchable}
      >
        <Text style={styles.touchableText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: scale(13),
  },
  textInput: {
    borderBottomColor: Colour.primaryColour,
    borderBottomWidth: 2,
    width: "50%",
    marginVertical: scale(10),
    paddingTop: scale(10),
  },
  touchable: {
    height: scale(30),
    width: scale(70),
    backgroundColor: Colour.primaryColour,
    justifyContent: "center",
    marginTop: scale(15),
    marginHorizontal: scale(10),
  },
  touchableText: {
    color: "#fff",
    fontFamily: "Raleway",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: scale(12),
  },
});

export default CorrectLocation;
