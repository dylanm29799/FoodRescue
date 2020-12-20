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
import CartScreen from "../screens/CartScreen";

import BusinessHome from "../BusinessScreens/BusinessHome";
import BusinessLogin from "../BusinessScreens/BusinessLogin";
import BusinessRegister from "../BusinessScreens/BusinessRegister";
import BusinessLocation from "../BusinessScreens/BusinessLocation";

import { MaterialIcons } from "@expo/vector-icons";
import { BUSINESS } from "../Data/BusinessDataExample";
import { scale } from "../components/ResponsiveText";

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

ProfileScreen.navigationOptions = {
  headerTitle: "Profile",
  headerStyle: {
    backgroundColor: Colour.primaryColour,
  },
  headerTitleAlign: "center",
  headerTintColor: "white",
};

BusinessListScreen.navigationOptions = (props) => {
  const title = props.navigation.getParam("BusinessName");

  return {
    headerTitle: title,
    headerStyle: {
      backgroundColor: Colour.primaryColour,
      fontSize: scale(22),
    },
    headerTitleAlign: "center",
    headerTintColor: "white",
  };
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

ProfileScreen.navigationOptions = {
  headerTitle: "Profile",
  headerStyle: {
    backgroundColor: Colour.primaryColour,
  },
  headerTitleAlign: "center",
  headerTintColor: "white",
};

CartScreen.navigationOptions = {
  headerTitle: "Checkout",
  headerStyle: {
    backgroundColor: Colour.primaryColour,
  },
  headerTitleAlign: "center",
  headerTintColor: "white",
};

ItemDetailScreen.navigationOptions = (props) => {
  const title = props.navigation.getParam("BusinessName");
  return {
    headerTitle: title,
    headerStyle: {
      backgroundColor: Colour.primaryColour,
      fontSize: scale(22),
    },
    headerTitleAlign: "center",
    headerTintColor: "white",
  };
};

//Business Side Headers
BusinessLogin.navigationOptions = {
  headerTitle: "Login To Your Business",
  headerStyle: {
    backgroundColor: Colour.primaryColour,
  },
  headerTitleAlign: "center",
  headerTintColor: "white",
};

BusinessRegister.navigationOptions = {
  headerTitle: "Register Your Business",
  headerStyle: {
    backgroundColor: Colour.primaryColour,
  },
  headerTitleAlign: "center",
  headerTintColor: "white",
};

BusinessLocation.navigationOptions = {
  headerTitle: "Business Name",
  headerStyle: {
    backgroundColor: Colour.primaryColour,
  },
  headerTitleAlign: "center",
  headerTintColor: "white",
};

BusinessHome.navigationOptions = {
  headerTitle: "Business Name",
  headerStyle: {
    backgroundColor: Colour.primaryColour,
  },
  headerTitleAlign: "center",
  headerTintColor: "white",
};

const FoodRescueNavigator = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
  BusinessList: BusinessListScreen,
  ItemDetail: ItemDetailScreen,
  Main: MainScreen,
  Profile: ProfileScreen,
  Cart: CartScreen,

  //BusinessScreens
  BusinessHome: BusinessHome,
  BusinessLogin: BusinessLogin,
  BusinessRegister: BusinessRegister,
  BusinessLocation: BusinessLocation,
});
const sortStack = createStackNavigator({
  Sort: SortScreen,
});
const MainNavigator = createDrawerNavigator({
  FoodRescue: FoodRescueNavigator,
  Sort: sortStack,
});

export default createAppContainer(MainNavigator);
