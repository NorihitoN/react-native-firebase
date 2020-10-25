import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, SafeAreaView, Platform } from 'react-native';

/* lib */
import { getShops } from "../lib/firebase";
/* component */
import { ShopReviewItem } from "../components/ShopReviewItem";
/* types */
import { Shop } from "../types/shop";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../types/navigation";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
}


export const HomeScreen = ({navigation}: Props) => {

  const [shops, setShops] = useState<Shop[]>([]);
  useEffect(() => {
    getFirebaseItems();
  }, []);

  const getFirebaseItems = async () => {
    const shops = await getShops();
    setShops(shops);
  };

  const onPressShop = (shop: Shop) => {
     navigation.navigate("Shop", { shop }) ;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList 
        data={shops}
        renderItem={({item}:{item: Shop}) => (
          <ShopReviewItem shop={item} onPress={() => onPressShop(item)} />
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
    paddingTop: Platform.OS === "android" ? 25 : 0
  },
});

