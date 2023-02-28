import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./screens/LoginScreen";
import MainScreen from "./screens/MainScreen";
import Details from "./screens/Details";
import Signup from "./screens/Signup";
import AllGames from "./screens/AllGames";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import TrendingNews from "./screens/TrendingNews";
import NewsDetails from "./screens/NewsDetails";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import SavedPosts from "./screens/SavedPosts";
import { Fontisto } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      activeColor="black"
      inactiveColor="black"
      tabBarOptions={{ activeTintColor: "red" }}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 90,
          paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: "rgb(60,10,100)",
          position: "absolute",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AllGames"
        component={AllGames}
        options={{
          tabBarLabel: "Games",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="game-controller" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TrendingNews"
        component={TrendingNews}
        options={{
          tabBarLabel: "News",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="newspaper-o" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SavedPosts"
        component={SavedPosts}
        options={{
          tabBarLabel: "Saved",
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="favorite" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="MyTabs" component={MyTabs} />

        <Stack.Screen name="NewsDetails" component={NewsDetails} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
