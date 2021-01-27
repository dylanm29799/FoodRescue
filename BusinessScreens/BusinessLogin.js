import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Colour from "../constants/Colour";
import Raleway from "../assets/fonts/Raleway-VariableFont_wght.ttf";
import { scale } from "../components/ResponsiveText";

const BusinessLogin = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.Logo}>
        <Image source={require("../assets/Logo.png")} />
      </View>

      <Text style={styles.all}>Email</Text>
      <TextInput style={styles.input} />
      <Text style={styles.all}>Password</Text>
      <TextInput style={styles.input} />
      <Text>{"\n"}</Text>

      <Button
        color={Colour.primaryColour}
        title="Login"
        onPress={() => {
          props.navigation.navigate({ routeName: "BusinessHome" });
        }}
      />

      <Text
        style={styles.all}
        onPress={() => {
          props.navigation.navigate({ routeName: "forgotPassword" });
        }}
      >
        Forgotten Your Password?
      </Text>

      <Text
        style={styles.all}
        onPress={() => {
          props.navigation.navigate({ routeName: "BusinessRegister" });
        }}
      >
        Does your business want to reduce waste while making money?
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,

    alignItems: "center",
  },

  input: {
    borderBottomWidth: 2,
    borderBottomColor: Colour.primaryColour,
    width: "80%",
    paddingVertical: scale(3),
    paddingHorizontal: scale(10),
    textAlign: "center",
  },

  all: {
    padding: 20,
    fontSize: scale(10),
  },
  Logo: {
    paddingTop: 40,
    paddingBottom: 40,
  },
});

export default BusinessLogin;
