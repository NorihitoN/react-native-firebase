import { StatusBar } from "expo-status-bar";
import React from "react";
import { AppNavigator } from "./src/navigation/AppNavigation";

export default function App() {
  // Ingnore setting timer warning
  // See https://github.com/facebook/react-native/issues/12981
  console.ignoredYellowBox = ['Setting a timer'];

  return <AppNavigator />;
}
