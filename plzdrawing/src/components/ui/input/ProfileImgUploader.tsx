import tw from '@/src/lib/tailwind';
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert, View, Image, TouchableOpacity } from "react-native";
import { CameraCircleIcon } from "@/assets/images/index";
import Colors from "@/src/constants/Colors";

interface ProfileImageUploaderProps {
  initialImageUrl?: string;
  onImageSelected: (uri: string) => void;
}

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({
  initialImageUrl,
  onImageSelected,
}) => {
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "권한 필요",
        "프로필 사진을 업로드하려면 사진첩 접근 권한이 필요합니다."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedUri = result.assets[0].uri;
      setSelectedImageUri(selectedUri);
      onImageSelected(selectedUri);
    }
  };

  const imageSource = selectedImageUri || initialImageUrl;

  return (
    <View style={tw`w-[102px] h-[102px] self-center mb-[16px] relative`}>
      <Image
        source={
          imageSource
            ? { uri: imageSource }
            : require("@/assets/images/sample.svg")
        }
        style={[tw`w-full h-full rounded-[10px]`, { borderWidth: 1, borderColor: Colors.colors.light_gray2 }]}
      />
      <TouchableOpacity
        onPress={handlePickImage}
        style={tw`absolute right-[-10px] bottom-[-10px]`}
      >
        <CameraCircleIcon />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileImageUploader;
