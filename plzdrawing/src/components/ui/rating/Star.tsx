import React from 'react'
import { TouchableOpacity, StyleSheet } from "react-native";
import { EmptyStar, FilledStar } from "@/assets/images";

interface StarProps {
  filled?: boolean; // 채워진 별인지 여부
  onPress?: () => void; // 클릭 이벤트
  size?: number; // 별 크기
}


const Star = ({ filled = false, onPress, size = 30 }: StarProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.starContainer}
    >
      {filled ? <FilledStar width={size} height={size} /> : <EmptyStar width={size} height={size} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  starContainer: {
    padding: 5,
  },
  star: {
    resizeMode: "contain",
  },
});

export default Star;
