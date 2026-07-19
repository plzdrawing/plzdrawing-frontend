import tw from '@/src/lib/tailwind';
import { useState, useEffect } from 'react';

import { 
  Image, 
  View, 
  TouchableOpacity 
} from 'react-native';
import Txt from '@/src/components/ui/Txt';

import * as ImagePicker from 'expo-image-picker';

import { CameraIcon, CloseIcon } from '@/assets/images';

interface ImageUploaderProps {
  onImagesChange: (uris: string[]) => void;
  maxImages?: number;
  title?: string;
}

export default function ImageUploader({
  onImagesChange,
  maxImages = 5,
  title = '참고 사진이 있나요?',
}: ImageUploaderProps) {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    onImagesChange(images);
  }, [images, onImagesChange]);

  const handleAddImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
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
          <Txt variant='subtitleBold' style={tw`mt-[20px] mb-[7px]`}>
            {title}
          </Txt>
          <Txt variant='auxiliaryTextLight' style={tw`mb-[17px]`}>
            최대 {maxImages}개
          </Txt>
        </>
      )}

      <View style={tw`flex-row flex-wrap gap-[10px]`}>
        {images.length < maxImages && (
          <TouchableOpacity 
            onPress={handleAddImage}
            style={tw`w-[52px] h-[46px] justify-center items-center border border-light-gray-2 rounded-[5px]`}
          >
            <CameraIcon />
          </TouchableOpacity>
        )}
        {images.map((uri, index) => (
          <View key={index} style={tw`relative w-[52px] h-[46px] border border-light-gray-2 rounded-[5px] bg-white`}>
            <Image 
              source={{ uri }} 
              style={tw`w-full h-full`}
            />
            <TouchableOpacity 
              onPress={() => handleRemoveImage(index)}
              style={tw`absolute top-[-8px] right-[-6px] w-[18px] h-[18px] rounded-[100px] bg-light-gray-2 justify-center items-center z-10`}
            >
              <CloseIcon />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </>
  );
}
