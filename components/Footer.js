/*
 *
 * ComponentName: Footer.js
 *
 * Date: 28/04/2021
 *
 *
 * @author: Dylan Murphy, X17506166
 *
 * @reference : https://icons.expo.fyi/
 *
 */
import React from "react";
import { View, Text, StyleSheet, Linking } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { scale } from "../components/ResponsiveText";

const Footer = ({ footerColor }) => {
  //Simple footer with links to socials - Colour is used to display the colour of the icons
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: "MonM",
          fontSize: scale(10),
          borderBottomWidth: 1,
          width: scale(100),
          textAlign: "center",
          color: footerColor,
          borderBottomColor: footerColor,
          marginBottom: scale(20),
        }}
      >
        Socials
      </Text>
      <View style={styles.icons}>
        <AntDesign
          name="twitter"
          size={scale(70)}
          color={footerColor}
          onPress={() => {
            Linking.openURL("https://mobile.twitter.com");
          }}
        />
        <AntDesign
          name="facebook-square"
          size={scale(70)}
          color={footerColor}
          onPress={() => {
            Linking.openURL("fb://facebook.com");
          }}
        />
        <AntDesign
          name="linkedin-square"
          size={scale(70)}
          color={footerColor}
          onPress={() => {
            Linking.openURL("https://linkedin.com");
          }}
        />
      </View>
    </View>
  );
};
//Stylesheet for styling
const styles = StyleSheet.create({
  icons: {
    flexDirection: "row",
  },
  container: {
    alignItems: "center",
    paddingTop: scale(20),
    marginBottom: scale(-70),
  },
});

export default Footer;
