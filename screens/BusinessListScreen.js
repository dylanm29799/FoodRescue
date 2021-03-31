import React, { useEffect, useState } from "react";
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
import * as firebase from "firebase";
import MapView, { Marker } from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import business from "../models/business";
const BusinessListScreen = (props) => {
  const businessName = props.navigation.getParam("BusinessName");
  const busID = props.navigation.getParam("ID");
  var long;
  var lat;
  var user = firebase.auth().currentUser;
  const dbconnection = firebase.firestore();
  const [loadData, setLoadData] = useState({});
  const [businessLoadData, setBusinessLoadData] = useState({});
  [(long = global.longitude)];
  [(lat = global.latitude)];

  const busLong = props.navigation.getParam("busLong");
  const busLat = props.navigation.getParam("busLat");
  var today = new Date();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  useEffect(() => {
    dbconnection
      .collection("Products")
      .where("businessID", "==", busID)
      .where("foodCountdown", "==", "No")
      .where("quantity", ">", 0)
      .onSnapshot((querySnapshot) => {
        var loadData = [];
        querySnapshot.forEach(function (doc) {
          loadData.push({
            ...doc.data(),
            key: doc.id,
          });
        });

        setLoadData(loadData);
      });

    dbconnection
      .collection("Products")
      .where("businessID", "==", busID)
      .where("foodCountdown", "==", "Yes")
      .where("quantity", ">", 0)
      .onSnapshot((querySnapshot) => {
        var businessLoadData = [];
        querySnapshot.forEach(function (doc) {
          businessLoadData.push({
            ...doc.data(),
            key: doc.data().docId,
          });
        });
        console.log(businessLoadData);
        setBusinessLoadData(businessLoadData);
      });
  }, []);

  const renderCategory = (itemData) => {
    return (
      <TouchableOpacity
        style={styles.Categories}
        onPress={() => {
          props.navigation.navigate({
            routeName: "ItemDetail",
            params: {
              BusinessID: busID,
              productID: itemData.item.key,
              image: itemData.item.image,
              itemName: itemData.item.itemName,
              usualPrice: itemData.item.usualPrice,
              newPrice: itemData.item.newPrice,
              quantity: itemData.item.quantity,
              hours: itemData.item.hours,
              foodCountdown: itemData.item.foodCountdown,
            },
          });
        }}
      >
        <View style={styles.item}>
          <Image
            style={{ height: "75%", width: "100%", borderRadius: 15 }}
            source={{ uri: itemData.item.image }}
          />
          <View
            style={{
              width: scale(40),
              height: scale(40),
              position: "absolute",
              backgroundColor: "white",
              alignItems: "center",
              borderRadius: 30,
              borderWidth: 2,
              borderColor: "rgba(154, 18, 179, 1)",
              justifyContent: "center",
              marginTop: scale(17),
              marginLeft: scale(12),
            }}
          >
            <Text style={styles.text4}> €{itemData.item.newPrice}</Text>
          </View>

          <View style={styles.heading}>
            <Text numberOfLines={1} style={styles.text1}>
              {itemData.item.itemName}
            </Text>
            <Text style={styles.text2}>
              {itemData.item.quantity} Items left!
            </Text>
          </View>
        </View>
        <Text style={styles.text3}>Price was €{itemData.item.usualPrice}</Text>
      </TouchableOpacity>
    );
  };

  const renderFoodCategory = (itemData) => {
    var myDate = new Date(itemData.item.created * 1000);

    var start = new Date(itemData.item.created * 1000);
    var finishDate = new Date(
      myDate.setHours(myDate.getHours() + parseInt(itemData.item.hours))
    );

    var dateAsString = today.toDateString().substring(4, 10);
    var startDateAsString = start.toDateString().substring(4, 10);

    var todayAsMin = today.getHours() * 60 + today.getMinutes();
    var endAsMin = finishDate.getHours() * 60 + finishDate.getMinutes();
    var startAsMin = start.getHours() * 60 + start.getMinutes() + 60;

    //https://math.stackexchange.com/questions/1667064/formula-to-get-percentage-from-a-target-start-and-current-numbers
    var Current_Start = todayAsMin - startAsMin;
    var total_start = endAsMin - startAsMin;
    var hourlyPrice = Current_Start / total_start;

    var hoursRemaining = finishDate.getHours() + 1 - today.getHours();
    var minutesRemaining = finishDate.getMinutes() - today.getMinutes();
    if (minutesRemaining < 0) {
      minutesRemaining = 60 + minutesRemaining;
    }

    var discount = itemData.item.usualPrice - itemData.item.newPrice;
    var newDiscount = discount * hourlyPrice;
    var finalPrice = itemData.item.usualPrice - newDiscount;
    console.log(
      discount,
      newDiscount,
      finalPrice,
      hourlyPrice,
      itemData.item.itemName
    );
    if (
      (hourlyPrice < 1) &
      (itemData.item.quantity > 0) &
      (startDateAsString == dateAsString)
    ) {
      return (
        <TouchableOpacity
          style={styles.Categories}
          onPress={() => {
            props.navigation.navigate({
              routeName: "ItemDetail",
              params: {
                BusinessID: businessName,
                productID: itemData.item.key,
                image: itemData.item.image,
                itemName: itemData.item.itemName,
                usualPrice: itemData.item.usualPrice,
                newPrice: finalPrice.toFixed(2),
                quantity: itemData.item.quantity,
                hours: itemData.item.hours,
                foodCountdown: itemData.item.foodCountdown,
              },
            });
          }}
        >
          <View style={styles.item}>
            <Image
              style={{
                height: "75%",
                width: "100%",
                borderRadius: 15,
                borderColor: "rgba(154, 18, 179, 1)",
              }}
              source={{ uri: itemData.item.image }}
            />
            <View
              style={{
                width: scale(40),
                height: scale(40),
                position: "absolute",
                backgroundColor: "white",
                alignItems: "center",
                borderRadius: 30,
                borderWidth: 2,
                borderColor: "rgba(154, 18, 179, 1)",
                justifyContent: "center",
                marginTop: scale(17),
                marginLeft: scale(12),
              }}
            >
              <Text style={styles.text4}>€{finalPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.heading}>
              <Text numberOfLines={1} style={styles.text1}>
                {itemData.item.itemName}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.text2}>
                {itemData.item.quantity} <Text>Items left!</Text>
              </Text>
              <Text
                style={{
                  fontSize: scale(10),
                  textAlign: "right",
                  color: "black",
                  fontFamily: "MonM",
                }}
              >
                {hoursRemaining} hours and{"\n"} {minutesRemaining} mins left
              </Text>
            </View>
          </View>

          <Text style={styles.text3}>
            Starting price was €{itemData.item.usualPrice}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.MapBorder}>
        <MapView
          style={styles.Map}
          initialRegion={{
            latitude: busLat,
            longitude: busLong,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          <Marker
            coordinate={{ latitude: lat, longitude: long }}
            title={"You"}
            description={"Your Location"}
          >
            <MaterialCommunityIcons
              name="home-map-marker"
              size={20}
              color={Colour.primaryColour}
            />
          </Marker>
          <Marker
            coordinate={{
              latitude: busLat,
              longitude: busLong,
            }}
            title={businessName}
          >
            <Feather name="map-pin" size={40} color="green" />
          </Marker>
        </MapView>
      </View>

      <ScrollView style={{ backgroundColor: "#ffecd2" }}>
        <LinearGradient
          // Background Linear Gradient
          colors={["#ffecd2", "transparent"]}
          style={{ borderRadius: 15 }}
        >
          <SafeAreaView style={{ alignItems: "center" }}>
            <Text style={styles.sortName}>Products To Buy</Text>

            <FlatList
              style={{ flex: 1 }}
              data={loadData}
              renderItem={renderCategory}
              horizontal={true}
            />
          </SafeAreaView>

          <SafeAreaView
            style={{
              alignItems: "center",
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.sortName}>Food Countdown</Text>
            <FlatList
              style={{ flex: 1, paddingBottom: 10 }}
              data={businessLoadData}
              renderItem={renderFoodCategory}
              horizontal={true}
            />
          </SafeAreaView>
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  Map: {
    height: "100%",
    width: "100%",
  },

  MapBorder: {
    borderWidth: scale(2),
    borderColor: Colour.primaryColour,
    position: "relative",
    height: scale(220),
  },
  item: {
    height: scale(250),
    paddingHorizontal: scale(10),
    paddingTop: scale(15),
    width: "100%",
    marginBottom: scale(15),
    borderRadius: 15,
  },
  heading: {},
  text1: {
    fontSize: scale(17),
    fontFamily: "MonB",
    width: "100%",
    overflow: "scroll",
    paddingLeft: scale(5),
    paddingTop: 10,
    color: "#3b3b3b",
  },
  text2: {
    paddingRight: "5%",
    paddingLeft: scale(5),
    fontSize: scale(11),
    fontFamily: "MonM",
    color: "black",
  },

  text3: {
    fontSize: scale(8),
    alignSelf: "center",
    fontFamily: "MonM",
    paddingRight: 5,
    color: "#3b3b3b",
    marginTop: scale(-20),
    paddingBottom: scale(10),
  },

  text4: {
    fontSize: scale(13),
    fontFamily: "MonM",
    color: "rgba(154, 18, 179, 1)",
    paddingRight: 5,
  },

  sortName: {
    fontSize: scale(20),
    textAlign: "center",
    fontFamily: "MonM",
    paddingVertical: scale(5),
    color: "#444444",
  },
  Categories: {
    flexDirection: "column",
    backgroundColor: "#ffc87c",
    flex: 1,
    borderWidth: 1,
    borderRadius: 15,
    marginHorizontal: 0.1,
    borderColor: "white",
    marginHorizontal: 5,
    minWidth: scale(180),
    maxWidth: scale(180),
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
});

export default BusinessListScreen;
