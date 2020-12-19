import React from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Colour from "../constants/Colour";
import Raleway from "../assets/fonts/Raleway-VariableFont_wght.ttf";
import { scale } from "../components/ResponsiveText";

const RegisterScreen = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.Logo}>
        <Image source={require("../assets/Logo.png")} />
      </View>
      <Text style={styles.all}>First Name</Text>
      <TextInput style={styles.input} placeholder="John" />

      <Text style={styles.all}>Last Name</Text>
      <TextInput style={styles.input} placeholder="Doe" />

      <Text style={styles.all}>Email</Text>
      <TextInput style={styles.input} placeholder="JohnDoe@gmail.com" />

      <Text style={styles.all}>Password</Text>
      <TextInput style={styles.input} />

      <Text style={styles.all}>Repeat Password</Text>
      <TextInput style={styles.input} />

      <Text style={styles.all}>Phone Number</Text>
      <TextInput style={styles.input} placeholder="0832122122" />

      <Text>{"\n"}</Text>

      <Button
        color={Colour.primaryColour}
        title="Register"
        onPress={() => {
          props.navigation.navigate({ routeName: "Login" });
        }}
      />
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

export default RegisterScreen;
