import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Colour from "../constants/Colour";
import MapView from "react-native-maps";
import Raleway from "../assets/fonts/Raleway-VariableFont_wght.ttf";
import { BUSINESS } from "../Data/BusinessDataExample";
import { CATEGORIES } from "../Data/SortDataExample";
import {
  scale,
  verticalScale,
  moderateScale,
} from "../components/ResponsiveText";
import { ScrollView } from "react-native-gesture-handler";
import Map from "../components/Map";

const MainScreen = (props) => {
  const renderCategory = (itemData) => {
    return (
      <TouchableOpacity
        style={styles.Categories}
        onPress={() => {
          props.navigation.navigate({
            routeName: "BusinessList",
            params: {
              BusinessName: itemData.item.title,
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
                {itemData.item.items} <Text> Items</Text>
              </Text>
            </View>
            <Text style={styles.text3}>{itemData.item.distance}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const SortID = props.navigation.getParam("SortID");
  //prettier-ignore
  const selectedCategory = CATEGORIES.find(sort => sort.id === SortID);

  const displayMessage = () => {
    if (selectedCategory === undefined) {
      return <Text style={styles.sortName}>Close to you</Text>;
    } else {
      return <Text style={styles.sortName}>{selectedCategory.title}</Text>;
    }
  };
  return (
    <View>
      <ScrollView>
        <View style={styles.MapBorder}>
          <Map style={styles.Map} />
        </View>

        <View
          style={{
            alignItems: "center",
            flex: 1,
          }}
        >
          {displayMessage()}

          <FlatList
            style={{ width: "90%", flex: 1 }}
            data={BUSINESS}
            renderItem={renderCategory}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },

  Map: {
    height: "100%",
    width: "100%",
  },

  MapBorder: {
    borderWidth: scale(2),
    borderColor: Colour.primaryColour,
    height: scale(330),
  },
  item: {
    marginBottom: scale(100),
    borderWidth: scale(2),
    borderColor: Colour.primaryColour,
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
  },

  sortName: {
    fontSize: scale(30),
    textAlign: "center",
    fontFamily: "Raleway",
    paddingVertical: scale(10),
  },
  Categories: {
    flex: 1,
  },
});

export default MainScreen;
