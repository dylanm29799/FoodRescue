import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Colour from "../constants/Colour";
import { scale } from "../components/ResponsiveText";
import Map from "../components/Map";

const aboutus = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Who are We</Text>
      <Text style={styles.text}>
        We are Food Rescue and our goal is to try save the planet!
      </Text>
      <Text style={styles.text}>
        Okay, we wont be singly involved in saving the planet. Our goal is to
        take food waste that a business might produce and give it back to out
        customers at a lower cost
      </Text>
      <View style={styles.How}>
        <Text style={styles.heading}> How it works</Text>
        <Text style={styles.text}>
          1. A business uploads their products that they want to sell
        </Text>
        <Text style={styles.text}>
          2. A User (You!) can buy products that would otherwise go to waste
        </Text>
        <Text style={styles.text}>
          3. The business makes money while also saving the planet
        </Text>
        <Text style={styles.text}>
          4. The user saves money while knowing they are saving the environment!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: { fontWeight: "bold", fontSize: scale(15) },
  text: {
    textAlign: "center",
    fontSize: scale(13),
  },
  How: {
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: scale(100),
  },
});

export default aboutus;
