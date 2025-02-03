

import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WelcomeScreen from "../screens/WelcomeScreen";
import SearchScreen from "../screens/SearchScreen";
import SavedScreen from "../screens/SavedScreen";
import HomeScreen from "../screens/HomeScreen";
import MovieScreen from "../screens/MovieScreen";
import ActorScreen from "../screens/ActorScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  function HomeStack() {
    return (
      
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Welcome"
      >
        <Stack.Screen name="HomeTab" component={HomeTabs} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        
        <Stack.Screen name="MovieScreen" component={MovieScreen} />
      
        <Stack.Screen name="ActorScreen" component={ActorScreen} />
      </Stack.Navigator>
      
      
    );
  }
  



  function HomeTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Search") {
              iconName = "search";
            } else if (route.name === "Saved") {
              iconName = "heart";
            }

            const customizeSize = 30;

            return (
              <Ionicons
                name={iconName}
                size={customizeSize}
                color={focused ? "#F9AA33" : "gray"}
              />
            );
          },
          
          tabBarActiveTintColor: "white",
          tabBarStyle: {
            backgroundColor: "#1F1D2B",
            borderTopWidth: 0,
            paddingTop : 9,
            paddingBottom: 7,
          },
        })}
      >
      
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Saved" component={SavedScreen} />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <HomeStack />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
}


