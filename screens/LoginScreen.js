import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Colour from "../constants/Colour";
import Raleway from "../assets/fonts/Raleway-VariableFont_wght.ttf";

const LoginScreen = (props) => {
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
          props.navigation.navigate({ routeName: "Main" });
        }}
      />

      <Text
        style={styles.all}
        onPress={() => {
          props.navigation.navigate({ routeName: "Main" });
        }}
      >
        Forgotten Your Password?
      </Text>

      <Text
        style={styles.all}
        onPress={() => {
          props.navigation.navigate({ routeName: "Register" });
        }}
      >
        New to Food Rescue?
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
    borderWidth: 2,
    width: 150,
  },

  all: {
    padding: 20,
    fontFamily: "Raleway",
    fontWeight: "bold",
  },
  Logo: {
    paddingTop: 40,
    paddingBottom: 40,
  },
});

export default LoginScreen;
