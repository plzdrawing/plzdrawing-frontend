import tw from '@/src/lib/tailwind';
import { PaginationLeftIcon, PaginationRightIcon } from "@/assets/images";
import React, { useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";

interface DrawingCarouselProps {
  images: string[];
}

const DrawingCarousel: React.FC<DrawingCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <View style={tw`w-full aspect-[1.57] mb-[20px] items-center justify-center`}>
      <Image
        source={{ uri: images[currentIndex] }}
        style={[tw`w-full h-[95%] rounded-[5px]`, { borderWidth: 0.5, borderColor: '#d9d9d9', backgroundColor: 'gray' }]}
      />

      {/* Left Arrow */}
      <TouchableOpacity
        onPress={handlePrev}
        style={[tw`absolute top-1/2 w-[24px] h-[24px] justify-center items-center z-10`, { left: -24, marginTop: -12 }]}
      >
        <PaginationLeftIcon style={{ top: -2 }} />
      </TouchableOpacity>

      {/* Right Arrow */}
      <TouchableOpacity
        onPress={handleNext}
        style={[tw`absolute top-1/2 w-[24px] h-[24px] justify-center items-center z-10`, { right: -24, marginTop: -12 }]}
      >
        <PaginationRightIcon style={{ top: -2 }} />
      </TouchableOpacity>

      {/* Pagination */}
      <View style={tw`absolute bottom-[10px] flex-row gap-[8px]`}>
        {images.map((_, index) => (
          <View
            key={index}
            style={{
              width: index === currentIndex ? 10 : 4,
              height: 4,
              borderRadius: 10,
              backgroundColor: index === currentIndex ? '#333535' : '#FFFFFF',
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default DrawingCarousel;
