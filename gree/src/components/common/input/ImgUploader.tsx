import tw from '@/src/lib/tailwind';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import Txt from '@/src/components/common/Txt';
import { CameraIcon, AddIcon } from '@/assets/images';
import Colors from '@/src/constants/Colors';

export interface ImageFile {
  uri: string;
  name: string;
  type: string;
}

interface ImgUploaderProps {
  maxImages?: number;
  onImagesChange: (images: ImageFile[]) => void;
}

export default function ImgUploader({ maxImages = 3, onImagesChange }: ImgUploaderProps) {
  const [images, setImages] = useState<ImageFile[]>([]);

  const handleAddImage = async () => {
    if (images.length >= maxImages) return;

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '이미지를 업로드하려면 사진첩 접근 권한이 필요합니다.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: maxImages - images.length,
      quality: 0.8,
    });

    if (!result.canceled) {
      const newFiles: ImageFile[] = result.assets.map((asset) => ({
        uri: asset.uri,
        name: asset.fileName ?? `image_${Date.now()}.jpg`,
        type: asset.mimeType ?? 'image/jpeg',
      }));
      const updated = [...images, ...newFiles].slice(0, maxImages);
      setImages(updated);
      onImagesChange(updated);
    }
  };

  const handleRemove = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    onImagesChange(updated);
  };

  return (
    <View style={tw`gap-[10px]`}>
      <View style={tw`flex-row items-center gap-[4px]`}>
        <Txt variant='subtitleBold'>이미지</Txt>
        <Txt variant='auxiliaryTextLight' color='dark_gray1'>
          (최대 {maxImages}장)
        </Txt>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={tw`flex-row gap-[10px]`}>
          {images.map((img, index) => (
            <View key={index} style={tw`relative`}>
              <Image
                source={{ uri: img.uri }}
                style={[
                  tw`w-[100px] h-[100px] rounded-[10px]`,
                  { borderWidth: 1, borderColor: Colors.colors.light_gray2 },
                ]}
              />
              <TouchableOpacity
                onPress={() => handleRemove(index)}
                style={[
                  tw`absolute top-[-8px] right-[-8px] w-[22px] h-[22px] rounded-full bg-dark-gray-2 items-center justify-center`,
                ]}
              >
                <Txt variant='auxiliaryTextLight' color='white' align='center'>
                  ✕
                </Txt>
              </TouchableOpacity>
            </View>
          ))}
          {images.length < maxImages && (
            <TouchableOpacity
              onPress={handleAddImage}
              style={[
                tw`w-[100px] h-[100px] rounded-[10px] bg-light-gray-1 items-center justify-center gap-[6px]`,
                { borderWidth: 1, borderColor: Colors.colors.light_gray2 },
              ]}
            >
              <CameraIcon />
              <Txt variant='auxiliaryTextLight' color='dark_gray1'>
                {images.length}/{maxImages}
              </Txt>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
