/*
 *
 * ComponentName: Map.js
 *
 * Date: 28/04/2021
 *
 *
 * @author: Dylan Murphy, X17506166
 *
 * @reference : https://www.udemy.com/course/react-native-the-practical-guide/learn/lecture/15674818?start=0#overview
 * @reference : https://docs.expo.io/
 * @reference : https://firebase.google.com/docs/web/setup
 * @reference : https://github.com/wix/react-native-navigation
 *
 */
import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Image, Alert } from "react-native";
import Colour from "../constants/Colour";
import { scale } from "../components/ResponsiveText";
import * as ImagePicker from "expo-image-picker";

import * as firebase from "firebase";
import "firebase/firestore";
import ButtonCustom from "../constants/ButtonCustom";
import "firebase/storage";

import { withNavigation } from "react-navigation";

const NormalProduct = (props) => {
  //Firebase and user uid link
  const dbconnection = firebase.firestore();
  var user = firebase.auth().currentUser;
  var uid = "";
  try {
    uid = user.uid;
  } catch (err) {
    console.log(err);
  }
  //Setting state
  const [itemName, setItemName] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [usualPrice, setUsualPrice] = useState(null);
  const [newPrice, setNewPrice] = useState(null);
  //Random string future variabe
  var x;
  //random string package
  var randomString = require("random-string");
  //image state
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    //Launch image picker
    result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Image,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.cancelled) {
      //Image uri into image state
      setImage(result.uri);
    }
  };

  onSubmit = async () => {
    //TextInput logic
    if (!itemName || itemName.length < 3) {
      alert("Please Enter a valid Item Name");
      return;
    } else if (!quantity) {
      alert("Please Enter a valid Quantity");
    } else if (!usualPrice) {
      alert("Please Enter a valid original price");
    } else if (!newPrice || newPrice >= usualPrice) {
      alert("Please Enter a valid New price");
    } else if (!image) {
      alert("Please Pick an image");
    } else {
      //Setting x as a random string
      x = randomString({ length: 30 });
      console.log(x);

      //Getting the image uri
      const response = await fetch(image);
      //getting the blob from firebase
      const blob = await response.blob();
      //storage connection
      var storageRef = firebase.storage().ref();
      //pushing the link to the firebase storage
      var productRef = storageRef.child("products/" + x);

      productRef
        .put(blob)

        .then(async function () {
          //creating a new product with the details
          dbconnection
            .collection("Products")
            .doc(x)
            .set({
              itemName: itemName,
              quantity: parseInt(quantity),
              usualPrice: usualPrice,
              newPrice: newPrice,
              foodCountdown: "No",
              businessID: uid,
              image: x,
              docId: x,
              created: firebase.firestore.FieldValue.serverTimestamp(),
            });
          console.log("Success");
          Alert.alert("Uploaded!", "Your product has been uploaded");
        })
        .then(() => {
          //Getting links to firebase storage
          var storage = firebase.storage();
          //getting the google cloud storage URI
          var docRef = dbconnection.collection("Products").doc(x);
          //getting the URL from that URI
          var gsReference = storage.refFromURL(
            "gs://food-rescue-34ffd.appspot.com/products/" + x
          );
          //updating the URL in the firebase
          gsReference.getDownloadURL().then((url) => {
            docRef.get().then(function (doc) {
              if (doc.exists) {
                return docRef.update({
                  image: url,
                });
              }
            });
          });
        })
        .then(function () {
          //navigate to the home page
          props.navigation.navigate({ routeName: "BusinessHome" });
        });
    }
    // uploads file
  };

  return (
    <View style={styles.content}>
      <View style={styles.con}>
        <Text style={styles.text}>Product Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(itemName) => setItemName(itemName)}
          placeholder="Pizza Slice"
        />
        <Text style={styles.text}>Quantity Available</Text>
        <TextInput
          style={styles.input}
          keyboardType={"numeric"}
          onChangeText={(quantity) => setQuantity(quantity)}
          placeholder="8"
        />
        <Text style={styles.text}>Initial Price before discount</Text>
        <TextInput
          style={styles.input}
          keyboardType={"numeric"}
          onChangeText={(usualPrice) => setUsualPrice(usualPrice)}
          placeholder="4.00"
        />
        <Text style={styles.text}>New Price for Food Rescue</Text>
        <TextInput
          style={styles.input}
          keyboardType={"numeric"}
          onChangeText={(newPrice) => setNewPrice(newPrice)}
          placeholder="2.40"
        />
      </View>

      <Text
        onPress={pickImage}
        style={{ fontFamily: "MonM", fontSize: 16, paddingVertical: 10 }}
      >
        Pick an image
      </Text>
      {image && (
        <Image
          source={{ uri: image }}
          style={{
            height: scale(180),
            width: scale(280),

            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
          }}
          resizeMode="stretch"
        />
      )}

      <ButtonCustom title="Submit" onPress={onSubmit} />
    </View>
  );
};
const styles = StyleSheet.create({
  content: {
    borderTopWidth: 0,
    borderWidth: 2,
    borderColor: Colour.primaryColour,

    height: "80%",
    width: "90%",

    justifyContent: "center",
    alignItems: "center",
  },
  con: { width: "70%", justifyContent: "center", paddingBottom: scale(10) },
  input: {
    borderColor: Colour.primaryColour,
    paddingLeft: 15,
    borderRadius: 5,
    borderWidth: 2,
    justifyContent: "center",
    padding: scale(3),
    fontFamily: "MonM",
    fontSize: scale(15),
  },

  text: {
    paddingTop: scale(10),
    fontFamily: "MonM",
    fontSize: scale(12),
  },
  touchable: {
    height: scale(30),
    width: scale(70),
    backgroundColor: Colour.primaryColour,
    justifyContent: "center",
    marginHorizontal: scale(10),
  },
  touchableText: {
    color: "#fff",
    textAlign: "center",
    fontSize: scale(12),
  },
  picked: {
    backgroundColor: Colour.primaryColour,
    flex: 1,
    justifyContent: "center",
    elevation: 100,
  },

  notPicked: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",

    borderWidth: 2,
    borderColor: Colour.primaryColour,
  },

  pickedText: {
    color: "#fff",
    textAlign: "center",
    fontSize: scale(12),
    fontFamily: "MonM",
  },
  notPickedText: {
    color: Colour.primaryColour,
    textAlign: "center",
    fontSize: scale(12),
    fontFamily: "MonM",
  },

  category: {
    justifyContent: "center",
    flexDirection: "row",
    width: scale(250),
    height: scale(50),
  },
});
//WithNavigation used to navigate in a component
export default withNavigation(NormalProduct);
