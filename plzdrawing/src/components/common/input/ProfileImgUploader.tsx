import React, { useState } from "react";
import styled from "styled-components/native";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
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
    <ImageContainer>
      <ProfileImage
        source={
          imageSource
            ? { uri: imageSource }
            : require("@/assets/images/sample.svg")
        }
      />
      <UploadButton onPress={handlePickImage}>
        <CameraCircleIcon />
      </UploadButton>
    </ImageContainer>
  );
};


const ImageContainer = styled.View`
  width: 102px;
  height: 102px;
  align-self: center;
  margin-bottom: 16px;
  position: relative;
`;

const ProfileImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border-color: ${Colors.colors.light_gray2};
  border-width: 1px;
`;

const UploadButton = styled.TouchableOpacity`
  position: absolute;
  right: -10;
  bottom: -10;
`;

export default ProfileImageUploader;
