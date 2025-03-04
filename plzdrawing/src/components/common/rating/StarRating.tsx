import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Star from "./Star";

interface StarRatingProps {
  readOnly?: boolean; // 읽기 전용 여부
  defaultValue?: number; // 초기 별점 값; 초기엔 0점
  starsCount?: number; // 별의 개수
  size?: number; // 별 크기
}

const StarRating = ({
  readOnly = false,
  defaultValue = 0,
  starsCount = 5,
  size = 40,
}: StarRatingProps) => {
  const [rating, setRating] = useState(defaultValue);

  const handlePress = (num: number) => {
    if (!readOnly) setRating(num);
  };

  return (
    <View style={styles.container}>
      {[...Array(starsCount)].map((_, index) => (
        <Star
          key={index}
          filled={index < rating}
          onPress={() => handlePress(index + 1)}
          size={size}
        />
      ))}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
});

export default StarRating;
