import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import {
  createBottomTabNavigator,
  createTabNavigator,
} from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import { AntDesign } from "@expo/vector-icons";
import Colour from "../constants/Colour";
import BusinessListScreen from "../screens/BusinessListScreen";
import ItemDetailScreen from "../screens/ItemDetailScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MainScreen from "../screens/MainScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import SortScreen from "../screens/SortScreen";
import { MaterialIcons } from "@expo/vector-icons";

SortScreen.navigationOptions = {
  headerTitle: "Sort Page",
  headerStyle: {
    backgroundColor: Colour.primaryColour,
  },
  headerTintColor: "white",
};

LoginScreen.navigationOptions = {
  headerTitle: "Food Rescue",
  headerStyle: {
    backgroundColor: Colour.primaryColour,
  },
  headerTitleAlign: "center",
  headerTintColor: "white",
};

RegisterScreen.navigationOptions = {
  headerTitle: "Registration",
  headerStyle: {
    backgroundColor: Colour.primaryColour,
  },
  headerTitleAlign: "center",
  headerTintColor: "white",
};

MainScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Food Rescue",
    //prettier-ignore
    headerLeft:(<MaterialIcons onPress = {() => {navData.navigation.toggleDrawer() } } style={{paddingLeft:5}} name="sort" size={40}/>  ),
    headerRight: (
      <AntDesign
        style={{ paddingRight: 5 }}
        name="user"
        size={40}
        color="black"
        onPress={() => {
          navData.navigation.navigate({ routeName: "Profile" });
        }}
      />
    ),
    headerStyle: {
      backgroundColor: Colour.primaryColour,
    },

    headerTitleAlign: "center",
    headerTintColor: "white",
  };
};

const FoodRescueNavigator = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
  BusinessList: BusinessListScreen,
  ItemDetail: ItemDetailScreen,
  Main: MainScreen,
  Profile: ProfileScreen,
});
const sortStack = createStackNavigator({
  Sort: SortScreen,
});
const MainNavigator = createDrawerNavigator({
  FoodRescue: FoodRescueNavigator,
  Sort: sortStack,
});

export default createAppContainer(MainNavigator);
