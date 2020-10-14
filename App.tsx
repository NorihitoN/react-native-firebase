import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, SafeAreaView, Platform } from 'react-native';

/* lib */
import { getShops } from "./src/lib/firebase";
/* component */
import { ShopReviewItem } from "./src/components/ShopReviewItem";
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

  return (
    <SafeAreaView style={styles.container}>
      <FlatList 
        data={shops}
        renderItem={({item}: { item: Shop}) => (
          <ShopReviewItem shop={item} />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0
  },
});
