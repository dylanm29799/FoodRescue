import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { scale } from "../components/ResponsiveText";
import Colour from "../constants/Colour";
import { ScrollView } from "react-native-gesture-handler";
import * as firebase from "firebase";
import { withNavigation } from "react-navigation";

const BusinessNormalProduct = (props) => {
  const [product, setProduct] = useState([]);
  //const businessName = props.navigation.getParam("BusinessName");
  const dbconnection = firebase.firestore();
  var user = firebase.auth().currentUser;
  //var docRef = dbconnection.collection("Products");

  // User is signed in.
  useEffect(() => {
    dbconnection
      .collection("Products")
      .where("businessID", "==", user.uid)
      .where("foodCountdown", "==", "No")
      .onSnapshot((querySnapshot) => {
        const product = [];

        querySnapshot.forEach((doc) => {
          product.push({
            ...doc.data(),
            key: doc.data().docId,
          });
          console.log(product);
        });

        setProduct(product);
      });
  }, []);

  const renderCategory = (item) => {
    return (
      <TouchableOpacity
        style={styles.Categories}
        onPress={() => {
          props.navigation.navigate({
            routeName: "BusinessEdit",
            params: {
              productName: item.item.itemName,
            },
          });
        }}
      >
        <View style={styles.item}>
          <Image
            style={{
              height: "80%",
              width: "100%",
              borderRadius: 22,
            }}
            source={{ uri: item.item.image }}
          />
          <View>
            <Text style={styles.text1} numberOfLines={2} ellipsizeMode={"tail"}>
              {item.item.itemName}
            </Text>

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text style={{ fontFamily: "OpenSans", paddingRight: 20 }}>
                {item.item.quantity} Available
              </Text>

              <Text style={styles.text3}>€{item.item.usualPrice}</Text>
              <Text style={[styles.text4, { borderRightColor: "transparent" }]}>
                €{item.item.newPrice}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ alignItems: "center", flex: 1, width: "100%" }}>
      <Text style={styles.sortName}>Ordinary Products</Text>

      <FlatList
        style={{ flex: 1, width: "90%" }}
        data={product}
        renderItem={renderCategory}
        numColumns={2}
        keyExtractor={(item) => item.docId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    height: scale(250),
    paddingHorizontal: scale(10),
    paddingTop: scale(15),
    width: "100%",
    marginBottom: scale(15),
  },

  text1: {
    fontSize: scale(13),
    fontFamily: "OpenSans",
    width: "90%",
    overflow: "scroll",
    paddingLeft: 20,
    paddingTop: 10,
  },
  text2: {
    textAlign: "right",
    paddingRight: "5%",
    fontSize: scale(15),
    fontFamily: "OpenSans",
  },

  text3: {
    fontSize: scale(10),
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    fontFamily: "OpenSans",
    borderRightColor: "#808080",
    borderRightWidth: 1,
    paddingRight: 5,
  },

  text4: {
    fontSize: scale(10),
    fontFamily: "OpenSans",
    borderRightWidth: 1,
    paddingRight: 5,
  },
  Categories: {
    flexDirection: "column",
    backgroundColor: "#fffaf5",
    flex: 1,
    borderWidth: 0.5,
    borderRadius: 15,
    marginHorizontal: 0.1,
    borderColor: "#808080",
  },
  sortName: {
    fontSize: scale(20),
    textAlign: "center",
    fontFamily: "OpenSans",
    paddingVertical: scale(10),
  },
});

export default withNavigation(BusinessNormalProduct);
