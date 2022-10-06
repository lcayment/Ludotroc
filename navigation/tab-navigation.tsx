import React from "react";
import {
  BottomTabBarOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  RootStackParamList,
  HomeStackScreen,
  SearchStackScreen,
  AjoutStackScreen,
  MessagesStackScreen,
  ProfilStackScreen,
} from "./app-stacks";

const getTabBarIcon = (
  route: { name: string },
  focused: boolean,
  color: string
) => {
  const icons = {
    Accueil: "ios-home-outline",
    Chercher: "ios-search-outline",
    Ajouter: "ios-add-circle-outline",
    Messages: "ios-chatbubbles-outline",
    Profil: "ios-person-outline",
  };
  return (
    <Ionicons name={icons[route.name] || "ios-menu"} size={35} color={color} />
  );
};

const tabBarOptions: BottomTabBarOptions = {
  activeTintColor: "#98473E",
  inactiveTintColor: "#9EADC8",
  labelStyle: {
    fontSize: 0,
  },
};

const Tab = createBottomTabNavigator<RootStackParamList>();
export const TabNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator
      tabBarOptions={tabBarOptions}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) =>
          getTabBarIcon(route, focused, color),
      })}
    >
      <Tab.Screen name="Accueil" component={HomeStackScreen} />
      <Tab.Screen name="Chercher" component={SearchStackScreen} />
      <Tab.Screen name="Ajouter" component={AjoutStackScreen} />
      <Tab.Screen name="Messages" component={MessagesStackScreen} />
      <Tab.Screen name="Profil" component={ProfilStackScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);
