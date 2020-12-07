import { createStackNavigator} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';



import BusinessListScreen from '../screens/BusinessListScreen';
import ItemDetailScreen from '../screens/ItemDetailScreen'
import ProfileScreen from '../screens/ProfileScreen'
import MainScreen from '../screens/MainScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import SortScreen from '../screens/SortScreen'

const FoodRescueNavigator = createStackNavigator({
    Login:LoginScreen,
    Register:RegisterScreen,
    BusinessList:BusinessListScreen,
    ItemDetail:ItemDetailScreen,
    Profile:ProfileScreen,
    Main:MainScreen,
    Sort:SortScreen,

});

export default createAppContainer(FoodRescueNavigator);
