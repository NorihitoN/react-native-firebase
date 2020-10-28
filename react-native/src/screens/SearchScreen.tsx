import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text, TextInput } from "react-native";
/* types */
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { RouteProp } from "@react-navigation/native";
import { searchReview } from "../lib/algolia";
import {Review} from "../types/review";
/* screen */
import { SearchReviewItem } from "../components/SearchReviewItem";
import { FlatList } from "react-native-gesture-handler";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Search">;
  route: RouteProp<RootStackParamList, "Search">;
};

export const SearchScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  const [keyword, setKeyword] = useState<string>("");
  const [reviews, setReviews] = useState<Review[]>([]);

  const onChangeText = async (text: string) => {
    setKeyword(text);
    if (!text) {
      setReviews([]);
    } else {
      const result = await searchReview(text);
      if(result.hits.length > 0) {
        const hitsRes = result.hits.map((hit) => {
          console.log(hit);
          return (hit as unknown) as Review;
        })
        setReviews(hitsRes);
      } else {
        setReviews([]);
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        value={keyword}
        onChangeText={onChangeText}
        style={styles.input}
        placeholder="検索キーワード"
      />
      <FlatList
        data={reviews}
        renderItem={({item}) => <SearchReviewItem review={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    paddingTop: Platform.OS === "android" ? 50 : 0
  },
  input: {
    height: 50,
    borderColor: "#999",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 18,
    margin: 16,
  },

});
