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
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const dbconnection = firebase.firestore();
  var user = firebase.auth().currentUser;
  var uid = "";
  try {
    uid = user.uid;
  } catch (err) {
    console.log(err);
  }
  var finalQuan;
  [(finalQuan = global.quantity)];

  const [itemName, setItemName] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [usualPrice, setUsualPrice] = useState(null);
  const [newPrice, setNewPrice] = useState(null);
  var x;

  var randomString = require("random-string");
  const [image, setImage] = useState(null);
  const [time, setTime] = useState({ itemValue: "0" });

  const pickImage = async () => {
    result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Image,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  onSubmit = async () => {
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
      x = randomString({ length: 30 });
      console.log(x);

      const response = await fetch(image);
      const blob = await response.blob();
      var storageRef = firebase.storage().ref();
      var productRef = storageRef.child("products/" + x);
      productRef
        .put(blob)
        .then(async function () {
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
          console.log(finalQuan);

          dbconnection.collection("businessDetails").doc(uid).update({
            quantity: finalQuan,
          });
          var storage = firebase.storage();
          var docRef = dbconnection.collection("Products").doc(x);
          var gsReference = storage.refFromURL(
            "gs://food-rescue-34ffd.appspot.com/products/" + x
          );
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
export default withNavigation(FoodCountdown);
