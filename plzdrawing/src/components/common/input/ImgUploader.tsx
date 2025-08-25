import React from "react";
import styled from "styled-components/native";
import { Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { CameraIcon } from "@/assets/images";
import Colors from "@/src/constants/Colors";
import Txt from "@/src/components/common/text/Txt";

interface ImageUploaderProps {
  onImagesChange: (uris: string[]) => void;
  maxImages?: number;
  title?: string;
}

function ImageUploader({
  onImagesChange,
  maxImages = 5,
  title = "참고 사진이 있나요?",
}: ImageUploaderProps) {
  const [images, setImages] = React.useState<string[]>([]);

  React.useEffect(() => {
    onImagesChange(images);
  }, [images, onImagesChange]);

  const handleAddImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const newImages = result.assets.map((asset) => asset.uri);
      setImages((prevImages) =>
        [...prevImages, ...newImages].slice(0, maxImages)
      );
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  return (
    <>
      {!!title && (
        <>
          <Txt
            variant="mainTitleBold"
            style={{ marginTop: 20, marginBottom: 10 }}
          >
            {title}
          </Txt>
          <Txt variant="bodyText" style={{ marginBottom: 20 }}>
            최대 {maxImages}개
          </Txt>
        </>
      )}
      <ImageContainer>
        {images.length < maxImages && (
          <AddImageButton onPress={handleAddImage}>
            <CameraIcon />
          </AddImageButton>
        )}
        {images.map((uri, index) => (
          <ImageBox key={index}>
            <PreviewImage source={{ uri }} />
            <RemoveButton onPress={() => handleRemoveImage(index)}>
              <Txt variant="bodyTextBold" color="white">
                ×
              </Txt>
            </RemoveButton>
          </ImageBox>
        ))}
      </ImageContainer>
    </>
  );
}

const ImageContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
`;

const ImageBox = styled.View`
  position: relative;
  width: 60px;
  height: 60px;
`;

const PreviewImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

const RemoveButton = styled.TouchableOpacity`
  position: absolute;
  top: -8px;
  right: -6px;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${Colors.colors.light_gray2};
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const AddImageButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  border: 1px solid ${Colors.colors.light_gray2};
  border-radius: 5px;
`;

export default ImageUploader;