import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

const getCameraRollPermission = async () => {
  if (Constants.platform.ios) {
    const { status } = await ImagePicker.getCameraPermissionsAsync();
    if (status != "granted") {
      alert("画像を選択する前にはカメラロールの許可が必要です");
    }
  }
};

export const pickImage = async () => {
    // Permission
    await getCameraRollPermission();

    // ImagePicker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
    });
    if(!result.cancelled){
        console.log(result);
        return result.uri;
    }

};