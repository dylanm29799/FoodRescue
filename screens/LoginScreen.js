import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Colour from "../constants/Colour";
import Raleway from "../assets/fonts/Raleway-VariableFont_wght.ttf";
import { scale } from "../components/ResponsiveText";
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

      <Text
        style={styles.all}
        onPress={() => {
          props.navigation.navigate({ routeName: "BusinessLogin" });
        }}
      >
        Click Here for Business Login
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
  },
  Logo: {
    paddingTop: 40,
    paddingBottom: 40,
  },
});

export default LoginScreen;
