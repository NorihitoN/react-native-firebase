import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { AppNavigator } from "./src/navigation/AppNavigation";
import { UserContext } from "./src/contexts/userContext";
import { ReviewContext} from "./src/contexts/reviewContext";
import { User } from "./src/types/user";

export default function App() {
  // Ingnore setting timer warning
  // See https://github.com/facebook/react-native/issues/12981
  console.ignoredYellowBox = ["Setting a timer"];

  const [user, setUser] = useState<User>();
  const [reviews, setReviews] = useState<Review[]>([]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ReviewContext.Provider value={{reviews, setReviews}}>
        <AppNavigator />
      </ReviewContext.Provider>
    </UserContext.Provider>
  );
}