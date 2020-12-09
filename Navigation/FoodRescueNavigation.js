import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Colour from "../constants/Colour";
import BusinessListScreen from "../screens/BusinessListScreen";
import ItemDetailScreen from "../screens/ItemDetailScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MainScreen from "../screens/MainScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import SortScreen from "../screens/SortScreen";

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

const FoodRescueNavigator = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
  BusinessList: BusinessListScreen,
  ItemDetail: ItemDetailScreen,
  Profile: ProfileScreen,
  Main: MainScreen,
  Sort: SortScreen,
});

export default createAppContainer(FoodRescueNavigator);
