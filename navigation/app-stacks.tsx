import React from "react";
import {
  createStackNavigator,
  StackNavigationOptions,
  StackNavigationProp,
} from "@react-navigation/stack";
import SearchScreen from "../screens/Chercher/SearchScreen";
import MainSearchScreen from "../screens/Chercher/MainSearchScreen";
import HomeScreen from "../screens/Accueil/HomeScreen";
import MessagesScreen from "../screens/Messages/MessagesScreen";
import MessageScreen from "../screens/Messages/MessageScreen";
import ProfilScreen from "../screens/Profil/ProfilScreen";
import JDSScreen from "../screens/Profil/JDSScreen";
import PuzzleScreen from "../screens/Profil/PuzzleScreen";
import AjoutScreen from "../screens/Ajouter/AjoutScreen";
import JDSAddScreen from "../screens/Ajouter/JDSAddScreen";
import PuzzleAddScreen from "../screens/Ajouter/PuzzleAddScreen";
import User from "../services/user.model";

// Define view (screen) names and associated params
// Enables type checking and code completion for views
// undefined = no params passed to view
export type RootStackParamList = {
  Accueil: undefined;
  Chercher: undefined;
  Ajouter: undefined;
  Messages: undefined;
  Profil: undefined;
  User: { userId: number };
  JDS: { jdsId: number };
  Puzzle: { puzzleId: number };
  Message: { messageId: number };
  JDSAdd: { jdsAddId: number };
  PuzzleAdd: { puzzleAddId: number };
};

// Base interface for all components using the navigation object
// Enables type checking and code completion for navigation
// Should be inherited to add component-specific props
export interface NavigationProps {
  navigation: StackNavigationProp<RootStackParamList, any>;
}

const stackScreenOptions: StackNavigationOptions = {
  // couleur du header
  headerStyle: {
    backgroundColor: "white",
  },
  headerTintColor: "black",
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 24,
  },
  headerTitleAlign: "center",
};

// Stack pour l'accueil
const HomeStack = createStackNavigator<RootStackParamList>();
export const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={stackScreenOptions}>
      {/* Page principale */}
      <HomeStack.Screen
        name="Accueil"
        options={{ title: "Accueil" }}
        component={HomeScreen}
      />
      {/* Sous-pages */}
      <HomeStack.Screen name="JDS" component={JDSScreen} />
      <HomeStack.Screen name="Puzzle" component={PuzzleScreen} />
    </HomeStack.Navigator>
  );
};

const SearchStack = createStackNavigator<RootStackParamList>();
export const SearchStackScreen = () => {
  return (
    <SearchStack.Navigator screenOptions={stackScreenOptions}>
      {/* Page principale */}
      <SearchStack.Screen
        name="Chercher"
        options={{ title: "Chercher" }}
        component={MainSearchScreen}
      />
      {/* Sous-page */}
      <SearchStack.Screen name="User" component={SearchScreen} />
      <SearchStack.Screen name="JDS" component={JDSScreen} />
      <SearchStack.Screen name="Puzzle" component={PuzzleScreen} />
    </SearchStack.Navigator>
  );
};

// Stack pour l'accueil
const AjoutStack = createStackNavigator<RootStackParamList>();
export const AjoutStackScreen = () => {
  return (
    <AjoutStack.Navigator screenOptions={stackScreenOptions}>
      {/* Page principale */}
      <AjoutStack.Screen
        name="Ajouter"
        options={{ title: "Ajouter" }}
        component={AjoutScreen}
      />
      {/* Sous-pages */}
      <AjoutStack.Screen name="JDSAdd" component={JDSAddScreen} />
      <AjoutStack.Screen name="PuzzleAdd" component={PuzzleAddScreen} />
    </AjoutStack.Navigator>
  );
};

// Stack pour les transactions
const MessagesStack = createStackNavigator<RootStackParamList>();
export const MessagesStackScreen = () => {
  return (
    <MessagesStack.Navigator screenOptions={stackScreenOptions}>
      {/* Page principale */}
      <MessagesStack.Screen
        name="Messages"
        options={{ title: "Messages" }}
        component={MessagesScreen}
      />
      {/* Sous-page */}
      <MessagesStack.Screen name="Message" component={MessageScreen} />
    </MessagesStack.Navigator>
  );
};

const ProfilStack = createStackNavigator<RootStackParamList>();
export const ProfilStackScreen = () => {
  return (
    <ProfilStack.Navigator screenOptions={stackScreenOptions}>
      {/* Page principale */}
      <ProfilStack.Screen
        name="Profil"
        options={{ title: "Profil" }}
        component={ProfilScreen}
      />
      {/* Sous-pages */}
      <ProfilStack.Screen name="JDS" component={JDSScreen} />
      <ProfilStack.Screen name="Puzzle" component={PuzzleScreen} />
    </ProfilStack.Navigator>
  );
};
