import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Text } from "react-native";
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
import aboutus from "../screens/aboutus";
import forgotPassword from "../screens/forgotPassword";
import Receipt from "../screens/Receipt";
import UserOrders from "../screens/UserOrders";

import BusinessHome from "../BusinessScreens/BusinessHome";
import BusinessRegister from "../BusinessScreens/BusinessRegister";
import BusinessLocation from "../BusinessScreens/BusinessLocation";
import BusinessCurrentProduct from "../BusinessScreens/BusinessCurrentProduct";
import BusinessAddProduct from "../BusinessScreens/BusinessAddProduct";
import BusinessManage from "../BusinessScreens/BusinessManage";
import CorrectLocation from "../BusinessScreens/CorrectLocation";
import BusinessEdit from "../BusinessScreens/BusinessEditProduct";
import BusinessProfile from "../BusinessScreens/businessProfile";
import businessReceipt from "../BusinessScreens/businessReceipt";
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
  headerShown: false,
};
Receipt.navigationOptions = {
  headerShown: false,
};
businessReceipt.navigationOptions = {
  headerShown: false,
};
RegisterScreen.navigationOptions = {
  headerShown: false,
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
    },
    headerTitleAlign: "center",
    headerTintColor: "white",
  };
};

MainScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Food Rescue",
    //prettier-ignore
    headerLeft:(<MaterialIcons onPress = {() => {navData.navigation.toggleDrawer() } } style={{paddingLeft:5}} name="sort" size={40} color= "white"/>  ),
    headerRight: (
      <AntDesign
        style={{ paddingRight: 5 }}
        name="user"
        size={40}
        color="white"
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
  headerTitle: "Edit Your Profile",
  headerStyle: {
    backgroundColor: Colour.primaryColour,
  },
  headerTitleAlign: "center",
  headerTintColor: "white",
};
BusinessProfile.navigationOptions = {
  headerTitle: "Edit Your Profile",
  headerStyle: {
    backgroundColor: Colour.primaryColour,
  },
  headerTintColor: "white",
};

BusinessEdit.navigationOptions = (props) => {
  const productTitle = props.navigation.getParam("productName");
  return {
    headerTitle: productTitle,
    headerStyle: {
      backgroundColor: Colour.primaryColour,
    },
    headerTitleAlign: "center",
    headerTintColor: "white",
  };
};

forgotPassword.navigationOptions = {
  headerTitle: "Forgot Password",
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
    },
    headerTitleAlign: "center",
    headerTintColor: "white",
  };
};

aboutus.navigationOptions = {
  headerTitle: "About Us",
  headerStyle: {
    backgroundColor: Colour.primaryColour,
  },
  headerTitleAlign: "center",
  headerTintColor: "white",
};

UserOrders.navigationOptions = {
  headerShown: false,
};
//Business Side Headers

BusinessRegister.navigationOptions = {
  headerShown: false,
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
  headerShown: false,
};

CorrectLocation.navigationOptions = {
  headerTitle: "Correct Your Location",
  headerStyle: {
    backgroundColor: Colour.primaryColour,
  },
  headerTitleAlign: "center",
  headerTintColor: "white",
};

BusinessCurrentProduct.navigationOptions = {
  headerTitle: "Current Products",
  headerStyle: {
    backgroundColor: Colour.primaryColour,
  },
  headerTitleAlign: "center",
  headerTintColor: "white",
};

BusinessAddProduct.navigationOptions = {
  headerTitle: "Add your product",
  headerStyle: {
    backgroundColor: Colour.primaryColour,
  },
  headerTitleAlign: "center",
  headerTintColor: "white",
};

BusinessManage.navigationOptions = {
  headerTitle: "Manage Your Orders",
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
  forgotPassword: forgotPassword,
  Receipt: Receipt,
  //BusinessScreens
  BusinessHome: BusinessHome,
  BusinessRegister: BusinessRegister,
  BusinessLocation: BusinessLocation,
  BusinessAddProduct: BusinessAddProduct,
  BusinessCurrentProduct: BusinessCurrentProduct,
  BusinessManage: BusinessManage,
  CorrectLocation: CorrectLocation,
  BusinessEdit: BusinessEdit,
  BusinessProfile: BusinessProfile,
  businessReceipt: businessReceipt,
});
const sortStack = createStackNavigator({
  Sort: SortScreen,
});
const userOrderStack = createStackNavigator({
  UserOrders: UserOrders,
});
const aboutUsStack = createStackNavigator({
  "About Us": aboutus,
});
const MainNavigator = createDrawerNavigator({
  FoodRescue: FoodRescueNavigator,
  "What do you Fancy?": sortStack,
  "About us": aboutUsStack,
  "Your Order's": userOrderStack,
});

export default createAppContainer(MainNavigator);
