import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { AppNavigator } from "./src/navigation/AppNavigation";
import { UserContext } from "./src/contexts/userContext";
import { User } from "./src/types/user";

export default function App() {
  // Ingnore setting timer warning
  // See https://github.com/facebook/react-native/issues/12981
  console.ignoredYellowBox = ["Setting a timer"];

  const [user, setUser] = useState<User>();

  return (
    <UserContext.Provider value={{ user, setUser }}>
    <AppNavigator />
    </UserContext.Provider>
  );
}