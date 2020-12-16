import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
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
  const renderCategory = (itemData) => {
    return (
      <TouchableOpacity
        style={styles.Categories}
        onPress={() => {
          props.navigation.navigate({
            routeName: "ItemDetail",
            params: {
              BusinessID: itemData.item.id,
            },
          });
        }}
      >
        <View style={styles.item}>
          <Image
            style={{ height: "75%", width: "100%" }}
            source={{ uri: itemData.item.image }}
          />
          <View style={{ paddingBottom: scale(100) }}>
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

        <View style={{ width: "100%", alignItems: "center" }}>
          <Text style={styles.sortName}>Available Items</Text>
          <FlatList
            style={{ width: "75%" }}
            data={BUSINESSLIST}
            renderItem={renderCategory}
            numColumns={1}
          />
        </View>

        <View style={{ width: "100%", alignItems: "center" }}>
          <Text style={styles.sortName}>Available Items</Text>
          <FlatList
            style={{ width: "75%" }}
            data={FOODCOUNTDOWN}
            renderItem={renderCategory}
            numColumns={1}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexDirection: "column",
    justifyContent: "space-around",
  },

  Map: {
    height: "100%",
    width: "100%",
  },

  MapBorder: {
    borderWidth: scale(2),
    borderColor: Colour.primaryColour,
    position: "relative",
    height: scale(330),
  },
  item: {
    marginBottom: scale(20),
    borderWidth: scale(2),
    borderColor: Colour.primaryColour,
    padding: scale(2),
    borderRadius: scale(25),
    overflow: "scroll",
  },
  heading: {
    flexDirection: "row",
    overflow: "scroll",
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
    paddingLeft: "5%",
    fontSize: scale(15),
  },

  sortName: {
    fontSize: scale(30),
    textAlign: "center",
    fontFamily: "Raleway",
    paddingVertical: scale(10),
  },
});

export default BusinessListScreen;
