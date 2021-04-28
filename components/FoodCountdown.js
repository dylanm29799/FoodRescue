/*
 *
 * ComponentName: FoodCountdown.js
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
 * @reference : https://www.npmjs.com/package/react-native-dropdown-picker
 *
 */
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Image,
  Alert,
} from "react-native";
import Colour from "../constants/Colour";
import { scale } from "./ResponsiveText";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
import "firebase/firestore";
import ButtonCustom from "../constants/ButtonCustom";
import "firebase/storage";
import { Picker } from "@react-native-picker/picker";
import { withNavigation } from "react-navigation";

const FoodCountdown = (props) => {
  //getting Firebase and User ID
  const dbconnection = firebase.firestore();
  var user = firebase.auth().currentUser;
  var uid = "";
  try {
    uid = user.uid;
  } catch (err) {
    console.log(err);
  }

  //Setting state for item details
  const [itemName, setItemName] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [usualPrice, setUsualPrice] = useState(null);
  const [newPrice, setNewPrice] = useState(null);
  var x;
  //Declaring a random string
  var randomString = require("random-string");
  //Setting state for image and time
  const [image, setImage] = useState(null);
  const [time, setTime] = useState({ itemValue: "0" });

  const pickImage = async () => {
    //Opening image picker for ios and android and choosing an image : Aspect ratio is 16:9, allowsEditing allows the image to be cropped
    result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Image,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.cancelled) {
      //set image to uri
      setImage(result.uri);
    }
  };

  onSubmit = async () => {
    //Text input logic
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
              hours: time.itemValue,
              foodCountdown: "Yes",
              businessID: uid,
              docId: x,
              image: x,
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
  };
  return (
    <View style={styles.content}>
      <View style={styles.con}>
        <Text style={styles.text}>Product Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(itemName) => setItemName(itemName)}
          placeholder="Chocolate Chip Cookie"
        />
        <Text style={styles.text}>Quantity Available</Text>
        <TextInput
          style={styles.input}
          keyboardType={"numeric"}
          onChangeText={(quantity) => setQuantity(quantity)}
          placeholder="5"
        />
        <Text style={styles.text}>Initial Price before Food Countdown</Text>
        <TextInput
          style={styles.input}
          keyboardType={"numeric"}
          onChangeText={(usualPrice) => setUsualPrice(usualPrice)}
          placeholder="4.00"
        />

        <Text style={styles.text}>Ending Price</Text>
        <TextInput
          style={styles.input}
          keyboardType={"numeric"}
          onChangeText={(newPrice) => setNewPrice(newPrice)}
          placeholder="2.00"
        />
      </View>
      <Text style={styles.text}>Time Available</Text>
      <Picker
        selectedValue={time.itemValue}
        style={{ height: 50, width: "50%" }}
        onValueChange={(itemValue, itemIndex) => setTime({ itemValue })}
      >
        {/*Letting the user pick how long a product will be available */}
        <Picker.Item label="1 Hour" value="1" />
        <Picker.Item label="2 Hours" value="2" />
        <Picker.Item label="3 Hours" value="3" />
        <Picker.Item label="4 Hours" value="4" />
        <Picker.Item label="5 Hours" value="5" />
        <Picker.Item label="6 Hours" value="6" />
        <Picker.Item label="7 Hours" value="7" />
        <Picker.Item label="8 Hours" value="8" />
        <Picker.Item label="9 Hours" value="9" />
        <Picker.Item label="10 Hours" value="10" />
        <Picker.Item label="11 Hours" value="11" />
        <Picker.Item label="12 Hours" value="12" />
      </Picker>

      <Text
        onPress={pickImage}
        style={{ fontFamily: "MonM", fontSize: 16, paddingVertical: 10 }}
      >
        Pick an image
      </Text>
      {/*Displaying an image of the users product */}
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
//Stylesheet for styling
const styles = StyleSheet.create({
  con: { width: "70%", justifyContent: "center", paddingBottom: scale(10) },
  content: {
    borderTopWidth: 0,
    borderWidth: 2,
    borderColor: Colour.primaryColour,

    height: "80%",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
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
export default withNavigation(FoodCountdown);
