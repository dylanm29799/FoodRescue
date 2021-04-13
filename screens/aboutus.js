import React from "react";
import { Text, View, StyleSheet } from "react-native";

import { scale } from "../components/ResponsiveText";

const aboutus = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Who are We</Text>
      <Text style={styles.text}>
        We are Food Rescue and our goal is to try and save food!
      </Text>
      <Text style={styles.text}>
        Okay, we wont be solely involved in saving every bit of food. Our goal
        is to take food waste that a business might produce and sell it to
        customers at a lower price!
      </Text>
      <View style={styles.How}>
        <Text style={styles.heading}> How it works</Text>
        <Text style={styles.text}>
          1. A business uploads their products that they want to sell
        </Text>
        <Text style={styles.text}>
          2. You can buy products that would otherwise go to waste
        </Text>
        <Text style={styles.text}>
          3. The business saves money and sells food that would've went to waste
        </Text>
        <Text style={styles.text}>
          4. You save money while knowing you are helping the environment!
        </Text>
        <Text style={styles.text}>Win-win!</Text>
      </View>

      <View style={styles.How}>
        <Text style={styles.heading}>Food Countdown</Text>
        <Text style={styles.text}>
          1. A business uploads their products that they want to sell
        </Text>
        <Text style={styles.text}>
          2. You can buy products that would otherwise go to waste
        </Text>
        <Text style={styles.text}>
          3. The business saves money and sells food that would've went to waste
        </Text>
        <Text style={styles.text}>
          4. You save money while knowing you are helping the environment!
        </Text>
        <Text style={styles.text}>Win-win!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    textAlign: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  heading: { fontFamily: "MonM", fontSize: scale(15) },
  text: {
    textAlign: "center",
    fontSize: scale(13),
    fontFamily: "MonL",
  },
  How: {
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: scale(100),
  },
});

export default aboutus;
