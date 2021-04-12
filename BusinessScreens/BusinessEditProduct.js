import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { scale } from "../components/ResponsiveText";
import Colour from "../constants/Colour";
import ButtonCustom from "../constants/ButtonCustom";
import * as firebase from "firebase";
import { ScrollView } from "react-native-gesture-handler";
import NormalProduct from "../components/NormalProduct";

const BusinessEditProduct = (props) => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [usualPrice, setUsualPrice] = useState("");
  const param = props.navigation.getParam("productKey");
  console.log(param);
  const dbconnection = firebase.firestore();
  var user = firebase.auth().currentUser;
  var docRef = dbconnection.collection("Products").doc(param);
  const handleSubmit = () => {
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          alert("Worked");
          console.log(itemName, quantity, price, usualPrice);
          return docRef.update({
            itemName: itemName,
            quantity: quantity,
            newPrice: price,
            usualPrice: usualPrice,
          });
        }
      })
      .then(function () {
        console.log("Document successfully updated!");
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };
  useEffect(() => {
    if (user) {
      // User is signed in.

      console.log(user.uid);
      docRef
        .get()
        .then(function (doc) {
          if (doc.exists) {
            setItemName(doc.data().itemName);
            setQuantity(doc.data().quantity);
            setPrice(doc.data().newPrice);
            setUsualPrice(doc.data().usualPrice);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })

        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    } else {
      // No user is signed in.
      console.log("No User Logged In");
    }
  }, []);

  return (
    <View
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.screen}
    >
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          paddingBottom: scale(20),
        }}
      >
        <Text style={styles.all}> Product Name:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(itemName) => setItemName(itemName)}
        >
          {itemName}
        </TextInput>
        <Text style={styles.all}> Quantity:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(quantity) => setQuantity(quantity)}
        >
          {quantity}
        </TextInput>

        <Text style={styles.all}> Original Price:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(usualPrice) => setUsualPrice(usualPrice)}
        >
          {usualPrice}
        </TextInput>

        <Text style={styles.all}> Price of the Product:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(price) => setPrice(price)}
        >
          {price}
        </TextInput>
      </View>
      <ButtonCustom onPress={handleSubmit} title="Update" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    alignSelf: "center",
  },
  textInput: {
    borderColor: Colour.primaryColour,
    paddingLeft: 15,
    borderRadius: 5,
    borderWidth: 2,
    justifyContent: "center",
    padding: scale(3),
    fontFamily: "MonM",
    fontSize: scale(15),
  },

  all: {
    paddingTop: scale(5),
    fontFamily: "MonM",
    fontSize: scale(12),
  },
});

export default BusinessEditProduct;
