import { PaginationLeftIcon, PaginationRightIcon } from "@/assets/images";
import React, { useState } from "react";
import styled from "styled-components/native";

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
    <CarouselContainer>
      <DrawingImage source={{ uri: images[currentIndex] }} />

      {/* Left Arrow */}
      <ArrowButton onPress={handlePrev} style={{ left: -14 }}>
        <PaginationLeftIcon style={{ top: -2 }} />
      </ArrowButton>

      {/* Right Arrow */}
      <ArrowButton onPress={handleNext} style={{ right: -14 }}>
        <PaginationRightIcon style={{ top: -2 }} />
      </ArrowButton>

      {/* Pagination */}
      <PaginationContainer>
        {images.map((_, index) => (
          <PaginationDot key={index} active={index === currentIndex} />
        ))}
      </PaginationContainer>
    </CarouselContainer>
  );
};

const CarouselContainer = styled.View`
  width: 100%;
  aspect-ratio: 1.57;
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;
`;

const DrawingImage = styled.Image`
  width: 95%;
  height: 95%;
  border-radius: 5px;
  border: 0.5px solid #d9d9d9;
  background-color: gray
`;

const ArrowButton = styled.TouchableOpacity`
  position: absolute;
  top: 50%;
  margin-top: -12px;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const PaginationContainer = styled.View`
  position: absolute;
  bottom: 10px;
  flex-direction: row;
  gap: 8px;
`;

const PaginationDot = styled.View<{ active: boolean }>`
  width: ${(props: { active: any; }) => (props.active ? "10px" : "4px")};
  height: 4px;
  border-radius: 10px;
  background-color: ${(props: { active: any; }) => (props.active ? "#333535" : "#FFFFFF")};
`;

export default DrawingCarousel; 
