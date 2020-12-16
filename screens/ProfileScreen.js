import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Colour from "../constants/Colour";

const FLATLISTDATA = [
  {
    title: "Name:",
    input: "Name",
  },
  {
    title: "Email:",
    input: "Email",
  },
  {
    title: "Phone Number:",
    input: "Phone Number",
  },
];
const Item = ({ title, input }) => (
  <View style={styles.item}>
    <Text>{title}</Text>
    <TextInput
      multiline={true}
      style={styles.title}
      placeholder={input}
    ></TextInput>
  </View>
);
const renderItem = ({ item }) => <Item title={item.title} />;

const ProfileScreen = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.flat}>
        <FlatList data={FLATLISTDATA} renderItem={renderItem} />
      </View>

      <Button
        style={{ position: "absolute" }}
        color={Colour.primaryColour}
        title="Submit"
        onPress={() => {
          props.navigation.navigate({ routeName: "Main" });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  item: {
    paddingVertical: 20,
  },

  title: {
    borderBottomWidth: 1,
    borderBottomColor: Colour.primaryColour,
  },

  flat: { width: "80%", paddingVertical: 20, height: "50%" },
});

export default ProfileScreen;
