import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase';
import "firebase/firestore";
import { StyleSheet, Text, View } from 'react-native';

/* lib */
import { getShops } from "./src/lib/firebase";
/* types */
import { Shop } from "./src/types/shop";

export default function App() {
  // Ingnore setting timer warning
  // See https://github.com/facebook/react-native/issues/12981
  console.ignoredYellowBox = ['Setting a timer'];

  const [shops, setShops] = useState<Shop[]>([]);
  useEffect(() => {
    getFirebaseItems();
  }, []);

  const getFirebaseItems = async () => {
    const shops = await getShops();
    setShops(shops);
  };

  const shopItems = shops.map((shop, index) => (
    <View style={{margin: 10}} key={index.toString()}>
      <Text>{shop.name}</Text>
      <Text>{shop.place}</Text>
    </View>
  ));

  return (
    <View style={styles.container}>
      {shopItems}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
