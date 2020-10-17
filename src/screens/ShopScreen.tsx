import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
/* types */
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../types/navigation";
import { RouteProp } from '@react-navigation/native';
import { ShopDetail } from "../components/ShopDetail";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Shop">;
  route: RouteProp<RootStackParamList, "Shop">;
}

export const ShopScreen: React.FC<Props> = ({ navigation, route}: Props) => {
  const {shop} = route.params;

  useEffect(() => {
    navigation.setOptions({title: shop.name});
  }, [shop]);

  return (
    <SafeAreaView style={styles.container}>
      <ShopDetail shop={shop}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
});
