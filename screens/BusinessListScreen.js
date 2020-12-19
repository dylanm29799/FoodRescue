import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import {
  scale,
  verticalScale,
  moderateScale,
} from "../components/ResponsiveText";
import Colour from "../constants/Colour";
import MapView from "react-native-maps";
import { BUSINESSLIST } from "../Data/businesslistDataExample";
import { FOODCOUNTDOWN } from "../Data/foodcountdowndataexample";
import { ScrollView } from "react-native-gesture-handler";

const BusinessListScreen = (props) => {
  const businessName = props.navigation.getParam("BusinessName");

  const renderCategory = (itemData) => {
    return (
      <TouchableOpacity
        style={styles.Categories}
        onPress={() => {
          props.navigation.navigate({
            routeName: "ItemDetail",
            params: {
              BusinessName: businessName,
              Title: itemData.item.title,
              Image: itemData.item.image,
              Quantity: itemData.item.quantity,
              InitialPrice: itemData.item.initialPrice,
              Price: itemData.item.price,
            },
          });
        }}
      >
        <View style={styles.item}>
          <Image
            style={{ height: "75%", width: "100%" }}
            source={{ uri: itemData.item.image }}
          />
          <View>
            <View style={styles.heading}>
              <Text style={styles.text1}>{itemData.item.title}</Text>
              <Text style={styles.text2}>
                {itemData.item.quantity} <Text>Items left!</Text>
              </Text>
            </View>

            <Text style={{ paddingLeft: "5%" }}>
              <Text style={styles.text3}>€{itemData.item.initialPrice}</Text>
              <Text style={styles.text4}>€{itemData.item.price}</Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const renderFoodCategory = (itemData) => {
    return (
      <TouchableOpacity
        style={styles.Categories}
        onPress={() => {
          props.navigation.navigate({
            routeName: "ItemDetail",
            params: {
              BusinessName: businessName,
              Title: itemData.item.title,
              Image: itemData.item.image,
              Quantity: itemData.item.quantity,
              InitialPrice: itemData.item.initialPrice,
              Price: itemData.item.price,
              Time: itemData.item.time,
            },
          });
        }}
      >
        <View style={styles.item}>
          <Image
            style={{ height: "75%", width: "100%" }}
            source={{ uri: itemData.item.image }}
          />
          <View>
            <View style={styles.heading}>
              <Text style={styles.text1}>{itemData.item.title}</Text>

              <Text style={styles.text2}>
                {itemData.item.quantity} <Text>Items left!</Text>
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View
                style={{
                  paddingLeft: "5%",
                  flex: 2,
                }}
              >
                <Text style={styles.text4}>
                  €{itemData.item.price}
                  <Text style={styles.text3}>
                    €{itemData.item.initialPrice}
                  </Text>
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    paddingRight: "9%",
                    fontSize: scale(15),
                    textAlign: "right",
                  }}
                >
                  {itemData.item.time} Hours Left!
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.screen}>
      <ScrollView>
        <View style={styles.MapBorder}>
          <MapView
            style={styles.Map}
            initialRegion={{
              latitude: 53.34900146651947,
              longitude: -6.243367195129395,
              latitudeDelta: 0,
              longitudeDelta: 0.05,
            }}
          />
        </View>

        <SafeAreaView style={{ alignItems: "center", flex: 1 }}>
          <Text style={styles.sortName}>Available Items</Text>

          <FlatList
            style={{ width: "90%", flex: 1 }}
            data={BUSINESSLIST}
            renderItem={renderCategory}
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
            style={{ width: "90%", flex: 1 }}
            data={FOODCOUNTDOWN}
            renderItem={renderFoodCategory}
          />
        </SafeAreaView>
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
    height: scale(200),
  },
  item: {
    borderWidth: scale(2),
    borderColor: Colour.primaryColour,
    height: scale(200),
  },
  heading: {
    flexDirection: "row",
  },
  text1: {
    width: "50%",
    paddingLeft: "5%",
    fontSize: scale(15),
  },
  text2: {
    width: "50%",
    textAlign: "right",
    paddingRight: "5%",
    fontSize: scale(15),
  },

  text3: {
    paddingLeft: "5%",
    fontSize: scale(15),
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },

  text4: {
    fontSize: scale(15),
  },

  sortName: {
    fontSize: scale(30),
    textAlign: "center",
    paddingVertical: scale(10),
    fontFamily: "Raleway",
    fontWeight: "900",
  },
  Categories: { flex: 1 },
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
});

export default BusinessListScreen;
