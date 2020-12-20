import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, Button } from "react-native";
import Colour from "../constants/Colour";
import { scale } from "../components/ResponsiveText";

const BusinessRegister = (props) => {
  const [name, setName] = useState("");
  return (
    <View style={styles.screen}>
      <View style={styles.Logo}>
        <Image source={require("../assets/Logo.png")} />
      </View>
      <Text style={styles.all}>Business Name </Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setName(value)}
      />

      <Text style={styles.all}>Business Email</Text>
      <TextInput style={styles.input} />

      <Text style={styles.all}>Food Category</Text>
      <TextInput style={styles.input} />

      <Text style={styles.all}>Contact Phone </Text>
      <TextInput style={styles.input} keyboardType="numeric" />

      <Text style={styles.all}>Public Phone Number for Customers</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="0890823212"
      />

      <Button
        color={Colour.primaryColour}
        title="Submit"
        onPress={() => {
          props.navigation.navigate({ routeName: "BusinessLocation" });
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
    fontSize: scale(12),
  },
  Logo: {
    paddingTop: 40,
    paddingBottom: 40,
  },
});

export default BusinessRegister;
