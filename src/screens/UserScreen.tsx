import React, { useState, useContext } from "react";
import { StyleSheet, SafeAreaView, Text, Platform } from "react-native";
import { updateUser } from "../lib/firebase";
import firebase from "firebase";
/* types */
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { RouteProp } from "@react-navigation/native";

import { Form } from "../components/Form";
import { Button} from "../components/Button";
import { Loading } from "../components/Loading";

import { UserContext } from "../contexts/userContext";


type Props = {
  navigation: StackNavigationProp<RootStackParamList, "User">;
  route: RouteProp<RootStackParamList, "User">;
};

export const UserScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  const { user, setUser } = useContext(UserContext);
  console.log(user.name);
  const [name, setName] = useState<string>(user.name);
  const [loading, setLoading] = useState<boolean>(false);
  
  const onSubmit = async () => {
    setLoading(true);
    const updatedAt = firebase.firestore.Timestamp.now();
    await updateUser(user.id, { name, updatedAt });
    setUser({...user, name, updatedAt});
    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Form
        value={name}
        onChangeText={(text) => {
          setName(text);
        }}
        label="名前"
      />
      <Button onPress={onSubmit} text="保存する" />
      <Loading visible={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 25 : 0
  },
});
